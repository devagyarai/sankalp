# Sankalp Security Baseline

This document outlines the strict security requirements for the Sankalp project.

## Core Rules
- **Secrets Management**: Secrets (passwords, API keys, session tokens) MUST NEVER be committed to version control. Use `.env` files locally and secure secret managers in production.
- **Database Security**: Database credentials must not be exposed. The database should not be accessible from the public internet.
- **CORS Policy**: Cross-Origin Resource Sharing must be explicitly defined. Wildcard (`*`) origins are prohibited for authenticated APIs.
- **Input Validation**: All client input must be rigorously validated before processing.
- **Authentication & Sessions**: Will utilize secure, HTTP-only session mechanisms. Passwords must be strongly hashed (e.g., bcrypt/argon2), never stored in plaintext.
- **Logging**: Sensitive data (PII, credentials) must be scrubbed from logs.
- **Code Execution**: Unsafe `eval()` and arbitrary shell execution are strictly forbidden.
- **Dependency Hygiene**: Regular audits of third-party dependencies are required.

## Domain-Specific Rules
- **Threat Analysis Input**: The threat-analysis system will receive attacker-controlled text. All input to this module MUST be treated as strictly untrusted and sanitized before any logging or downstream processing.
- **Chatbot Injection Safety**: The chatbot knowledge base (`faq.json`) must be treated as trusted static data. User messages must NEVER be allowed to modify or inject into the FAQ knowledge base. User input is strictly read-only query data.

## Authentication & Session Rules (Phase 3)
- Use ONLY `HttpOnly`, `SameSite=Lax` cookies for JWT storage.
- Never return `password_hash` in an API response.
- Do not store session access tokens in `localStorage` or `sessionStorage`.
- All user-specific domain endpoints MUST require authentication via the `get_current_user` dependency.
