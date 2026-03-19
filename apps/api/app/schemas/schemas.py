from pydantic import BaseModel, ConfigDict
from datetime import datetime

class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None # Required to continue a conversation

class ChatResponse(BaseModel):
    response: str
    tokens_used: int = 0
    
class GitHubStatResponse(BaseModel):
    repo_name: str
    stars: int
    commits: int
    last_updated: datetime

    model_config = ConfigDict(from_attributes=True)
