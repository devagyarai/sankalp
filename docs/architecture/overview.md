# Architecture Overview

## Modular Monolith
Sankalp is designed as a **modular monolith**. 
- The application boundaries are clearly defined at the domain level (e.g., focus, trajectory, pulse).
- It allows rapid development by a small team without the operational overhead of microservices or distributed systems.

## Frontend / Backend Separation
- **Frontend**: Next.js App Router providing the user interface and local intelligent interactions.
- **Backend**: FastAPI serving the RESTful API.

## Database Boundary
- **Database**: PostgreSQL used as the primary data store, accessed via SQLAlchemy ORM.
- **Migrations**: Alembic manages schema versioning.

## Future Layers
- **AI Layer**: Server-side machine learning and AI capabilities will be integrated modularly.
- **Browser-Local AI**: Future frontend implementations will leverage in-browser models where appropriate.
