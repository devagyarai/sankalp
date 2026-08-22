# Sankalp Technology Baseline

This document locks the foundational technology stack for the Sankalp project, ensuring reproducibility across all environments.

## Locked Stack

| Technology | Version | Purpose | Notes |
|---|---|---|---|
| Node.js | 24.x LTS | Frontend runtime | Strictly enforced via `.nvmrc` and `.tool-versions` (currently 24.14.0). |
| pnpm | 11.x | Frontend package manager | Enforced via root `package.json` (11.17.0). Do not use npm or yarn. |
| Next.js | 16.3.x | Frontend framework | |
| React | 19.2.x | UI library | Version aligned with Next.js 16.3.2 dependencies. |
| TypeScript | 5.9.x | Frontend language | |
| Python | 3.13.x | Backend runtime | Locked at 3.13 due to system availability (3.14 was unavailable). Enforced via `.tool-versions`. |
| FastAPI | 0.141.1 | Backend framework | |
| Pydantic | 2.x | Validation / Settings | Core dependency for FastAPI and configuration (`pydantic-settings`). |
| SQLAlchemy | 2.x | ORM | |
| Alembic | 1.x | Database migrations | |
| PostgreSQL | 17 | Primary Database | Specified via `postgres:17-alpine` Docker image. |
| Vitest | 4.x | Frontend testing | Together with Testing Library. |
| pytest | 9.x | Backend testing | With `pytest-asyncio` and `httpx`. |
| Ruff | 0.x | Backend linting/formatting | Standardizes Python code quality. |
| ESLint | 9.x | Frontend linting | |
| Prettier | N/A | Frontend formatting | Expected configuration to be added when formatting rules are established. |
