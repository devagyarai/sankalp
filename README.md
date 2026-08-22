# Sankalp Platform

## Overview
Sankalp is a modular, multi-purpose intelligent platform designed to integrate personalized planning, productivity intelligence, career and skill-gap intelligence, digital safety assessment, and an integrated deterministic FAQ assistant (Cypherverse CHAT-1).

## Current Project Status
**Foundation Stage**: The complete Sankalp domain functionality has NOT yet been implemented. This repository currently establishes only the initial technical foundation and the CHAT-1 knowledge base infrastructure.

## Architecture Overview
Sankalp follows a **modular monolith** approach. 
- **Frontend**: Next.js App Router (TypeScript)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (SQLAlchemy + Alembic)
- See `docs/architecture/overview.md` for more details.

## Repository Structure
```
Sankalp/
├── apps/
│   ├── web/           # Next.js Frontend
│   └── api/           # FastAPI Backend
├── packages/          # Shared PNPM workspace packages (ui, types, config)
├── knowledge/         # Sankalp knowledge base (e.g. chatbot FAQs)
├── docs/              # Architectural, decision, and security documentation
├── scripts/           # Automation scripts
└── .github/           # GitHub Actions workflows
```

## Development Prerequisites
- Node.js 24.x LTS
- pnpm
- Python 3.14.x stable (Current setup uses 3.13 due to system availability)
- Docker & Docker Compose (required for PostgreSQL)
- Git

## Installation
1. Clone the repository.
2. Initialize the monorepo:
   ```bash
   pnpm install
   ```
3. Initialize the backend environment:
   ```bash
   cd apps/api
   python -m venv .venv
   source .venv/bin/activate  # Or .venv\Scripts\Activate.ps1 on Windows
   pip install -e ".[dev]"
   ```

## Environment Configuration
Copy `.env.example` to `.env` and fill in the required values. **Never commit `.env` to version control.**

## Starting PostgreSQL
Start the local database using Docker Compose:
```bash
docker compose up -d
```

## Starting Backend
```bash
cd apps/api
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

## Starting Frontend
```bash
cd apps/web
pnpm dev
```

## Running Tests
**Backend**:
```bash
cd apps/api
pytest
```
**Frontend**:
```bash
cd apps/web
pnpm test
```

## Git Workflow
1. Create feature branches from `main`.
2. Ensure CI checks (linting, tests) pass before merging.
3. Keep the git status clean from untracked development files (ignored via `.gitignore`).

## Security Rules
- **DO NOT** hard-code secrets.
- **DO NOT** commit `.env` files.
- Refer to `docs/security/baseline.md` for our strict security posture.

## Current Limitations
- This is a foundation build. Real authentication, domains (focus, trajectory, shield, etc.) and complete AI functionalities are explicitly omitted in this phase.
- Docker must be available to run the database.
- Python 3.14 is currently emulated/downgraded to 3.13 due to system restrictions.
