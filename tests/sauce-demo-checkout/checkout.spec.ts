import { test, expect, Page } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com';
const credentials = { username: 'standard_user', password: 'secret_sauce' };
const validCheckout = { firstName: 'Test', lastName: 'User', postalCode: '12345' };

async function login(page: Page) {
  await page.goto(baseURL);
  await page.fill('#user-name', credentials.username);
  await page.fill('#password', credentials.password);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
}

async function addFirstItemToCart(page: Page) {
  const firstItem = page.locator('.inventory_item').first();
  await firstItem.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
}

async function navigateToCart(page: Page) {
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.locator('.cart_list')).toBeVisible();
}

test.describe('SauceDemo Checkout Workflow', () => {
  test('Cart review shows item details and checkout navigation', async ({ page }) => {
    await login(page);
    await addFirstItemToCart(page);
    await navigateToCart(page);

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toHaveText(/.+/);
    await expect(page.locator('.inventory_item_desc')).toHaveCount(1);
    await expect(page.locator('.inventory_item_price')).toHaveText(/\$\d+/);
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  });

  test('Checkout information page validates required fields', async ({ page }) => {
    await login(page);
    await addFirstItemToCart(page);
    await navigateToCart(page);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.getByRole('button', { name: 'Continue' }).click();
    const errorMessage = page.locator('h3[data-test="error"]');
    await expect(errorMessage.first()).toBeVisible();
    await expect(errorMessage.first()).toContainText('Error');
  });

  test('Checkout page blocks invalid or incomplete user information', async ({ page }) => {
    await login(page);
    await addFirstItemToCart(page);
    await navigateToCart(page);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.fill('#first-name', '@@!!');
    await page.fill('#last-name', '');
    await page.fill('#postal-code', '12');
    await page.getByRole('button', { name: 'Continue' }).click();

    const errorMessage = page.locator('h3[data-test="error"]');
    await expect(errorMessage.first()).toBeVisible();
    await expect(errorMessage.first()).toContainText('Error');
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test('Order overview displays summary, totals, and cancel returns to cart', async ({ page }) => {
    await login(page);
    await addFirstItemToCart(page);
    await navigateToCart(page);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.fill('#first-name', validCheckout.firstName);
    await page.fill('#last-name', validCheckout.lastName);
    await page.fill('#postal-code', validCheckout.postalCode);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.cart_list')).toBeVisible();
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.getByText('Payment Information:')).toBeVisible();
    await expect(page.getByText('Shipping Information:')).toBeVisible();
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total');
    await expect(page.locator('.summary_tax_label')).toContainText('Tax');
    await expect(page.locator('.summary_total_label')).toContainText('Total');
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Order completion shows confirmation and Back Home returns to products', async ({ page }) => {
    await login(page);
    await addFirstItemToCart(page);
    await navigateToCart(page);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.fill('#first-name', validCheckout.firstName);
    await page.fill('#last-name', validCheckout.lastName);
    await page.fill('#postal-code', validCheckout.postalCode);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();

    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
