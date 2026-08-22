# Cross-Domain Intelligence Architecture

## Overview
Phase 6 of SANKALP implements the cross-domain intelligence layer. It sits above the 6 specialized domain engines (FOCUS, TRAJECTORY, PULSE, SHIELD, SENTINEL, NEXUS) to combine isolated signals into unified, evidence-backed insights.

## Architecture
The layer relies on a functional, stateless architecture:
1. **Signal Extraction**: The output (`IntelligenceOutputSchema`) of each domain engine is normalized into an array of `DomainSignal` objects.
2. **Rule Evaluation**: Deterministic rules evaluate combinations of signals (e.g. `PULSE` trend + `FOCUS` consistency) and output an `Insight` object when conditions are met.
3. **Insight Model**: Insights are derived dynamically and never persisted to avoid redundant state. They contain a `title`, `summary`, `severity`, `confidence`, and evidence strings.
4. **Recommendation Aggregation**: Recommendations from both individual domains and cross-domain insights are deduplicated, prioritized (Critical, High, Medium, Low), and scored based on `severity * confidence`.
5. **Unified Endpoint**: `GET /api/v1/intelligence/overview` calls all domains on-demand, applies rules, and returns a `UnifiedOverview`.

## Temporal Logic & Data Sufficiency
Basic trends are calculated based on historical snapshots where supported (e.g., Academic GPA trends). If insufficient data is provided (e.g., only 1 exam logged), the intelligence engine defaults to a data-quality level of `INSUFFICIENT_DATA` rather than guessing a trend.

## Future ML Extension
This deterministic framework (Signals -> Rules -> Insights) is structurally identical to how we might deploy an ML model in the future. A future ML extension point would replace static rule matching in `apply_all_rules` with an inferred output based on the exact same array of input `DomainSignals`, preserving the rest of the application.
