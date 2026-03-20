import logging
import asyncio
from arq import create_pool
from arq.connections import RedisSettings
from app.core.config import settings
from app.core.database import SessionLocal
from app.services.github_sync import sync_github_projects

logger = logging.getLogger(__name__)

async def sync_github_projects_task(ctx, **kwargs):
    """
    Background task to sync GitHub projects and update RAG embeddings.
    """
    logger.info("Starting background GitHub sync task...")
    async with SessionLocal() as db:
        try:
            result = await sync_github_projects(db)
            logger.info(f"Background sync finished: {result}")
            return result
        except Exception as e:
            logger.error(f"Background sync failed: {e}")
            raise e

async def startup(ctx):
    logger.info("Worker starting up...")

async def shutdown(ctx):
    logger.info("Worker shutting down...")

class WorkerSettings:
    """
    Configuration for the arq worker.
    """
    functions = [sync_github_projects_task]
    redis_settings = settings.REDIS_SETTINGS
    on_startup = startup
    on_shutdown = shutdown
    # Optionally tweak concurrency
    # job_timeout = 3600
    # max_jobs = 10
