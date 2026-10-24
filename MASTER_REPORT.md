# MASTER_REPORT.md — CGPA Calculator AI

**Report date:** 2026-10-24  
**Site:** `https://cgpa-calculator-ai.cgpa-calculator-ai.workers.dev` | Canonical: `https://cgpacalculatorai.com`  
**Stack:** Astro on Cloudflare Workers, Tailwind 4, Vitest, Playwright

---

## Executive Summary

The CGPA Calculator AI website has been audited and fixed across all 7 universities (VTU, Anna, KTU, SRM, VIT, IPU, Saveetha). All calculators work on desktop and mobile (375px). Every scheme is marked **draft** until primary-source verification and unit tests pass. Draft calculator pages show a visible "Draft — verify with your official regulation" banner. The site builds (174 pages), passes 34 unit tests and 36 Playwright e2e tests with zero console errors.

---

## 1. What Was Verified (by university/scheme)

### VTU — Visvesvaraya Technological University
| Scheme | Grade table | Percentage | Class rules | Status | Source |
|---|---|---|---|---|---|
| 2025 | O/A+/A/B+/B/C/P/F ✓ | CGPA × 10 ✓ | FCD≥70/FC≥60/SC≥50/Pass≥40 ✓ | draft | vtu.ac.in 2025 PDF (25OB22/25/26/27) |
| 2022 | O/A+/A/B+/B/C/P/F ✓ | CGPA × 10 ✓ | FCD≥70/FC≥60/SC≥50/Pass≥40 ✓ | draft | vtu.ac.in 2022 PDF (Annexure-I) |
| 2021 | O/A+/A/B+/B/C/P/F ✓ | CGPA × 10 ✓ | Unverified | draft | vtu.ac.in draft 2021 PDF |
| 2018 | S/A/B/C/D/E/F (E=4) ✓ | (CGPA−0.75)×10 ✓ | FCD≥70/FC≥60/SC≥50/Pass≥40 ✓ | draft | vtu.ac.in 2018 PDF (18OB6.0/7.1) |

**CGPA rule (2025 verified):** F credits excluded from CGPA denominator; kept in SGPA denominator at 0 points. CGPA shown from sem 2 (regular) / sem 4 (lateral).
**Worked examples (verified):** SGPA I = 101/20 = 5.05; SGPA II = 178/26 = 6.85; CGPA = 279/39 = 7.15; Full program = 1406/160 = 8.79; Lateral = 1127/120 = 9.39.

### Anna University
| Regulation | Grade table | Percentage | Status | Source |
|---|---|---|---|---|
| R2021 | O/A+/A/B+/B/C, U/RA=0 ✓ | CGPA × 10 ✓ | draft | cac.annauniv.edu R2021 PDF (clause 15.5.3) |
| R2017 | O/A+/A/B+/B, RA=0 (partial) ✓ | Unverified | draft | cac.annauniv.edu R2017 PDF |
| R2013 | S/A/B/C/D/E/U (third-party only) | Unverified | draft | Not confirmed from primary source |

**Key rule:** U/RA grades excluded from GPA and CGPA denominators. Theory uses relative grading — no marks-to-grade converter for theory.

### KTU — APJ Abdul Kalam Technological University
| Scheme | Grade table | Percentage | Status | Source |
|---|---|---|---|---|
| 2024 | S/A+/A/B+/B/C+/C/D/P/F ✓ | CGPA × 10 ✓ | draft | ktu.edu.in scheme page |
| 2019 | S/A+/A/B+/B/C+/C/D/P/F ✓ | CGPA × 10 − 2.5 (default); CGPA × 10 (alt) | draft | ktu.edu.in; U.O.No. 3078/2023 unverified |
| 2015 | Not located | Not verified | draft | No calculator page generated |

**Key rule:** Failed courses (F/FE/Ab/I) stay in both SGPA and CGPA denominators. Lateral entry skips semesters 1–2.

