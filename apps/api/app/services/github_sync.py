import httpx
import logging
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import GitHubStat, RAGDocument
from app.core.config import settings

logger = logging.getLogger(__name__)


async def sync_github_projects(db: AsyncSession) -> dict:
    """
    Fetches all public repos for GITHUB_USERNAME, persists stats in GitHubStat,
    and upserts descriptions as RAGDocument entries for the AI context window.
    """
    headers = {"Accept": "application/vnd.github.v3+json"}
    if settings.GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {settings.GITHUB_TOKEN}"

    url = f"https://api.github.com/users/{settings.GITHUB_USERNAME}/repos?per_page=100&sort=updated"

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.get(url, headers=headers)
            response.raise_for_status()
        except httpx.HTTPStatusError as e:
            logger.error(f"GitHub API error: {e.response.status_code} – {e.response.text}")
            return {"error": f"GitHub API returned {e.response.status_code}"}
        except httpx.RequestError as e:
            logger.error(f"GitHub request failed: {type(e).__name__}: {e}")
            return {"error": f"Network error reaching GitHub: {type(e).__name__}"}

    repos = response.json()

    for repo in repos:
        # ── 1. Upsert GitHubStat ──────────────────────────────────────────────
        result = await db.execute(
            select(GitHubStat).where(GitHubStat.repo_name == repo["name"])
        )
        stat = result.scalars().first()

        if not stat:
            stat = GitHubStat(repo_name=repo["name"])
            db.add(stat)

        stat.stars = repo["stargazers_count"]
        stat.commits = 0  # commits need a separate API call; placeholder for now
        stat.description = repo.get("description") or ""
        stat.url = repo.get("html_url") or ""
        
        # Fetch multiple languages
        languages_url = repo.get("languages_url")
        langs_list = []
        if languages_url:
            try:
                lang_res = await client.get(languages_url, headers=headers)
                lang_res.raise_for_status()
                langs_dict = lang_res.json()
                langs_list = list(langs_dict.keys())
            except Exception as e:
                logger.warning(f"Could not fetch languages for {repo['name']}: {e}")
        
        # If the fetch fails but the repo gives a primary language, fall back to it
        if not langs_list and repo.get("language"):
            langs_list = [repo["language"]]
            
        stat.languages = langs_list
        stat.last_updated = datetime.utcnow()  # naive UTC — matches TIMESTAMP WITHOUT TIME ZONE

        # ── 2. Upsert RAGDocument from repo description ───────────────────────
        description = repo.get("description") or ""
        if description:
            rag_content = (
                f"Project: {repo['name']}. "
                f"Description: {description}. "
                f"Stars: {repo['stargazers_count']}. "
                f"Languages: {', '.join(langs_list) if langs_list else 'unknown'}."
            )
            # Check if a RAG doc for this repo already exists
            rag_result = await db.execute(
                select(RAGDocument).where(
                    RAGDocument.metadata_json["source"].as_string() == "github",
                    RAGDocument.metadata_json["repo"].as_string() == repo["name"],
                )
            )
            rag_doc = rag_result.scalars().first()

            if not rag_doc:
                rag_doc = RAGDocument(
                    content=rag_content,
                    metadata_json={
                        "source": "github",
                        "repo": repo["name"],
                        "url": repo["html_url"],
                    },
                )
                db.add(rag_doc)
            else:
                rag_doc.content = rag_content

    await db.commit()
    logger.info(f"GitHub sync complete: {len(repos)} repos processed.")
    return {"status": "success", "synced": len(repos)}


# ── Legacy alias kept so seed.py doesn't break ───────────────────────────────
async def fetch_and_update_github_stats(db: AsyncSession, github_token: str | None = None):
    """Backward-compat wrapper used by seed.py."""
    return await sync_github_projects(db)
