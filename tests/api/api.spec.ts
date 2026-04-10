import { test, expect } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com';

test.describe('SauceDemo Login Tests', () => {
  test('Login UI - valid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory\.html$/);
  });

  test('Login UI - invalid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    await expect(page.locator('.error-message-container')).toContainText('Epic sadface');
  });

  test('Basic Checkout UI flow', async ({ page }) => {
    // Login
    await page.goto(baseURL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory\.html$/);

    // Add item to cart
    await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Go to cart
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart\.html$/);

    // Checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);

    // Fill checkout info
    await page.fill('#first-name', 'Test');
    await page.fill('#last-name', 'User');
    await page.fill('#postal-code', '12345');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);

    // Finish
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
  });
});