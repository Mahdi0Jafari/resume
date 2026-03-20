import google.generativeai as genai
from app.core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import RAGDocument
import logging

logger = logging.getLogger(__name__)

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
        model=f"models/{settings.GEMINI_EMBEDDING_MODEL}",
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

async def generate_answer(prompt: str, context: str, history: list[dict] = None, db: AsyncSession = None) -> str:
    """Invokes LLM synthesis with a humble, strictly scoped persona and dynamic bio."""
    if not settings.GEMINI_API_KEY:
        return "I am currently disconnected from my neural core. Please secure the GEMINI_API_KEY."

    # Fetch dynamic bio from DB if available
    owner_bio = (
        "Mahdi Jafari is a Systems Architect and Software Engineer based in Iran. "
        "He specializes in autonomous systems and scalable infrastructure."
    )
    if db:
        from app.models import SiteSetting
        try:
            result = await db.execute(select(SiteSetting).where(SiteSetting.key == "owner_bio"))
            setting = result.scalars().first()
            if setting and setting.value:
                owner_bio = setting.value
        except Exception as e:
            print(f"Failed to fetch dynamic bio: {e}")

    model = genai.GenerativeModel(f"models/{settings.GEMINI_MODEL}")

    
    # Format history (Limited to last 5 messages to save quota)
    history_str = ""
    if history:
        recent_history = history[-5:]
        for msg in recent_history:
            role = "User" if msg["role"] == "user" else "Agent"
            history_str += f"{role}: {msg['content']}\n"

    # ── Humble & Strictly Scoped System Directives ────────────────────────────
    system_prompt = (
        f"Context about Mahdi Jafari:\n{owner_bio}\n\n"
        f"Directive:\n"
        f"You are the technical assistant for Mahdi Jafari's portfolio. "
        f"Your goal is to provide helpful, accurate, and concise information about Mahdi's projects and technical background.\n\n"
        f"Strict Rules:\n"
        f"1. Use a humble, reserved, and professional tone. Avoid boastful or superlative language.\n"
        f"2. Answer ONLY based on the provided Context and Mahdi's Bio.\n"
        f"3. Do NOT write code, scripts, or perform general-purpose tasks. If asked, politely explain you are focused only on this portfolio.\n"
        f"4. If you don't know something about Mahdi, simply say you don't have that information.\n"
        f"5. ALWAYS reply in the SAME LANGUAGE as the user.\n\n"
        f"--- PORTFOLIO CONTEXT ---\n"
        f"{context}\n"
        f"--------------------\n\n"
        f"--- CONVERSATION HISTORY ---\n"
        f"{history_str}\n"
        f"--------------------\n\n"
        f"User Question: {prompt}\n"
    )
    
    try:
        # 1. Use a strict timeout for the generative call
        import asyncio
        response = await asyncio.wait_for(
            model.generate_content_async(system_prompt),
            timeout=12.0 # Strict limit for responsiveness
        )
        return response.text
    except Exception as e:
        logger.error(f"AI Generation failed or timed out: {e}")
        
        # ── Graceful Degradation (Offline / Failover Mode) ────────────────────
        # First, check for quota issues to give the user better feedback
        error_str = str(e)
        if "429" in error_str or "ResourceExhausted" in error_str:
            return "I'm currently experiencing high traffic (Rate Limit). Please try again in 1 minute, as I'm on the Free Neural Tier."
            
        # If API is just down or slow, we synthesize a response from the context
        if context and context != "No relevant local architectural context found.":
            fallback_msg = (
                "I'm currently operating in high-performance 'offline' mode. "
                "Based on my local records: " + context[:300] + "..."
            )
            if "سلام" in prompt or "چطوری" in prompt: # Simple Farsi detection
                fallback_msg = (
                    "در حال حاضر در وضعیت آفلاین هستم (محدودیت نرخ پردازش)، اما بر اساس اطلاعات محلی من: " +
                    context[:300] + "..."
                )
            return fallback_msg

            
        return "I encountered a technical glitch while processing your request. Please try again."
