# ADR 001: Modular Monolith Architecture

## Status
Accepted

## Context
The Sankalp platform requires multiple distinct intelligent capabilities (productivity, career intelligence, digital safety, etc.). We need to establish an architectural pattern that supports this breadth without overwhelming the team.

## Decision
We will build Sankalp as a **modular monolith** rather than a microservices architecture.

## Rationale
- **Team Size**: A 3-person hackathon team cannot effectively manage the operational complexity of microservices (Kubernetes, distributed tracing, network partitioning).
- **Time Constraints**: The hackathon deadline requires rapid iteration and simpler deployments.
- **Development Experience**: Local development is significantly easier with a single backend process and database.
- **Maintainability**: Domain boundaries can still be strictly enforced at the module level within the monolith.

## Consequences
- Simpler CI/CD pipelines.
- Easier debugging and end-to-end testing.
- Must be vigilant to prevent tight coupling between distinct domains (e.g., `focus` should not directly query `shield` database tables without going through a proper interface).
