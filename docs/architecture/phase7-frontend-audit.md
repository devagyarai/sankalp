# Phase 7: Frontend Architecture & Audit

## 1. Current State of the Frontend (`apps/web/`)
- **Framework**: Next.js 16.3.2 (App Router), React 19.2.8.
- **Styling**: Tailwind CSS v4 setup with `globals.css` using default background/foreground vars.
- **Components**: The `components/` directory does not exist yet; UI is currently inlined in page layouts.
- **Authentication**: `lib/auth/auth-client.ts` uses cookies (`credentials: "include"`) effectively.
- **API Client**: `lib/api/client.ts` exists and supports basic requests but is missing Phase 5 & 6 intelligence endpoints (`/api/v1/intelligence/*`).
- **Dashboard**: `app/dashboard/page.tsx` is currently a blank shell rendering a welcome message.

## 2. Missing Frontend Capabilities
1. **Intelligence Client Integration**: The API client must be extended to fetch `UnifiedOverview` and domain-specific intelligence.
2. **Design System**: SANKALP needs a premium UI token set (typography, standardized cards, badges) without over-engineering or introducing a heavy component library.
3. **Application Shell & Navigation**: Need a persistent sidebar/navigation shell to route between Dashboard, StudySync, EduPulse, SkillMap, Shield, Sentinel, and Nexus.
4. **Data States**: No loading skeletons, empty states, or error boundaries exist for authenticated data fetching.
5. **Types**: Missing frontend representations of the backend `DomainSignal`, `Insight`, and `UnifiedOverview` Pydantic models.

## 3. Recommended Component Structure
We will establish `apps/web/components/` with the following structure:
- `components/ui/`: Reusable, generic UI elements (Card, Badge, Button, Skeleton, Alert).
- `components/dashboard/`: Dashboard-specific blocks (OverallHealthCard, DomainHealthGrid, InsightCard).
- `components/layout/`: Application shell elements (Sidebar, Header).
- `components/domain/`: Reusable patterns for the six domains.

## 4. Implementation Sequence
1. **API & Types**: Generate strict TypeScript interfaces for Phase 6 contracts and update `lib/api/intelligence.ts`.
2. **Design System & Layout**: Set up standard Tailwind configuration for a premium look (inter typography, subtle shadows, clean borders). Build `AppLayout`.
3. **Dashboard View**: Implement `app/dashboard/page.tsx` to fetch and render the `UnifiedOverview`.
4. **Domain Views**: Scaffold the 6 domain routes (`app/dashboard/study`, etc.).
5. **State Handling**: Implement `Loading` and `Error` boundaries for the routes.
6. **QA & Accessibility**: Run full frontend test suite and accessibility reviews.
