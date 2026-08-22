# Phase 5: Intelligence Architecture

## Overview
Phase 5 introduces deterministic, explainable intelligence engines for SANKALP's core modules. The goal is to provide insight without the unpredictability of generative AI. 

## The Six Engines
1. **FOCUS (StudySync)**: Analyzes study session metrics against goals to recommend adjustments in pace, duration, and focus.
2. **TRAJECTORY (SkillMap)**: Calculates gaps between current skills and target career skills. Highlights critical skill shortages.
3. **PULSE (EduPulse)**: Identifies students at risk based on falling GPAs, increasing absences, and missing assignments.
4. **SHIELD (Digital Safety)**: Scores a user's digital footprint (2FA, privacy, password strength) and provides targeted safety recommendations.
5. **SENTINEL (ScamMap)**: Evaluates incoming texts, emails, and alerts for financial scams using deterministic rules (keywords and pattern matching).
6. **NEXUS**: Correlates new threat indicators with historical threats in the relational database.

## Design Principles
- **No Generative AI**: Intelligence is derived via math, thresholds, and keyword matching.
- **Explainability**: Every intelligence output includes an `issues` array and an `explanation` array.
- **Normalized Scoring**: All modules use a common `0-100` scoring scale, implemented in `app.intelligence.common.scoring`.
- **Modularity**: Engines live in `apps/api/app/intelligence/` and are cleanly separated from the domain services (`app/services/*`).
- **Standardized Schema**: All engines return the `IntelligenceOutputSchema` containing `score`, `metrics`, `issues`, `recommendations`, `explanation`, and `data_quality`.
