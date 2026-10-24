import { test, expect } from '@playwright/test';

test('debug VTU page - check console and JS execution', async ({ page }) => {
  const errors: any[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
    console.log('CONSOLE [' + msg.type() + ']:', msg.text());
  });
  page.on('pageerror', (err) => {
    console.log('PAGE ERROR:', err.message);
    errors.push(err.message);
  });

  await page.goto('http://localhost:4323/vtu/2022/cse/sgpa/');
  await page.waitForTimeout(2000);

  const tbody = page.locator('#subjects-tbody');
  const html = await tbody.innerHTML();
  console.log('TBODY HTML:', html.substring(0, 500));
  console.log('SUBJECT ROWS:', await page.locator('.subject-row').count());

  // Check if inline script exists
  const scripts = page.locator('script');
  console.log('SCRIPT COUNT:', await scripts.count());
  for (let i = 0; i < (await scripts.count()); i++) {
    const content = await scripts.nth(i).innerHTML();
    if (content.includes('renderSubjects')) {
      console.log('SCRIPT ' + i + ' HAS renderSubjects, length:', content.length);
    }
  }

  console.log('ERRORS:', errors);
  expect(true).toBeTruthy();
});
