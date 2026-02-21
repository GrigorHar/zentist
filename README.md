# Zentist - QA Automation

Playwright-based QA automation test suite for [The Internet](https://the-internet.herokuapp.com).

## Prerequisites

- Node.js 18 or higher
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### Run tests with UI

```bash
npm run test:ui
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Run tests against a different environment

Set the `BASE_URL` environment variable to run tests against any other URL:

```bash
# Windows (PowerShell)
$env:BASE_URL="https://staging.example.com"; npm test

# Windows (CMD)
set BASE_URL=https://staging.example.com && npm test

# Linux / macOS
BASE_URL=https://staging.example.com npm test
```

### Run specific test file

```bash
npx playwright test tests/main-page.spec.ts
npx playwright test tests/login-invalid-credentials.spec.ts
npx playwright test tests/login-valid.spec.ts
```

### Run specific project (browser)

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Project Structure

```
zentist/
├── config/
│   └── credentials.ts
├── pages/           # Page Object Model - page logic
│   ├── MainPage.ts
│   ├── LoginPage.ts
│   └── SecurePage.ts
├── tests/           # Test specifications
│   ├── main-page.spec.ts
│   ├── login-invalid-credentials.spec.ts
│   └── login-valid.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Test Scenarios

### Scenario 1 - Main Page
- Open Main Page
- Assert page has title
- Assert page has 'Fork me on Github' element
- Assert page content contains 44 links

### Scenario 2 - Login Page (Invalid Credentials)
- Navigate from Main Page to Login Page via 'Form Authentication' link
- 14 test cases covering: empty credentials, wrong username/password, case sensitivity, SQL injection, special characters, whitespace, and similar-but-wrong passwords

### Scenario 3 - Login to the site
- Login with valid credentials (tomsmith / SuperSecretPassword!)
- Assert user is on /secure page
- Assert page has title and content
- Assert page has "Logout" button
- Logout and assert user is logged out

## Credentials

Credentials are loaded from environment variables. Create a `.env` file (not committed) with:

| Variable      | Description           | Default                  |
|---------------|-----------------------|--------------------------|
| BASE_URL      | Application base URL   | https://the-internet.herokuapp.com |
| LOGIN_USERNAME| Login username        | tomsmith                 |
| LOGIN_PASSWORD| Login password        | SuperSecretPassword!     |

Tests use defaults when variables are unset, so `.env` is optional for the demo site.

### GitHub Actions

Add variables in **Settings → Secrets and variables → Actions**:

| Type   | Name           | Description                    |
|--------|----------------|--------------------------------|
| Secret | LOGIN_USERNAME | Login username (use Secrets)   |
| Secret | LOGIN_PASSWORD | Login password (use Secrets)  |
| Variable | BASE_URL     | Base URL (optional, uses Variables) |

The workflow falls back to demo values when secrets are unset.

## Test Data

| Username | Password             | Result  |
|----------|----------------------|---------|
| tomsmith | SuperSecretPassword! | Valid   |
| (any other) | (any other)       | Invalid |
