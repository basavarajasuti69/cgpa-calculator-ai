# AUDIT.md — CGPA Calculator AI

**Audit date:** 2026-10-24  
**Site:** `https://cgpa-calculator-ai.cgpa-calculator-ai.workers.dev` + local `http://localhost:4323`

## 1. Routes discovered

| Route | Purpose | Status |
|---|---|---|
| `/` | Homepage — SEO content, university list, FAQs | Renders |
| `/universities` | University picker (verified schemes only) | Renders |
| `/request-college` | New-college request form | Renders |
| `/vtu`, `/anna`, `/ktu`, `/srm`, `/vit`, `/ipu`, `/saveetha` | Per-university explainer pages | Renders |
| `/grading`, `/examples` | Grade tables + worked examples | Renders |
| `/tools/scanner`, `/tools/ask`, `/tools/converter`, `/tools/planner`, `/tools/what-if` | AI/converter tools | Renders (scanner not implemented — alert only) |
| `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer` | Legal pages | Render |
| `/[university]/[scheme]/[branch]/[tool].astro` | Calculator (SGPA/CGPA/percentage) | Renders |
| `/[university]/[scheme]/[tool].astro` | Calculator with default branch | Renders |
| `/api/ai/ask`, `/api/ai/scan`, `/api/ai/explain`, `/api/ai/faq`, `/api/college-request` | AI API endpoints | Present |

## 2. Data files

| File | Purpose | Status |
|---|---|---|
| `src/data/types.ts` | TS types: University, Scheme, Branch, Semester, Subject, GradeEntry | Present |
| `src/data/generic.ts` | Generic 10-point credit-weighted calculator engine | Present |
| `src/data/universities/<uni>/<scheme>.json` | Per-scheme grade tables, formulas, class rules | Present for all 7 universities |
| `src/data/universities/vtu/branches.ts` | VTU branch/subject data (CSE, ECE, ME, CE, EEE, ISE) | Present |
| `data/universities/vtu/<scheme>.json` | Duplicate VTU scheme JSON at repo root | Present (duplicate) |
| `src/lib/data.ts` | Data access helpers (getUniversity, getScheme, getBranch...) | Present |
| `scripts/validate-data.ts` | Data validation script | Present |

## 3. Broken / incorrect items (pre-fix)

### 3.1 Schemes marked "verified" but should be "draft" (Ground Rule 2 violation)

Per Ground Rule 2, every config has status "draft" until its grade table, formulas and percentage rule are confirmed from a primary source AND its unit tests pass. Currently:

| University | Scheme | Status | Should be | Reason |
|---|---|---|---|---|
| VTU | 2025 | verified | draft | No unit tests pass yet for new engine |
| VTU | 2022 | verified | draft | No unit tests pass yet |
| VTU | 2021 | verified | draft | No unit tests pass yet |
| VTU | 2018 | verified | draft | No unit tests pass yet |
| Anna | R2021 | verified | draft | No unit tests pass yet |
| Anna | R2017 | verified | draft | No unit tests pass yet |
| Anna | R2013 | verified | draft | No unit tests pass yet |
| KTU | 2024 | verified | draft | No unit tests pass yet |
| KTU | 2019 | verified | draft | No unit tests pass yet |
| KTU | 2015 | draft | draft | Correct |
| SRM | 2021 | verified | draft | No unit tests pass yet |
| SRM | 2018 | verified | draft | No unit tests pass yet |
| VIT | FFCS | verified | draft | No unit tests pass yet |
| IPU | Ordinance 11 | verified | draft | No unit tests pass yet |
| Saveetha | SIMATS | verified | draft | No unit tests pass yet |

Only KTU 2015 was already correctly marked "draft". All others need to be changed to "draft".

### 3.2 No visible "Draft - verify with your official regulation" banner

Ground Rule 2 requires draft pages to show a visible banner. None of the calculator pages render a status badge/banner. The `cgpaFormulaNote` is only shown in the formula box, not as a prominent draft banner.

### 3.3 No `/status` page

Ground Rule 4 requires a `/status` page (or STATUS.md) generated from configs showing per-university/scheme status, sources, last verified, subject coverage, unverified fields. None exists.

### 3.4 Hard-coded hosts

- JSON-LD in `[tool].astro` uses `https://cgpacalculatorai.com` hard-coded in breadcrumb items, SoftwareApplication URL, and offer URL.
- Canonical/OG tags in Layout use `https://cgpacalculatorai.com` — this works on workers.dev only if the custom domain is pointed; should be relative or protocol-relative.
- Index page FAQs and text say "Credits stay filled per the VTU {sc.name}" — VTU-specific text leaks to non-VTU university pages.

### 3.5 Scanner tool not implemented

`/tools/scanner` shows a file upload UI but clicking "Confirm & calculate" just shows an alert: "Backend integration complete; UI wiring next step." Not implemented.

### 3.6 Ask AI page requires unimplemented API

`/tools/ask` POSTs to `/api/ai/ask`. The endpoint exists but may return errors in production.

### 3.7 Root-level `data/` directory duplicates VTU data

`data/universities/vtu/<scheme>.json` duplicates `src/data/universities/vtu/...` content. Could cause confusion about which is canonical.

### 3.8 DESIGN.md is a misplaced Mistral AI design doc

`DESIGN.md` documents Mistral AI's brand (sunset gradients, PP Editorial Old font, cream surfaces) — completely unrelated to this CGPA calculator project. Should be removed or replaced.

## 4. Deployed site verification

**Local dev (`http://localhost:4323`)** — not yet opened in this audit session.

**Deployed (`https://cgpa-calculator-ai.cgpa-calculator-ai.workers.dev`)** — homepage loads; calculator pages load but no visible draft status banner on draft schemes; subject rows render for VTU (pre-filled data); other universities show empty subject lists (manual mode works).

## 5. Console errors / failed requests

Not yet captured in Playwright. To be captured in Phase 1.

## 6. Summary of required fixes (Phase 1+)

1. Change all scheme statuses from `verified` → `draft` (except KTU 2015 already draft).
2. Add visible "Draft — verify with your official regulation" banner on draft scheme pages.
3. Remove / replace `DESIGN.md` (Mistral AI design doc, unrelated).
4. Remove hard-coded `https://cgpacalculatorai.com` hosts; use relative/protocol-relative URLs.
5. Fix VTU-specific text leaking to non-VTU pages.
6. Implement scanner tool or remove/hide it per Ground Rule 1 (only list features that exist).
7. Add `/status` page generated from configs.
8. Add CI gates: schema validation, unit tests, Playwright e2e, Lighthouse mobile >= 90.
9. Write `DATA_REPORT_<UNIVERSITY>.md` for each university.
10. Write `MASTER_REPORT.md` final report.
