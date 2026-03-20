from typing import List, Any
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "mahdi0jafari Autonomous Node"
    API_V1_STR: str = "/api/v1"

    # CORS
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost",
        "http://127.0.0.1:3000",
        "http://127.0.0.1"
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

    @validator("SQLALCHEMY_DATABASE_URI", pre=True, always=True)
    def assemble_db_connection(cls, v: str | None, values: dict[str, Any]) -> Any:
        # 1. Explicit SQLALCHEMY_DATABASE_URI wins
        if isinstance(v, str) and v:
            return v
        # 2. DATABASE_URL from .env is the next choice
        db_url = values.get("DATABASE_URL")
        if isinstance(db_url, str) and db_url:
            return db_url
        # 3. Assemble from individual POSTGRES_* vars
        return (
            f"postgresql+asyncpg://"
            f"{values.get('POSTGRES_USER')}:{values.get('POSTGRES_PASSWORD')}"
            f"@{values.get('POSTGRES_SERVER')}/{values.get('POSTGRES_DB')}"
        )

    # Redis / Arq
    REDIS_HOST: str = "redis"
    REDIS_PORT: int = 6379
    @property
    def REDIS_SETTINGS(self):
        from arq.connections import RedisSettings
        return RedisSettings(host=self.REDIS_HOST, port=self.REDIS_PORT)

    # External APIs
    GITHUB_TOKEN: str | None = None
    GITHUB_USERNAME: str = "mahdi0jafari"
    GEMINI_API_KEY: str | None = None
    ADMIN_TOKEN: str = "change_me_in_production" # Security token for /admin endpoints

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
