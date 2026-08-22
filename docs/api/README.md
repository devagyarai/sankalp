# Sankalp API Documentation

This directory contains the documentation for the Sankalp Backend API (V1).

## Contract Enforcement
All communication with the backend happens via `http://localhost:8000/api/v1`.

For full documentation on the Standard Responses, Error formats, and Architecture rules, refer to [API Contract](../architecture/api-contract.md).

## OpenAPI / Swagger
In development mode, the FastAPI backend automatically serves interactive documentation:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **OpenAPI Schema**: [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json)

These interactive docs are the **source of truth** for schema definitions, types, and required fields.

## Frontend Client
The frontend defines its API consumption strategy in `apps/web/lib/api/client.ts`. It also provides a mock layer (`apps/web/lib/api/mock/client.ts`) allowing rapid UI development while the backend implements real business logic.
