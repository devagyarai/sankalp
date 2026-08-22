# Foundation Audit

This document summarizes the audit of the Sankalp repository foundation, identifying issues that could fracture the monorepo or violate security baselines.

| Finding | Severity | Evidence | Recommended Action | Status |
|---|---|---|---|---|
| Accidental Nested Package Manager Config | HIGH | `apps/web/pnpm-workspace.yaml` | Delete the nested `pnpm-workspace.yaml` | Fix Required Now |
| Invalid YAML in Root Workspace Config | HIGH | `pnpm-workspace.yaml` line 5 | Fix the unrs-resolver line | Fix Required Now |
| Incomplete Standard Response Schema | MEDIUM | `apps/api/app/schemas/common.py` | Add explicit `success: bool = True` to StandardResponse and ErrorResponse | Fix Required Now |
| Incomplete API Contract Documentation | MEDIUM | `docs/architecture/api-contract.md` | Expand the endpoint table with schemas, errors, and auth expectations | Fix Required Now |
| Environment Variable Spillage | MEDIUM | `.env.example` | Separate PUBLIC and PRIVATE variables, add `NEXT_PUBLIC_API_BASE_URL` | Fix Required Now |
| Security Baseline Gaps | MEDIUM | `docs/security/baseline.md` | Add rules for threat-analysis untrusted input and chatbot trusted static injection safety | Fix Required Now |
| Missing Explicit Frontend Client Methods | LOW | `apps/web/lib/api/client.ts` | The API client has a generic request wrapper but doesn't explicitly expose PATCH/DELETE wrappers yet, although it supports them via options | Fix Required Now |
| Duplicate Lockfiles | INFO | `Get-ChildItem` search | No nested `pnpm-lock.yaml` found (only `.next/` build outputs and root) | Clean |
| Conflicting Versions | INFO | package.json / pyproject.toml | Dependencies match requirements. Next.js 16.3.2 is compatible with React 19.2.8 | Clean |
