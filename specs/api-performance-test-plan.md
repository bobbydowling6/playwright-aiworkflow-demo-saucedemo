# API and Performance Test Plan for SauceDemo

## Overview
This test plan covers API and performance testing for the SauceDemo e-commerce application. Since SauceDemo is a demo site without exposed REST APIs, API tests will focus on HTTP interactions (form submissions, redirects) using Playwright's APIRequestContext. Performance tests will measure page load times, response times, and basic load simulation.

## API Tests

### Manual API Test Scenarios

#### Scenario 1: Login API Validation
- **Objective:** Verify login endpoint accepts valid credentials and rejects invalid ones.
- **Preconditions:** None
- **Steps:**
  1. Send POST request to `/` with valid credentials (username: standard_user, password: secret_sauce)
  2. Verify response redirects to `/inventory.html`
  3. Send POST request with invalid credentials
  4. Verify response shows error message
- **Expected Results:** Valid login succeeds, invalid login fails with error.

#### Scenario 2: Checkout API Flow
- **Objective:** Test checkout form submissions via HTTP.
- **Preconditions:** User logged in via API
- **Steps:**
  1. Add item to cart via POST to `/inventory.html`
  2. Submit checkout form with valid data
  3. Verify redirect to checkout overview
  4. Complete order
  5. Verify redirect to confirmation page
- **Expected Results:** Successful checkout flow with proper redirects.

### Automated API Test Scenarios
- Same as manual, but scripted using Playwright APIRequestContext.

## Performance Tests

### Manual Performance Test Scenarios

#### Scenario 1: Page Load Performance
- **Objective:** Measure time to load key pages.
- **Steps:**
  1. Load login page
  2. Measure time to fully load
  3. Login and load inventory page
  4. Measure load time
  5. Load cart and checkout pages
  6. Record load times
- **Expected Results:** All pages load within 3 seconds.

#### Scenario 2: Checkout Flow Performance
- **Objective:** Measure end-to-end checkout performance.
- **Steps:**
  1. Time complete checkout process from login to confirmation
  2. Record total time and individual step times
- **Expected Results:** Complete flow under 10 seconds.

### Automated Performance Test Scenarios
- Use Playwright to measure timings programmatically.
- For load testing, simulate multiple users using k6.

## Test Data
- Valid credentials: standard_user / secret_sauce
- Invalid credentials: wrong_user / wrong_pass
- Checkout data: Test User, 12345

## Tools
- Manual: Browser dev tools, Postman for API inspection
- Automated: Playwright for API and performance, k6 for load testing

## Success Criteria
- All API calls return expected status codes and responses
- Page load times < 3s, checkout flow < 10s
- No performance regressions