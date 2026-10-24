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

// Theme screenshots and contrast checks
const viewports = [
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
];

for (const vp of viewports) {
  test(`screenshot light ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('cgpa-theme', 'light');
    });
    await page.reload();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `test-results/home-light-${vp.name}.png`, fullPage: true });
  });

  test(`screenshot dark ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('cgpa-theme', 'dark');
    });
    await page.reload();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `test-results/home-dark-${vp.name}.png`, fullPage: true });
  });
}

test('contrast check on key elements', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(() => {
    function getContrast(fg: string, bg: string) {
      function toRgb(c: string) {
        const el = document.createElement('div');
        el.style.color = c;
        document.body.appendChild(el);
        const rgb = getComputedStyle(el).color;
        document.body.removeChild(el);
        const m = rgb.match(/\d+/g);
        if (!m) return [0,0,0];
        return m.slice(0,3).map(x=>parseInt(x));
      }
      function lum([r,g,b]: number[]) {
        const a = [r,g,b].map(v=>{
          v = v/255;
          return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
        });
        return a[0]*0.2126 + a[1]*0.7152 + a[2]*0.0722;
      }
      const L1 = lum(toRgb(fg));
      const L2 = lum(toRgb(bg));
      const bright = Math.max(L1,L2), dark = Math.min(L1,L2);
      return (bright+0.05)/(dark+0.05);
    }
    const body = getComputedStyle(document.body);
    const h1 = document.querySelector('h1');
    const link = document.querySelector('a');
    let c1 = 0, c2 = 0;
    if (h1) c1 = getContrast(getComputedStyle(h1).color, body.backgroundColor);
    if (link) c2 = getContrast(getComputedStyle(link).color, body.backgroundColor);
    return { h1Contrast: c1, linkContrast: c2 };
  });
  expect(result.h1Contrast).toBeGreaterThan(4.5);
});
