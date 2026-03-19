from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.schemas.schemas import ChatRequest, ChatResponse
from app.models import GitHubStat
from app.services.github_sync import sync_github_projects

# ── Chat ─────────────────────────────────────────────────────────────────────

chat_router = APIRouter()

@chat_router.post("/", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    # TODO: Implement Gemini / LangGraph logic
    return ChatResponse(response="Agent logic not implemented yet", tokens_used=0)


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
async def trigger_sync(db: AsyncSession = Depends(get_db)):
    """
    Manually triggers a full GitHub sync.
    Fetches all public repos, updates GitHubStat, and feeds descriptions
    into RAGDocument so the AI chatbot knows what each project does.
    """
    return await sync_github_projects(db)
