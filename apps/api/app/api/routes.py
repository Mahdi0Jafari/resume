from fastapi import APIRouter
from app.api import endpoints

router = APIRouter()

router.include_router(endpoints.chat_router, prefix="/chat", tags=["Agent Chat"])
router.include_router(endpoints.github_router, prefix="/github", tags=["GitHub Stats"])
router.include_router(endpoints.admin_router, prefix="/admin", tags=["Admin Settings"])