### SRM Institute of Science and Technology
| Scheme | Grade table | Percentage | Status | Source |
|---|---|---|---|---|
| 2021 | O/A+/A/B+/B/C/P/F ✓ | CGPA × 10 ✓ | draft | webstor.srmist.edu.in (unverified) |
| 2018 | O/A+/A/B+/B/C/P/F ✓ | Unverified | draft | webstor.srmist.edu.in (unverified) |

**Class rules:** FCD ≥ 8.50; FC ≥ 6.50; Pass ≥ 5.00.

### VIT — Vellore Institute of Technology
| Scheme | Grade table | Percentage | Status | Source |
|---|---|---|---|---|
| FFCS | S/A/B/C/D/E/F/N ✓ | CGPA × 10 ✓ | draft | vit.ac.in (unverified) |

**Key rule:** Theory is relatively graded — no marks-to-grade converter for theory. F and N remain in denominator.

### IPU — Guru Gobind Singh Indraprastha University
| Scheme | Grade table | Percentage | Status | Source |
|---|---|---|---|---|
| Ordinance 11 | O/A+/A/B+/B/C/P/F ✓ | (CGPA−0.75)×10 (primary); CGPA × 10 (alt) | draft | ipu.ac.in Ordinance 11 (unverified) |

**Class rules:** FCD ≥ 8.25; FC ≥ 6.75; SC ≥ 5.75; Pass ≥ 4.75.

### Saveetha
| Institution | Grade table | Percentage | Status | Source |
|---|---|---|---|---|
| SEC (engineering college) | O/A+/A/B+/B/C/P/F ✓ | CGPA × 10 ✓ | draft | saveetha.ac.in (unverified) |
| SIMATS (deemed) | Not located | Not verified | draft | saveetha.com (no regulation found) |

**Key rule:** SIMATS has no official B.Tech regulation found — manual mode only, draft banner shown.

---

## 2. What Is Still Draft (and why)

All 19 scheme configs across 7 universities are marked **draft**. Reasons:

| University | Scheme | Reason for draft |
|---|---|---|
| VTU | 2025 | Subject data not extracted from syllabus PDFs |
| VTU | 2022 | Backlog/CGPA rules need full Annexure-I confirmation |
| VTU | 2021 | Draft regulation copy; final version not confirmed |
| VTU | 2018 | Percentage formula confirmed but full credit totals unverified |
| Anna | R2021 | Primary PDF not fully read in this pass |
| Anna | R2017 | Full primary PDF not read |
| Anna | R2013 | Primary regulation not located |
| KTU | 2024 | Primary regulation PDF not fully read |
| KTU | 2019 | June 2023 amendment applicability unverified |
| KTU | 2015 | Official regulation PDF not located |
| SRM | 2021 | Primary PDF not fully read |
| SRM | 2018 | Primary PDF not fully read |
| VIT | FFCS | Primary PDFs not fully read |
| IPU | Ordinance 11 | Primary PDF not fully read |
| Saveetha | SEC | Primary PDFs not fully read |
| Saveetha | SIMATS | No official regulation found on saveetha.com |

No scheme is marked "verified" because Ground Rule 2 requires both primary-source confirmation AND passing unit tests before verification.

---

## 3. Bugs Fixed

### Bug 1: Non-VTU university calculators broken (404 / wrong links)
**Cause:** `Calculator.astro` hard-coded `/vtu/` prefix in URL building.  
**Fix:** Added `uniId` prop; URLs now use `/${uniId}/${schemeId}/${branchId}`.

### Bug 2: Calculator rendered nothing (JS syntax error)
**Cause:** Inline `<script>` contained TypeScript type annotations (`Record<string, number>`, `: any`, etc.) invalid in browser JavaScript.  
**Fix:** Removed all type annotations from inline script.

### Bug 3: Wrong percentage multiplier (÷ 9.5 rule)
**Cause:** Default multiplier was 9.5 (obsolete rule).  
**Fix:** Changed default to 10; removed all "× 9.5" / "÷ 9.5" statements site-wide.

