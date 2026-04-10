import { test, expect } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com';

test.describe('SauceDemo Performance Tests', () => {
  test('Login page load performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`Login page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000); // 3 seconds
  });

  test('Inventory page load after login', async ({ page }) => {
    await page.goto(baseURL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`Inventory page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000);
  });

  test('Complete checkout flow performance', async ({ page }) => {
    const flowStart = Date.now();

    await page.goto(baseURL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForLoadState('networkidle');

    // Add item
    await page.click('.btn_inventory');
    await page.click('.shopping_cart_link');
    await page.waitForLoadState('networkidle');

    // Checkout
    await page.click('#checkout');
    await page.fill('#first-name', 'Test');
    await page.fill('#last-name', 'User');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await page.waitForLoadState('networkidle');

    await page.click('#finish');
    await page.waitForLoadState('networkidle');

    const totalTime = Date.now() - flowStart;
    console.log(`Complete checkout flow time: ${totalTime}ms`);
    expect(totalTime).toBeLessThan(10000); // 10 seconds
  });
});