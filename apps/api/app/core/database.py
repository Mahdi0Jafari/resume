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

async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()
