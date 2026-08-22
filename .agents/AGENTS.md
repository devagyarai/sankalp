# SANKALP Team Rules & Baseline

These are the strict architectural and operational rules for the SANKALP project. All AI agents and developers MUST follow these guidelines.

## 1. Technology Baseline
- **Frontend Stack:** Node 24 LTS, pnpm 11, Next.js 16, TypeScript 5.9.x, Tailwind CSS.
- **Backend Stack:** FastAPI, Python 3.13, PostgreSQL 17.
- **Package Manager:** `pnpm` exclusively. Do not mix `npm` or `yarn`.

## 2. API Contract Boundaries
- The frontend must NEVER directly talk to PostgreSQL or any database.
- The frontend communicates with the FastAPI backend **exclusively** through `/api/v1/*`.
- Do not introduce another backend, database client, ORM, API framework, or alternative package manager.
- All API response/request contracts must be defined centrally and consumed by the frontend via `src/lib/api-client.ts`.

## 3. Core SANKALP Philosophy
- Do not overbuild. Small, stable vertical slices first.
- The system must determine the **Next Best Action** rather than just generic advice.
- Explanations must be deterministic-first where possible; do not overuse LLMs for simple sorting/validation.
