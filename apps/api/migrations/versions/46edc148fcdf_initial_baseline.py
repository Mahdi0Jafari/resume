"""Initial baseline

Revision ID: 46edc148fcdf
Revises: None
Create Date: 2026-03-20 08:02:13.665034

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '46edc148fcdf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ── pgvector extension ───────────────────────────────────────────────────
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")

    # ── github_stats ──────────────────────────────────────────────────────────
    op.create_table(
        'github_stats',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('repo_name', sa.String(), nullable=True),
        sa.Column('stars', sa.Integer(), nullable=True),
        sa.Column('commits', sa.Integer(), nullable=True),
        sa.Column('last_updated', sa.DateTime(), nullable=True),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('languages', sa.dialects.postgresql.JSONB(), nullable=True),
        sa.Column('url', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_github_stats_id'), 'github_stats', ['id'], unique=False)
    op.create_index(op.f('ix_github_stats_repo_name'), 'github_stats', ['repo_name'], unique=True)

    # ── rag_documents ─────────────────────────────────────────────────────────
    from pgvector.sqlalchemy import Vector
    op.create_table(
        'rag_documents',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('metadata_json', sa.dialects.postgresql.JSONB(), nullable=True),
        sa.Column('embedding', Vector(3072), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_rag_documents_id'), 'rag_documents', ['id'], unique=False)

    # ── chat_sessions ─────────────────────────────────────────────────────────
    op.create_table(
        'chat_sessions',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('ip_hash', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_chat_sessions_created_at'), 'chat_sessions', ['created_at'], unique=False)
    op.create_index(op.f('ix_chat_sessions_id'), 'chat_sessions', ['id'], unique=False)
    op.create_index(op.f('ix_chat_sessions_ip_hash'), 'chat_sessions', ['ip_hash'], unique=False)

    # ── chat_messages ─────────────────────────────────────────────────────────
    op.create_table(
        'chat_messages',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('session_id', sa.String(), nullable=True),
        sa.Column('role', sa.String(), nullable=True),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('timestamp', sa.DateTime(), nullable=True),
        sa.Column('tokens_used', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['session_id'], ['chat_sessions.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_chat_messages_id'), 'chat_messages', ['id'], unique=False)

    # ── site_settings ─────────────────────────────────────────────────────────
    op.create_table(
        'site_settings',
        sa.Column('key', sa.String(), nullable=False),
        sa.Column('value', sa.Text(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('key')
    )
    op.create_index(op.f('ix_site_settings_key'), 'site_settings', ['key'], unique=False)


def downgrade() -> None:
    op.drop_table('site_settings')
    op.drop_table('chat_messages')
    op.drop_table('chat_sessions')
    op.drop_table('rag_documents')
    op.drop_table('github_stats')
