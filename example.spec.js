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

  // Add item to basket
  const addToBasketButton = await page.$('button[data-testid="add-to-basket-button"]');
  expect(addToBasketButton).not.toBeNull();
  await addToBasketButton.click();

  // Wait for the basket confirmation
  await page.waitForSelector('[data-testid="basket-confirmation"]', { timeout: 15000 });
  const basketConfirmation = await page.$('[data-testid="basket-confirmation"]');
  expect(basketConfirmation).not.toBeNull();  

  // click on basket icon
  const basketIcon = await page.$('[data-testid="basket-icon"]');
  expect(basketIcon).not.toBeNull();
  await basketIcon.click(); 

  // Wait for the basket page to load
  await page.waitForSelector('[data-testid="basket-page"]', { timeout: 15000 });
  const basketPage = await page.$('[data-testid="basket-page"]');
  expect(basketPage).not.toBeNull();  

  // Verify the product is in the basket
  const basketProductTitle = await page.$eval('[data-testid="basket-product-title"]', el => el.textContent.trim());
  expect(basketProductTitle).toBe(productTitle);  

  // enter town to check for free delivery
  const deliveryTownInput = await page.$('input[data-testid="delivery-town-input"]');
  expect(deliveryTownInput).not.toBeNull();
  await deliveryTownInput.fill('Carrickfergus');
  await page.keyboard.press('Enter');

  
});