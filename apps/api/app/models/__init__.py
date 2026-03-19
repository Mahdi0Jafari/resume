from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Float
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from datetime import datetime

from app.core.database import Base

class GitHubStat(Base):
    __tablename__ = "github_stats"
    
    id = Column(Integer, primary_key=True, index=True)
    repo_name = Column(String, unique=True, index=True)
    stars = Column(Integer, default=0)
    commits = Column(Integer, default=0)
    last_updated = Column(DateTime, default=datetime.utcnow)
    description = Column(String, nullable=True)
    languages = Column(JSON, nullable=True)
    url = Column(String, nullable=True)
class RAGDocument(Base):
    """
    Stores documents, architectural code snippets, or manifesto details 
    along with their semantic embeddings for the Rag System.
    """
    __tablename__ = "rag_documents"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    metadata_json = Column(JSON, nullable=True) # E.g., file path, project name
    embedding = Column(Vector(768)) # Gemini uses 768 dimensions usually by default

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    
    id = Column(String, primary_key=True, index=True) # UUID
    ip_hash = Column(String, index=True) # Privacy-first tracking
    created_at = Column(DateTime, default=datetime.utcnow)
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, ForeignKey("chat_sessions.id"))
    role = Column(String) # user or agent
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    tokens_used = Column(Integer, default=0) # Telemetry: Token economics
    
    session = relationship("ChatSession", back_populates="messages")
