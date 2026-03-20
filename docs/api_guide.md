# API Documentation: Mahdi Jafari Portfolio System

This document outlines the core functional endpoints of the Portfolio Autonomous Node.

## Base URL
The API is available at:
`http://localhost:8000/api/v1` (Internal/Docker)
`http://your-domain.com/api/v1` (Production)

---

## 1. Agent Chat
Interactive, RAG-enhanced technical assistant.

### `POST /chat`
Talk to the portfolio's AI representative.

**Request Body:**
```json
{
  "message": "Who is Mahdi Jafari?",
  "history": [
    {"role": "user", "content": "Hello"},
    {"role": "agent", "content": "Hello. I'm Mahdi's technical assistant."}
  ]
}
```

**Response:**
```json
{
  "response": "Mahdi is a Systems Architect based in Iran...",
  "tokens_used": 0
}
```

---

## 2. GitHub Integration
Synchronization and retrieval of open-source project data.

### `GET /github/projects`
Returns a list of all synced GitHub repositories ordered by star count.

### `POST /github/sync`
Triggers a manual refresh of all GitHub data for the configured username. This also updates the AI's RAG knowledge base.

---

## 3. Administrative Settings (Owner Only)
Secure endpoints for controlling the AI's personality and biography.

### Security Implementation
All admin endpoints require an `X-Admin-Token` header. This token is defined in your `.env` file as `ADMIN_TOKEN`.

### `GET /admin/settings`
Retrieves the current AI biography and persona configuration.

**Headers:**
- `X-Admin-Token`: `your_secret_token`

### `PATCH /admin/settings`
Updates the AI's biography or tone.

**Headers:**
- `X-Admin-Token`: `your_secret_token`
- `Content-Type`: `application/json`

**Payload Example:**
```json
{
  "owner_bio": "Mahdi Jafari is a specialized Systems Architect and the creator of the Lyraz framework...",
  "persona_tone": "humble_assistant"
}
```

**Outcome:**
The AI will immediately reflect these changes in its next chat response.

---

## 4. Admin Management Tool (CLI)
To make it easier to manage your portfolio without raw API calls, use the provided Python script:

### Usage:
1. Set your token: `export ADMIN_TOKEN=your_admin_token`
2. **View Settings**: `python scripts/admin_tool.py show`
3. **Change Bio**: `python scripts/admin_tool.py set-bio` (Then paste your text and press Ctrl+D).

---

## 6. Optimization & Performance

To avoid long "Metadata Loading" delays (common in restrictive network environments), the following optimizations are in place:

1. **Pinned Image Digests**: Dockerfiles use `image@sha256:...` to bypass registry update checks.
2. **Makefile System**: Use the provided `Makefile` (in the `infrastructure` directory) for the fastest workflow:
   - `make dev`: Starts the project using cached images without checking for updates (`--pull=never`).
   - `make down`: Stops all containers.
   - `make logs`: Follows container output.

---

## 7. Troubleshooting

1. **Authentication**: If you lose your `ADMIN_TOKEN`, check the `.env` file in the `apps/api` directory.
2. **Context Persistence**: The chat system uses RAG. If you add a new project to GitHub, run the `/github/sync` command to ensure the AI knows how to talk about it.
3. **Persian/English**: The system automatically detects the input language and responds accordingly in the same language.
