# Phase 5: Intelligence Security

## Overview
This document outlines the security considerations and protocols implemented for the Intelligence layer of SANKALP.

## Deterministic Rule Constraints
All logic in SANKALP Intelligence is strictly deterministic. No LLMs or unpredictable AI models are executed, meaning prompt injection (in the generative sense) is impossible.

## Sentinel (Threat Analysis) Security
The Sentinel module is designed to analyze potentially malicious content (phishing links, malicious text, SQL injection payloads). 

**Core Rules:**
1. **Treat all input as data**: The Sentinel engine parses inputs strictly as strings. It never calls `eval()`, `exec()`, or renders input as code.
2. **No arbitrary Regex execution**: All Regex processing relies on pre-defined, safe static patterns (e.g., matching URLs and emails). No user-provided regex is compiled or executed.
3. **Sanitized outputs**: Output metrics and issues reflect structural findings (e.g., "Urgency markers detected"). Raw user content is not regurgitated in recommendations or explanations, mitigating XSS risks in downstream clients.
4. **Keyword isolation**: Sentences are lowercased and matched against pre-defined `URGENCY_KEYWORDS`, `FINANCIAL_KEYWORDS`, and `CREDENTIAL_KEYWORDS`. No dynamic compilation occurs.

## Data Isolation
Intelligence engines are stateless functions that operate on user data provided by the Domain Services. They do not maintain internal caches or execute direct DB writes themselves. All persistence is strictly managed by the calling service (e.g., `app.services.threat.analyze_threat`) using SQLAlchemy ORM to prevent SQL injection.