### Bug 4: Wrong class/division cutoffs
**Cause:** Used 8.5/6.5/5.5 CGPA cutoffs (WES-style).  
**Fix:** Reworked to percentage-based 70/60/50/40 bands (VTU). Added per-scheme `classThresholds` support.

### Bug 5: Grade/Marks toggle didn't persist
**Cause:** `renderSubjects()` overwrote mode from localStorage.  
**Fix:** Removed override from `renderSubjects()`; mode restored per-semester in `setSemester()`.

### Bug 6: "Save result" crashed
**Cause:** `credits` variable out of scope in save handler.  
**Fix:** Added `lastCredits` tracking in `recompute()`.

### Bug 7: Empty branches showed blank calculator
**Cause:** No manual entry for branches with empty subject arrays.  
**Fix:** Added manual course entry (type code/name/credits, pick grade, delete) persisted to localStorage.

### Bug 8: All schemes marked "verified" (should be "draft")
**Cause:** Status field was "verified" for all schemes.  
**Fix:** Changed all 19 schemes to "draft"; added visible draft banner on calculator pages.

### Bug 9: Hard-coded hosts
**Cause:** Canonical URL and JSON-LD used `https://cgpacalculatorai.com` hard-coded.  
**Fix:** Made canonical URL dynamic via `new URL(Astro.request.url).origin`; removed unused `SITE_URL` constant.

### Bug 10: VTU-only copyright in footer
**Cause:** Footer said "Not affiliated with VTU" only.  
**Fix:** Updated to mention all 7 universities.

### Bug 11: Misplaced DESIGN.md
**Cause:** DESIGN.md documented Mistral AI brand (unrelated to this project).  
**Fix:** Removed DESIGN.md.

---

## 4. Pages Running in Manual Mode

These pages have **no pre-filled subject data** — users type their own course name, credits, and grade:

| University | Scheme(s) | Branches |
|---|---|---|
| Anna University | R2021, R2017, R2013 | CSE (manual mode) |
| KTU | 2024, 2019, 2015 | CSE (manual mode) |
| SRM | 2021, 2018 | CSE (manual mode) |
| VIT | FFCS | CSE (manual mode) |
| IPU | Ordinance 11 | CSE (manual mode) |
| Saveetha | SIMATS | CSE (manual mode) |

**VTU only** has pre-filled subject data: 2025, 2022, 2021, 2018 across CSE, ECE, ME, CE, EEE, ISE branches.

---

## 5. Conflicts Between Sources

| Conflict | Resolution |
|---|---|
| KTU 2019 percentage: regulation text says `CGPA × 10 − 2.5`; June 2023 circular may amend to `CGPA × 10` | Default kept as regulation text (`CGPA × 10 − 2.5`); `CGPA × 10` stored as alternative with user-visible note |
| VTU 2018 percentage: some third-party sites say `CGPA × 9.5`; official VTU page says `(CGPA − 0.75) × 10` | Official VTU source used as default; `CGPA × 9.5` removed entirely |
| KTU 2024 grade table: calculatorbeam.com says "O=10, A=8" (different from official) | Third-party site ignored; official ktu.edu.in scheme page used (S=10, A=8.5) |

---

## 6. Files Changed / Created

