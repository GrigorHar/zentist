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

**Required:** Create a `.env` file in the project root with `BASE_URL`, `LOGIN_USERNAME`, and `LOGIN_PASSWORD` before running tests (see [Credentials](#credentials)).

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
- Login with valid credentials (from `.env`)
- Assert user is on /secure page
- Assert page has title and content
- Assert page has "Logout" button
- Logout and assert user is logged out

## Credentials

**You must create a `.env` file** in the project root to run tests. All values are loaded from environment variables only (`.env` is not committed).

| Variable      | Description             | Required |
|---------------|-------------------------|----------|
| BASE_URL      | Application base URL    | No (default: the-internet.herokuapp.com) |
| LOGIN_USERNAME| Login username          | **Yes**  |
| LOGIN_PASSWORD| Login password          | **Yes**  |

Without `.env`, the login test will fail. Set `LOGIN_USERNAME`, `LOGIN_PASSWORD`, and optionally `BASE_URL` in your `.env` file.

### GitHub Actions

Add in **Settings → Secrets and variables → Actions**:

| Type     | Name           |
|----------|----------------|
| Secret   | LOGIN_USERNAME |
| Secret   | LOGIN_PASSWORD |
| Variable | BASE_URL (optional) |

## Test Data

| Valid credentials | Invalid            |
|-------------------|--------------------|
| Set via env vars  | Any other values   |
