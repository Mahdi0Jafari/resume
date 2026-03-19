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
    """Generates a 768-dimensional mathematical vector representation of string content."""
    if not settings.GEMINI_API_KEY:
        # Graceful fallback if no token
        return [0.0] * 768
        
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

    # Implementing safety boundaries against prompt injection & hallucinations 
    system_prompt = (
        f"You are the autonomous AI interface for Mahdi Jafari's portfolio system.\n"
        f"Your instruction is to answer the User Question ONLY based on the Context data provided.\n"
        f"If the answer cannot be confidently deduced from the Context, state 'I do not have enough context about this specific detail in my databanks.'\n"
        f"Maintain a professional, highly deterministic, and concise tone.\n"
        f"Answer in the SAME LANGUAGE as the User Question (e.g. if Persian, reply in Persian).\n\n"
        f"--- CONTEXT DATA ---\n"
        f"{context}\n"
        f"--------------------\n\n"
        f"--- RECENT HISTORY ---\n"
        f"{history_str}\n"
        f"--------------------\n\n"
        f"User Question: {prompt}\n\n"
    )
    
    response = await model.generate_content_async(system_prompt)
    return response.text
