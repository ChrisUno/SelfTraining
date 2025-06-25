// Example Playwright test
const { test, expect } = require('@playwright/test');

test.use({ headless: false, slowMo: 100 });

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toContain('Playwright');
});

test('testing the currys page', async ({ page }) => {
  await page.goto('https://www.currys.co.uk/');
  // Accept cookies if prompted
  const acceptCookies = await page.$('button#onetrust-accept-btn-handler');
  if (acceptCookies) {
    await acceptCookies.click();
  }

  // Wait for the search bar and perform a search
  await page.waitForSelector('input[data-testid="search-input"]', { timeout: 15000 });
  const searchBar = await page.$('input[data-testid="search-input"]');
  expect(searchBar).not.toBeNull();

  await searchBar.fill('Speaker');
  await page.keyboard.press('Enter');

  // Wait for the results page to load
  await page.waitForSelector('[data-testid="product-tile"]', { timeout: 15000 });
  const results = await page.$$('[data-testid="product-tile"]');
  expect(results.length).toBeGreaterThan(0);

  // Click on the first result
  await results[0].click();

  // Wait for the product title to be visible
  await page.waitForSelector('[data-testid="product-title"]', { timeout: 15000 });
  const productTitle = await page.$eval('[data-testid="product-title"]', el => el.textContent.trim());
  expect(productTitle).toBeTruthy();
});