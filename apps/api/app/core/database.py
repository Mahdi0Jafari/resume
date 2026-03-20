from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from app.core.config import settings

engine = create_async_engine(settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)
SessionLocal = sessionmaker(class_=AsyncSession, autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

async def init_db():
    # Note: Extension creation and Table creation are now handled by Alembic migrations.
    # We only keep the seeding logic here for the first-run experience.
    
    # Import models package to ensure all ORM classes are registered with Base.metadata
    import app.models  # noqa: F401
    
    # Seed default settings if empty
    from app.models import SiteSetting
    async with SessionLocal() as db:
        result = await db.execute(text("SELECT count(*) FROM site_settings"))
        count = result.scalar()
        if count == 0:
            default_bio = (
                "Mahdi Jafari is a Systems Architect and Software Engineer based in Iran. "
                "He focuses on building autonomous systems and scalable infrastructure. "
                "His work includes developing the Lyraz framework and various AI-native applications, "
                "with a constant emphasis on technical precision and functional design."
            )
            db.add(SiteSetting(key="owner_bio", value=default_bio))
            db.add(SiteSetting(key="persona_tone", value="humble_assistant"))
            await db.commit()

async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()
