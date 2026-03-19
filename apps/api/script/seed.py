import asyncio
from sqlalchemy import select
from app.core.database import SessionLocal, init_db
from app.services.github_sync import fetch_and_update_github_stats
from app.core.config import settings
from app.models import RAGDocument, GitHubStat

async def seed_data():
    await init_db()
    
    print("Initialising database tables...")
    
    async with SessionLocal() as db:
        # 1. Fetch GitHub data (needs internet)
        print("Fetching GitHub stats...")
        await fetch_and_update_github_stats(db, settings.GITHUB_TOKEN)
        
        # 2. Seed some initial RAG content
        manifesto_content = """This project is an "Agentic Portfolio". Its nature is a paradigm shift from a "Static Display" of information to an "Interactive Proof of Work". Instead of telling you what skills I have, the system directly enters into a technical dialogue with the employer or visitor through an Expanded Terminal interface, analyzes my code, and provides live statistics."""
        
        result = await db.execute(select(RAGDocument).limit(1))
        if not result.scalars().first():
            doc = RAGDocument(content=manifesto_content, metadata_json={"source": "manifesto.md"})
            # We leave embedding generation to Gemini API in reality, so we skip here for demo
            db.add(doc)
            await db.commit()
            print("RAG Documents seeded.")
        
    print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(seed_data())
