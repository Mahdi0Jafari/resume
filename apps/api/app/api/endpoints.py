from fastapi import APIRouter, Depends, HTTPException, Header
from fastapi_limiter.depends import RateLimiter

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.config import settings
from app.schemas.schemas import ChatRequest, ChatResponse
from app.models import GitHubStat, SiteSetting
from app.services.github_sync import sync_github_projects
from app.services.ai_engine import search_similar_docs, generate_answer
from arq import create_pool

# ── Security Dependency ───────────────────────────────────────────────────────

async def verify_admin(x_admin_token: str = Header(None)):
    if not x_admin_token or x_admin_token != settings.ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid Admin Token")
    return True

# ── Chat ─────────────────────────────────────────────────────────────────────

chat_router = APIRouter()

@chat_router.post("", response_model=ChatResponse, dependencies=[Depends(RateLimiter(times=5, seconds=60))])
async def chat_with_agent(request: ChatRequest, db: AsyncSession = Depends(get_db)):

    # 1. Retrieve related context (RAG)
    docs = await search_similar_docs(request.message, db)
    context = "\n".join([d.content for d in docs]) if docs else "No relevant local architectural context found."
    
    # 2. Forward to Gemini for synthesis with dynamic bio retrieval
    answer = await generate_answer(request.message, context, request.history, db=db)
    
    return ChatResponse(response=answer, tokens_used=0)


# ── Admin ────────────────────────────────────────────────────────────────────

admin_router = APIRouter()

@admin_router.get("/settings", dependencies=[Depends(verify_admin)])
async def get_settings(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SiteSetting))
    settings_dict = {s.key: s.value for s in result.scalars().all()}
    return settings_dict

@admin_router.patch("/settings", dependencies=[Depends(verify_admin)])
async def update_setting(payload: dict, db: AsyncSession = Depends(get_db)):
    """
    Updates specific site settings. Payload example: {"owner_bio": "New bio..."}
    """
    for key, value in payload.items():
        result = await db.execute(select(SiteSetting).where(SiteSetting.key == key))
        setting = result.scalars().first()
        if setting:
            setting.value = value
        else:
            db.add(SiteSetting(key=key, value=value))
    
    await db.commit()
    return {"status": "updated", "keys": list(payload.keys())}


# ── GitHub ────────────────────────────────────────────────────────────────────

github_router = APIRouter()

@github_router.get("/stats")
async def get_github_stats(db: AsyncSession = Depends(get_db)):
    """Legacy endpoint – returns raw GitHubStat rows."""
    result = await db.execute(select(GitHubStat))
    return result.scalars().all()

@github_router.get("/projects")
async def get_projects(db: AsyncSession = Depends(get_db)):
    """
    Returns all GitHub projects ordered by stars (descending).
    The frontend calls this endpoint — no direct GitHub API call needed.
    """
    result = await db.execute(
        select(GitHubStat).order_by(GitHubStat.stars.desc())
    )
    return result.scalars().all()

@github_router.post("/sync")
async def trigger_sync():
    """
    Enqueues a full GitHub sync as a background task.
    Returns immediately to keep the API responsive.
    """
    redis = await create_pool(settings.REDIS_SETTINGS)
    await redis.enqueue_job("sync_github_projects_task")
    return {"status": "accepted", "message": "Background sync started."}
