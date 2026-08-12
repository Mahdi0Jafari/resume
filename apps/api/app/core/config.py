from typing import List, Any
from pydantic import field_validator
from pydantic_core.core_schema import ValidationInfo
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "mahdi0jafari Autonomous Node"
    API_V1_STR: str = "/api/v1"

    # CORS
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost",
        "http://127.0.0.1:3000",
        "http://127.0.0.1",
        "https://mahdijafari.ir",
        "https://www.mahdijafari.ir",
        "http://mahdijafari.ir",
        "http://www.mahdijafari.ir"
    ]

    # Database — individual parts (used to assemble the URI)
    POSTGRES_SERVER: str = "postgres"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "mahdi_node"

    # DATABASE_URL can be set directly (e.g. Railway / Heroku / .env file).
    # If provided it takes priority over the assembled URI.
    DATABASE_URL: str | None = None

    # Final URI used by SQLAlchemy — assembled from the parts above,
    # or taken directly from DATABASE_URL if that is set.
    SQLALCHEMY_DATABASE_URI: str | None = None

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: Any, info: ValidationInfo) -> Any:
        # 1. Explicit SQLALCHEMY_DATABASE_URI wins
        if isinstance(v, str) and v:
            return v
        # 2. DATABASE_URL from .env is the next choice
        db_url = info.data.get("DATABASE_URL")
        if isinstance(db_url, str) and db_url:
            return db_url
        # 3. Assemble from individual POSTGRES_* vars
        return (
            f"postgresql+asyncpg://"
            f"{info.data.get('POSTGRES_USER')}:{info.data.get('POSTGRES_PASSWORD')}"
            f"@{info.data.get('POSTGRES_SERVER')}/{info.data.get('POSTGRES_DB')}"
        )



    # External APIs
    GITHUB_TOKEN: str | None = None
    GITHUB_USERNAME: str = "mahdi0jafari"
    GEMINI_API_KEY: str | None = None
    GEMINI_MODEL: str = "gemini-3.1-flash-lite"
    GEMINI_EMBEDDING_MODEL: str = "text-embedding-004"
    ADMIN_TOKEN: str = "change_me_in_production" # Security token for /admin endpoints



    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
