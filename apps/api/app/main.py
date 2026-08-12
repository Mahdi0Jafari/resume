from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging


from app.core.config import settings
from app.core.database import init_db
from app.api.routes import router as api_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create all DB tables and extensions
    logger.info("Starting up FastAPI application...")
    await init_db()
    

    logger.info("Database tables verified/created.")
    
    # --- Auto-Sync on Startup ---
    from app.core.database import SessionLocal
    from sqlalchemy import select
    from app.models import GitHubStat
    from app.services.github_sync import sync_github_projects
    
    async with SessionLocal() as db:
        try:
            result = await db.execute(select(GitHubStat).limit(1))
            if not result.scalars().first():
                logger.info("Database is empty! Starting auto-sync from GitHub...")
                sync_result = await sync_github_projects(db)
                logger.info(f"Auto-sync finished: {sync_result}")
            else:
                logger.info("Database already populated. Skipping auto-sync.")
        except Exception as e:
            logger.error(f"Failed to auto-sync on startup: {e}")
            
    yield
    # Shutdown
    logger.info("Shutting down FastAPI application...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="mahdi0jafari Autonomous Node API",
    lifespan=lifespan
)

# Set up CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.rstrip("/") for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "FastAPI engine running"}