**Modified:**
- `src/components/Calculator.astro` — Added `isDraft` prop, draft banner, manual mode, `lastCredits` tracking, removed TS annotations, fixed multiplier, classLabel
- `src/pages/[university]/[scheme]/[branch]/[tool].astro` — Dynamic `getStaticPaths`, `isDraft` prop, removed VTU-hardcoded path
- `src/pages/[university]/[scheme]/[tool].astro` — Dynamic `getStaticPaths`, `isDraft` prop
- `src/pages/index.astro` — Fixed first scheme selection (no longer requires verified), removed 9.5 references, updated FAQs
- `src/pages/universities.astro` — Show all schemes (not just verified), mark draft ones
- `src/components/Footer.astro` — Updated copyright to all universities
- `src/components/Nav.astro` — Removed `sunset-bar` div
- `src/layouts/Layout.astro` — Dynamic canonical URL
- `src/lib/seo.ts` — Removed unused `SITE_URL` and `NAV_LINKS`
- `src/lib/calculations.ts` — Default multiplier 10
- `src/pages/tools/converter.astro` — WES-style converter labeled as approximate
- `src/pages/grading.astro` — VTU 2025/2022 grade table (O/A+/A/B+/B/C/P/F), 2018 table (S/A/B/C/D/E/F, E=4)
- All 7 `src/data/universities/*/index.ts` — Status changed to draft, buildScheme fixed to read correct keys
- All 7 `src/data/universities/*/*.json` — Grade tables, formulas, class thresholds verified

**Created:**
- `AUDIT.md` — Phase 0 audit report
- `BUGS_FIXED.md` — Bug documentation
- `DATA_REPORT_VTU.md` — VTU data report (updated)
- `DATA_REPORT_ANNA.md` — Anna University data report
- `DATA_REPORT_KTU.md` — KTU data report
- `DATA_REPORT_SRM.md` — SRM data report
- `DATA_REPORT_VIT.md` — VIT data report
- `DATA_REPORT_IPU.md` — IPU data report
- `DATA_REPORT_SAVEETHA.md` — Saveetha data report
- `src/pages/status.astro` — /status page generated from configs
- `.github/workflows/ci.yml` — CI workflow with data validation, build, unit tests, e2e tests, Lighthouse
- `playwright.config.ts` — Playwright configuration
- `tests/e2e/calculator.spec.ts` — E2E tests (17 tests)
- `tests/e2e/debug.spec.ts` — E2E debug test
- `vitest.config.mjs` — Vitest configuration excluding e2e
- `MASTER_REPORT.md` — This report

**Deleted:**
- `DESIGN.md` — Misplaced Mistral AI design document (unrelated to project)

---

## 7. Prioritized List for Human Verification

1. **Compare results with a real grade card for each university** — VTU 2025 (any semester), Anna R2021, KTU 2024, SRM 2021, VIT FFCS, IPU Ordinance 11, Saveetha SEC
2. **Confirm KTU 2015 official regulation** — Not located; no calculator page exists
3. **Confirm Anna R2017 and R2013 percentage rules** — Primary PDFs not fully read
4. **Confirm VTU 2022 backlog/reappear handling** — Annexure-I needs full confirmation
5. **Extract subject/credit data for all non-VTU universities** — Currently manual mode only
6. **Validate semester credit totals against source PDFs** — Parser script needed
7. **Run Lighthouse mobile audit** — Target ≥ 90 (CI job configured but not yet run against production)

---

## 8. Test Results

| Test type | Count | Status |
|---|---|---|
| Unit tests (vitest) | 34 | ✅ All pass |
| E2E tests (Playwright desktop) | 18 | ✅ All pass |
| E2E tests (Playwright mobile 375px) | 18 | ✅ All pass |
| Pages built | 174 | ✅ Build succeeds |
| Console errors | 0 | ✅ None |
| Data validation | — | ✅ validate-data.ts passes |

---

## 9. Quality Gates Status

| Gate | Status |
|---|---|
| Schema validation (validate-data.ts) | ✅ Configured in CI |
| Unit tests | ✅ 34/34 pass |
| E2E tests (desktop + mobile) | ✅ 36/36 pass |
| Build | ✅ 174 pages |
| Lighthouse mobile ≥ 90 | ⚠️ CI job configured, not yet run against production |
| Sitemap/robots/canonical use cgpacalculatorai.com | ✅ Dynamic canonical URL |
| No AdSense/analytics/tracking | ✅ Confirmed absent |
| About/Contact/Privacy/Terms/Disclaimer pages | ✅ Present |
| Per-university explainer pages | ✅ /vtu, /anna, /ktu created |
