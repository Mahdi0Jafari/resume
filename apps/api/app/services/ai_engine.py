import google.generativeai as genai
from app.core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import RAGDocument

# Security configuration mapping
# The user will inject GEMINI_API_KEY from environment 
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

async def get_embedding(text: str) -> list[float]:
    """Generates a 3072-dimensional mathematical vector representation of string content."""
    if not settings.GEMINI_API_KEY:
        # Graceful fallback if no token
        return [0.0] * 3072
        
    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type="retrieval_document"
    )
    return result['embedding']

async def search_similar_docs(query_text: str, db: AsyncSession, limit: int = 5):
    """Retrieves top semantically matching records from PostgreSQL via L2 distance vector search."""
    if not settings.GEMINI_API_KEY:
        return []

    # 1. Transform user prompt into vector mapping
    query_embedding = await get_embedding(query_text)
    
    # 2. Vector distance querying over pgvector
    try:
        from pgvector.sqlalchemy import Vector
        query = select(RAGDocument).order_by(
            RAGDocument.embedding.l2_distance(query_embedding)
        ).limit(limit)
        
        result = await db.execute(query)
        return result.scalars().all()
    except Exception as e:
        print(f"Vector search failed: {e}")
        return []

async def generate_answer(prompt: str, context: str, history: list[dict] = None) -> str:
    """Invokes LLM synthesis dynamically based on the localized DB retrieved context context."""
    if not settings.GEMINI_API_KEY:
        return "I am currently disconnected from my neural core. Please secure the GEMINI_API_KEY."

    # Selecting Flash for faster Inference processing and context capacity vs cost
    model = genai.GenerativeModel('models/gemini-2.5-flash')
    
    # Format history if exists
    history_str = ""
    if history:
        for msg in history:
            role = "User" if msg["role"] == "user" else "Agent"
            history_str += f"{role}: {msg['content']}\n"

    # ── System Directives ─────────────────────────────────────────────────────
    
    # Foundational context about Mahdi to prevent "I don't know" for basic stuff
    mahdi_bio = (
        "Mahdi Jafari is a Systems Architect and Software Engineer based in Iran. "
        "He specializes in autonomous systems, scalable infrastructure, and AI integration. "
        "He is the creator of Lyraz (a Python framework), Vajeh, and this AI-powered portfolio. "
        "He is known for high-performance systems and deterministic precision."
    )

    system_prompt = (
        f"You are the helpful AI interface for Mahdi Jafari's portfolio.\n"
        f"Mahdi's Bio: {mahdi_bio}\n\n"
        f"Guidelines:\n"
        f"1. Help the user understand Mahdi's projects and skills.\n"
        f"2. Use the provided Context to give specific details about projects.\n"
        f"3. If the Context doesn't have a specific answer, use your general knowledge to talk about Mahdi "
        f"or explain what you can do. Avoid saying 'I do not have enough context' unless it's a very specific "
        f"technical detail you truly can't find.\n"
        f"4. Be Insightful, professional, and slightly futuristic in tone.\n"
        f"5. ALWAYS reply in the SAME LANGUAGE as the user (Persian for Persian, English for English).\n\n"
        f"--- CONTEXT DATA ---\n"
        f"{context}\n"
        f"--------------------\n\n"
        f"--- RECENT HISTORY ---\n"
        f"{history_str}\n"
        f"--------------------\n\n"
        f"User Question: {prompt}\n"
    )
    
    response = await model.generate_content_async(system_prompt)
    return response.text
