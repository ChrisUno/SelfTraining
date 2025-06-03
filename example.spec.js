// Example Playwright test
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toContain('Playwright');
});
 test('testing the amazon page', async ({ page }) => {
  await page.goto('https://www.amazon.co.uk/');
  const title = await page.title();
  expect(title).toContain('Amazon');

  // Check if the search bar is present
  const searchBar = await page.$('#twotabsearchtextbox');
  expect(searchBar).not.toBeNull();

  // Check if the search button is present
  const searchButton = await page.$('input.nav-input[type="submit"]');
  expect(searchButton).not.toBeNull();
  
  // Perform a search
  await searchBar.fill('Speaker');
  await searchButton.click();

  // Wait for the results page to load
  await page.waitForSelector('.s-main-slot');

  // Check if the results are displayed
  const results = await page.$$('.s-main-slot .s-result-item');
  expect(results.length).toBeGreaterThan(0);

  // Check if the first result contains the word "Speaker"
  const firstResultText = await results[0].innerText();
  expect(firstResultText).toContain('Speaker');

  // Check if the first result has a link
  const firstResultLink = await results[0].$('a.a-link-normal');
  expect(firstResultLink).not.toBeNull();

  // Click on the first result
  await firstResultLink.click();

  // Wait for the product page to load
  await page.waitForSelector('#productTitle');

  // Check if the product title is displayed
  const productTitle = await page.$eval('#productTitle', el => el.textContent.trim());
  expect(productTitle).toBeTruthy();
 });