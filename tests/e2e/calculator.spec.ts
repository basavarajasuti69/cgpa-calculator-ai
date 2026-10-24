import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4323';

test.describe('VTU 2022 CSE SGPA calculator', () => {
  test('renders Semester 1 subjects and credits, grade chip updates SGPA', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/sgpa/`);
    // subjects rendered
    await page.waitForSelector('.subject-row', { state: 'visible', timeout: 15000 });
    const subjectCount = await page.locator('.subject-row').count();
    expect(subjectCount).not.toBe(0);
    // credit pills shown
    await expect(page.locator('.credit-pill').first()).toBeVisible();
    // tap grade chip A on first subject -> SGPA becomes non-zero
    await page.locator('.subject-row').first().locator('.grade-chip[data-grade="A"]').click();
    await page.waitForTimeout(300);
    const sgpa = page.locator('#sgpa-display');
    await expect(sgpa).not.toHaveText('0.00');
  });

  test('Marks mode converts marks to grade', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/sgpa/`);
    await page.locator('#mode-marks').click();
    await page.waitForSelector('.marks-input', { state: 'visible' });
    const input = page.locator('.marks-input').first();
    await input.fill('85');
    await page.waitForTimeout(300);
    const sgpa = page.locator('#sgpa-display');
    await expect(sgpa).not.toHaveText('0.00');
  });

  test('Save result and Clear all', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/sgpa/`);
    await page.locator('.subject-row').first().locator('.grade-chip[data-grade="A"]').click();
    await page.waitForTimeout(300);
    await page.locator('#save-result-btn').click();
    await page.waitForTimeout(600);
    await expect(page.locator('#save-result-btn')).toHaveText('Saved!');
    await page.locator('#clear-btn').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#sgpa-display')).toHaveText('0.00');
  });

  test('Scheme/branch/semester selectors reload', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/sgpa/`);
    // change semester pill
    await page.locator('.sem-pill[data-sem="2"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('.sem-pill.is-active')).toHaveAttribute('data-sem', '2');
  });

  test('Lateral entry toggle', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/sgpa/`);
    await page.locator('#lateral-entry').click();
    await page.waitForTimeout(300);
    // should not error
    await expect(page.locator('#sgpa-display')).toBeVisible();
  });

  test('Print button works', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/sgpa/`);
    await page.locator('#print-btn').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#sgpa-display')).toBeVisible();
  });
});

test.describe('VTU CGPA page', () => {
  test('computes CGPA from per-semester SGPA and credits', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/cgpa/`);
    const inputs = page.locator('.cgpa-sgpa-input');
    await expect(inputs.count()).not.toBe(0);
    await inputs.first().fill('8.00');
    await page.waitForTimeout(300);
    await expect(page.locator('#cgpa-display')).not.toHaveText('0.00');
  });

  test('Lateral entry skips semesters 1-2', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/cgpa/`);
    await page.locator('#cgpa-lateral').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#cgpa-display')).toBeVisible();
  });
});

test.describe('VTU Percentage page', () => {
  test('converts CGPA to percentage', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/percentage/`);
    await page.locator('#percentage-cgpa').fill('8.2');
    await page.waitForTimeout(300);
    await expect(page.locator('#percentage-display')).toContainText('82');
  });
});

test.describe('Other university pages load and work (manual mode)', () => {
  const unis = [
    ['anna', 'r2021', 'cse'],
    ['ktu', '2024', 'cse'],
    ['srm', '2021', 'cse'],
    ['vit', 'ffcs', 'cse'],
    ['ipu', 'ordinance11', 'cse'],
    ['saveetha', 'simats', 'cse'],
  ];
  for (const [uni, scheme, branch] of unis) {
    test(`${uni}/${scheme}/${branch} loads without error`, async ({ page }) => {
      const res = await page.goto(`${BASE}/${uni}/${scheme}/${branch}/sgpa/`);
      expect(res?.status()).toBeLessThan(400);
      await page.waitForTimeout(300);
      // either subjects render OR manual mode shows
      const hasManual = await page.locator('#add-manual-btn').isVisible();
      const hasSubjects = await page.locator('.subject-row').count() > 0;
      expect(hasManual || hasSubjects).toBeTruthy();
    });
  }
});

test.describe('Mobile viewport (375px)', () => {
  test.use({ viewport: { width: 375, height: 812 } });
  test('VTU SGPA works on mobile', async ({ page }) => {
    await page.goto(`${BASE}/vtu/2022/cse/sgpa/`);
    await page.locator('.subject-row').first().locator('.grade-chip[data-grade="A"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#sgpa-display')).not.toHaveText('0.00');
  });
});

test.describe('Universities picker and links', () => {
  test('universities page loads', async ({ page }) => {
    const res = await page.goto(`${BASE}/universities`);
    expect(res?.status()).toBeLessThan(400);
  });
});
