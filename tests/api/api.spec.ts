import { test, expect } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com';

test.describe('SauceDemo API Tests', () => {
  test('Login API - valid credentials', async ({ request }) => {
    const response = await request.post(`${baseURL}/`, {
      form: {
        'user-name': 'standard_user',
        'password': 'secret_sauce'
      }
    });

    expect(response.status()).toBe(200);
    expect(response.url()).toContain('/inventory.html');
  });

  test('Login API - invalid credentials', async ({ request }) => {
    const response = await request.post(`${baseURL}/`, {
      form: {
        'user-name': 'invalid_user',
        'password': 'wrong_password'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('Epic sadface');
  });

  test('Checkout API flow', async ({ request }) => {
    // Login first
    const loginResponse = await request.post(`${baseURL}/`, {
      form: {
        'user-name': 'standard_user',
        'password': 'secret_sauce'
      }
    });
    expect(loginResponse.status()).toBe(200);

    // Add item to cart (this might require session handling)
    // Note: SauceDemo uses sessions, so this is simplified
    const cartResponse = await request.post(`${baseURL}/inventory.html`, {
      form: {
        // Add to cart form data
      }
    });

    // Checkout steps would follow similar pattern
    // This is a basic structure - full implementation would need session cookies
  });
});