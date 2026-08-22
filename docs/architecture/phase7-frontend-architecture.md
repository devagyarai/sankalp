# Phase 7 Frontend Architecture

## Overview
Phase 7 establishes the production Intelligence Dashboard and Frontend Integration for SANKALP. It natively consumes the cross-domain intelligence layer from Phase 6.

## Architecture Decisions
1. **Next.js App Router**: Utilized Next.js 16.3.2 with `use client` directives for data fetching, keeping state management local to React hooks.
2. **Native Tailwind CSS UI**: Avoiding massive component libraries (e.g., MUI or shadcn) to keep the repository lean. We built lightweight primitive components in `apps/web/components/ui/` (`Card`, `Badge`, `Button`, `Skeleton`).
3. **Data Fetching via `apiClient`**: Secure HTTP-only cookies are passed automatically by the browser via `credentials: "include"`. 
4. **Strong Typing**: Implemented strict representations of the FastAPI pydantic models (`UnifiedOverview`, `IntelligenceOutputSchema`, `Insight`, etc.) in `types/intelligence.ts`.

## Routing Structure
- `/dashboard`: The unified cross-domain intelligence overview.
- `/dashboard/study`: FOCUS Domain insights (StudySync).
- `/dashboard/academic`: PULSE Domain insights (EduPulse).
- `/dashboard/career`: TRAJECTORY Domain insights (SkillMap).
- `/dashboard/safety`: SHIELD Domain insights (Safety).
- `/dashboard/threats`: SENTINEL/NEXUS Domain insights (Threat Analysis).

## Component Architecture
- `AppLayout`: Global authenticated shell with persistent sidebar navigation.
- `Dashboard Components`: Domain-specific components (`OverallHealthCard`, `DomainHealthGrid`, `PriorityActions`, `CrossDomainInsightCard`).

## State Management
Each route fetches data independently. Loading skeletons (`Skeleton`) and empty states (Insufficient Data) are handled gracefully at the page level to prevent blank screens or unhandled promise rejections.
