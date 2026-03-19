from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from app.core.config import settings

engine = create_async_engine(settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)
SessionLocal = sessionmaker(class_=AsyncSession, autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

async def init_db():
    # Attempt to create the pgvector extension if it doesn't exist
    try:
        async with engine.begin() as conn:
            await conn.execute(text('CREATE EXTENSION IF NOT EXISTS vector'))
    except Exception as e:
        print(f"Failed to create vector extension. PGVector might not be installed. Error: {e}")
        pass
    
    # Import models package to ensure all ORM classes are registered with Base.metadata
    import app.models  # noqa: F401
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
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
