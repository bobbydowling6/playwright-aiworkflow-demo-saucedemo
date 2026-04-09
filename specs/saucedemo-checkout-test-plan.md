# SauceDemo Checkout Test Plan

## User Story
As a customer, I want to complete my purchase through a checkout process so that I can order products online.

## Application URL
https://www.saucedemo.com

## Test Credentials
- Username: `standard_user`
- Password: `secret_sauce`

## Test Scope
Validate the complete checkout workflow including cart review, checkout information, order overview, order completion, and error handling.

## Acceptance Criteria Covered
- AC1: Cart Review
- AC2: Checkout Information Entry
- AC3: Order Overview
- AC4: Order Completion
- AC5: Error Handling
- Business rules: mandatory checkout fields, login required, non-empty cart, cancel navigation, order confirmation behavior.

## Test Scenarios

### Scenario 1: Cart Review and Checkout Navigation
- Preconditions: User is logged in and at least one product has been added to the cart.
- Steps:
  1. Login with valid credentials.
  2. Add the first available product to the cart.
  3. Navigate to the cart page.
- Expected Results:
  - Cart page displays the selected item with name, description, price, and quantity.
  - Cart page displays both `Continue Shopping` and `Checkout` options.
  - The shopping cart badge updates to `1`.

### Scenario 2: Checkout Information Required Field Validation
- Preconditions: User has items in cart and is on the checkout information page.
- Steps:
  1. Click `Checkout` from the cart page.
  2. Click `Continue` without entering any information.
- Expected Results:
  - An error message is shown indicating the first missing required field.
  - The user cannot proceed to the checkout overview page.

### Scenario 3: Checkout Invalid Data Handling
- Preconditions: User is on the checkout information page.
- Steps:
  1. Enter invalid or incomplete checkout information.
     - First Name: `@@!!`
     - Last Name: `` (empty)
     - Zip/Postal Code: `12`
  2. Click `Continue`.
- Expected Results:
  - The user receives appropriate validation feedback.
  - The user remains on the checkout information page until valid data is entered.

### Scenario 4: Order Overview and Cancel Flow
- Preconditions: User has entered valid checkout information.
- Steps:
  1. Complete checkout information and click `Continue`.
  2. Review the order overview page.
  3. Click `Cancel`.
- Expected Results:
  - Order overview page displays the order summary, payment info, shipping info, subtotal, tax, and total.
  - Clicking `Cancel` returns the user to the cart page.

### Scenario 5: Complete Order and Back Home Navigation
- Preconditions: User is on the checkout overview page.
- Steps:
  1. Click `Finish`.
  2. Verify the order confirmation page.
  3. Click `Back Home`.
- Expected Results:
  - The order confirmation page shows a success message.
  - `Back Home` returns the user to the products page.

## Test Data Requirements
- Standard user credentials
- Valid first name, last name, and postal code
- One product added to cart

## Notes
- The test plan focuses on Chrome, Firefox, and Safari using Playwright.
- Mobile responsiveness is noted but handled by browser coverage in Playwright.
- Where validation behavior differs from acceptance criteria, defects will be captured in the test report.
