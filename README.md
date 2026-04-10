# playwright-aiworkflow-demo-saucedemo
This is a automation project using Playwright as the main framework, with using AI agents on e-commerce website saucedemo.com

## Test Suites

### UI Tests
- **Checkout Flow:** End-to-end checkout process validation
- Location: `tests/sauce-demo-checkout/checkout.spec.ts`

### API Tests
- **HTTP Interactions:** Login and form submission testing
- Location: `tests/api/api.spec.ts`

### Performance Tests
- **Load Times:** Page load performance measurements
- Location: `tests/performance/performance.spec.ts`

### Load Tests
- **Stress Testing:** Basic load simulation script
- Location: `tests/load/load-test.js`

## Running Tests

```bash
# UI Tests
npx playwright test tests/sauce-demo-checkout/

# API Tests
npx playwright test tests/api/

# Performance Tests
npx playwright test tests/performance/

# Load Tests (requires k6)
k6 run tests/load/load-test.js
```

## Reports
- Test results: `test-results/`
- Test plans: `specs/`
