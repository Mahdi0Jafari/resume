# 🚀 Mahdi's Intelligence Hub (AI-Native Portfolio)

A sophisticated, high-performance portfolio ecosystem designed for the agentic era. This project transcends static showcases by integrating **RAG (Retrieval-Augmented Generation)**, real-time data orchestration, and a robust microservices architecture.



---

## 🏗 System Architecture

The system is architected using a decoupled microservices approach, ensuring scalability and isolation:

* **Frontend (Web):** Next.js 15 (App Router) with Tailwind CSS and Framer Motion for high-fidelity micro-interactions and Bento-style UI.
* **Backend (API):** FastAPI (Python 3.12) utilizing asynchronous programming (`AsyncSession`) for non-blocking I/O operations.
* **Intelligence Layer:** LangGraph for agentic reasoning, powered by Google Gemini 1.5 Pro and `text-embedding-004`.
* **Data Layer:** * **PostgreSQL:** Primary relational store with `pgvector` for high-dimensional vector similarity search.
    * **Redis:** High-speed caching and rate-limiting (Throttling).
* **Infrastructure:** Fully containerized with Docker, managed via Docker Compose, and orchestrated behind an Nginx Reverse Proxy.

---

## 🔥 Key Features

### 🧠 RAG-Driven AI Agent
An intelligent chatbot that doesn't just talk—it reasons. By indexing my GitHub repositories and resume via vector embeddings, the agent provides evidence-based answers about my technical expertise and project history.

### 🔄 Autonomous GitHub Sync
A dedicated background service that synchronizes repository metadata (stars, languages, updates) and README content directly from GitHub's REST/GraphQL APIs into the local PostgreSQL instance.

### ⚡ Optimized Performance
* **GPU-Efficient UI:** Visual effects (like Blur filters) are strategically offloaded to hover states to maintain a high-FPS scrolling experience.
* **Hybrid Content Strategy:** Critical SEO data is hardcoded for LCP (Largest Contentful Paint) optimization, while dynamic stats are fetched via server-side API calls.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15, React, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | FastAPI, SQLAlchemy (Async), Pydantic v2, HTTPX |
| **AI/ML** | LangGraph, Gemini API, PGVector |
| **DevOps** | Docker, Nginx, GitHub Actions |
| **Storage** | PostgreSQL, Redis |

---

## 🚀 Getting Started

### Prerequisites
* Docker & Docker Compose
* GitHub Personal Access Token (PAT)
* Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mahdi0jafari/resume.git](https://github.com/mahdi0jafari/resume.git)
   cd resume