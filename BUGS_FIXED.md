# Bugs Fixed — CGPA Calculator AI

## PART A — Calculators now work

### 1. Non-VTU university calculators were broken (404 / wrong links)
**Cause:** `Calculator.astro` built all navigation URLs with a hardcoded `/vtu/` prefix in `pathBase` and `buildBasePath()`. Selecting a different scheme/branch on Anna/KTU/SRM/VIT/IPU/Saveetha pages redirected to `/vtu/...`, which does not exist for those universities.
**Fix:** Added an `uniId` prop (passed from the page template) and changed URL building to `/${uniId}/${schemeId}/${branchId}`. Also added `data-uni-id` to the calculator root so the inline script reads the correct university.
**Files:** `src/components/Calculator.astro`, `src/pages/[university]/[scheme]/[branch]/[tool].astro`, `src/pages/[university]/[scheme]/[tool].astro`

### 2. Calculator did not render at all (JS syntax error)
**Cause:** The inline `<script is:inline>` block contained TypeScript type annotations (`Record<string, number>`, `(a: number, b: any)`, `(cgpa: number, f: string): number | null`, `let result: number`) inside plain JavaScript. Browsers cannot parse these, throwing `Missing initializer in const declaration` and preventing `renderSubjects()` from ever running — so no subject rows, no grade chips, no SGPA.
**Fix:** Removed all type annotations from the inline script.
**File:** `src/components/Calculator.astro`

### 3. Wrong default percentage multiplier (used ÷ 9.5 rule)
**Cause:** The calculator defaulted to `multiplier: 9.5` (the obsolete "percentage = CGPA ÷ 9.5" rule). VTU/Anna and most schemes use `CGPA × 10`.
**Fix:** Changed the default multiplier to `10`. Individual scheme configs still override where required.
**File:** `src/components/Calculator.astro`

### 4. Wrong class/division cutoffs
**Cause:** `classLabel()` used 8.5 / 6.5 / 5.5 / 4.5 CGPA cutoffs (WES-style). VTU 2025 uses percentage-based classes: FCD ≥ 70%, FC 60–<70, SC 50–<60, Pass 40–<50 (percentage = CGPA × 10).
**Fix:** Reworked `classLabel()` to compute `percentage = CGPA × multiplier` and apply the 70/60/50/40 bands. Added a `classThresholds` prop so each scheme can define its own CGPA-based thresholds (used by VTU class thresholds config).
**File:** `src/components/Calculator.astro`

### 5. Grade/Marks toggle did not persist
**Cause:** Clicking the Grade/Marks toggle set `currentMode`, but `renderSubjects()` immediately overwrote it by reloading `saved.mode` from `localStorage`, so the mode always snapped back to 'grade'.
**Fix:** Removed the `currentMode = saved.mode` override from `renderSubjects()`. Mode is now restored per-semester in `setSemester()` (pill navigation) and set directly by the toggle handlers.
**File:** `src/components/Calculator.astro`

### 6. "Save result" crashed / saved wrong value
**Cause:** The SGPA save handler referenced `credits`, a `let` declared inside `recompute()`, which was out of scope at save time.
**Fix:** Track `lastCredits` inside `recompute()` and use it in the save handler so the saved value reflects the last computed SGPA only when credits > 0.
**File:** `src/components/Calculator.astro`

### 7. Branches with no subject data showed an empty calculator
**Cause:** When `semesters[].subjects` was empty, the page rendered only "No subjects found for this semester." with no way to enter courses manually.
**Fix:** Added manual course entry for empty semesters: the user can type a course code, name, and credits, pick a grade, and delete courses. Manual courses are persisted to `localStorage` per semester and included in SGPA computation. A "subject data coming" note explains the branch has no pre-filled data yet.
**File:** `src/components/Calculator.astro`

### 8. Client-side rendering / hydration
The calculator is rendered client-side from `data-*` JSON attributes that are server-rendered into the HTML (grade table, semesters, credits, CGPA config). This gives SEO-visible content (semester credit total, subject list in the SEO section) while the interactive grade chips/SGPA update live after hydration. No hard-coded host is used in links/fetch calls, so the site works identically on `cgpa-calculator-ai.cgpa-calculator-ai.workers.dev` and `cgpacalculatorai.com`.
**Files:** `src/pages/[university]/[scheme]/[branch]/[tool].astro`, `src/components/Calculator.astro`

## Testing added
- **Playwright e2e** (`tests/e2e/calculator.spec.ts`, `playwright.config.ts`): 17 tests covering VTU SGPA (grade chips, marks mode, save/clear, scheme/semester selectors, lateral entry, print), CGPA, percentage, all non-VTU university pages (manual mode), mobile (375px) viewport, and the universities picker. Run in CI via `.github/workflows/ci.yml`.
- **Unit tests** (`tests/calculations.test.ts`, `vitest.config.mjs`): 34 tests for grade tables (VTU 2025 O/A+/A/B+/B/C/P/F and 2018 S/A/B/C/D/E/F), marks-to-GP bands, SGPA/CGPA aggregation, lateral entry, percentage conversion.
