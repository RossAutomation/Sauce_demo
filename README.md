# Saucedemo — E2E Test Automation

A robust end-to-end (E2E) test automation framework built with **Playwright** and **TypeScript** for testing critical user-facing flows on [saucedemo.com](https://www.saucedemo.com).

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Reporting](#reporting)
- [CI/CD Integration](#cicd-integration)
- [Page Object Model](#page-object-model)
- [Environment Variables](#environment-variables)

---

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

---

## Getting Started

**Clone the repository:**

```bash
git clone <your-repository-url>
cd saucedemo2
```

**Install dependencies:**

```bash
npm install
```

**Install Playwright browsers and dependencies:**

```bash
npx playwright install --with-deps
```

---

## Project Structure

```text
├── .github/workflows/              # CI/CD pipeline configurations (e.g., GitHub Actions)
├── pages/                          # Page Object Model (POM) classes and locators
│   ├── cart-page.ts
│   ├── checkout-complete-page.ts
│   ├── checkout-info-page.ts
│   ├── checkout-overview-page.ts
│   ├── inventory-page.ts
│   ├── login-page.ts
│   ├── menu.ts
│   └── social-links.ts
├── playwright-report/              # Generated HTML test reports (git-ignored)
├── specs/
│   └── README.md                   # Test plan directory overview
├── tests/
│   ├── seed.spec.ts                # Seed/setup tests that run before the suite
│   ├── login.spec.ts
│   ├── logout.spec.ts
│   ├── product-details-view.spec.ts
│   ├── checkout/
│   │   └── checkout.spec.ts
│   ├── error/
│   │   └── error.spec.ts
│   ├── inventory/
│   │   └── inventory.spec.ts
│   └── menu/
│       └── menu.spec.ts
├── playwright.config.ts            # Global Playwright configuration file
└── package.json                    # Project dependencies and CLI scripts
```

---

## Running Tests

**Run all tests (headless mode):**

```bash
npx playwright test
```

**Run tests in UI mode (interactive — highly recommended during development):**

```bash
npx playwright test --ui
```

**Run a specific test file:**

```bash
npx playwright test tests/login.spec.ts
```

**Run tests in a specific directory:**

```bash
npx playwright test tests/checkout/
```

**Run tests in a specific browser:**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Debug tests with Playwright Inspector:**

```bash
npx playwright test --debug
```

---

## Configuration

Playwright is configured via [`playwright.config.ts`](playwright.config.ts).

| Setting                | Value                           |
| ---------------------- | ------------------------------- |
| **Test directory**     | `./tests`                       |
| **Parallel execution** | Enabled (`fullyParallel: true`) |
| **Retries**            | 2 on CI, 0 locally              |
| **Workers**            | 1 on CI, auto locally           |
| **Reporter**           | HTML                            |
| **Trace**              | Captured on first retry         |
| **Browsers**           | Chromium, Firefox, WebKit       |

**Base URL:** The config has a commented-out `baseURL` property. To avoid repeating the full URL in every `page.goto()` call, uncomment and set it in `playwright.config.ts`:

```ts
use: {
  baseURL: 'https://www.saucedemo.com',
}
```

---

## Reporting

After test execution, view the detailed HTML report locally:

```bash
npx playwright show-report
```

The report is saved to `playwright-report/index.html` and includes step-by-step traces, screenshots on failure, and timeline breakdowns.

---

## CI/CD Integration

This framework is designed to run seamlessly in CI pipelines.

**GitHub Actions:** Add a workflow file at `.github/workflows/playwright.yml`. A minimal example:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

**Docker:** Use the official Playwright Docker image to run tests in isolated containers:

```bash
docker run --rm -v $(pwd):/work/ -w /work/ mcr.microsoft.com/playwright:v1.60.0-noble npx playwright test
```

---

## Page Object Model

This project uses the **Page Object Model (POM)** pattern to keep test logic clean and maintainable. All page classes live in [`pages/`](pages/).

| File                                                           | Responsibility                                         |
| -------------------------------------------------------------- | ------------------------------------------------------ |
| [`login-page.ts`](pages/login-page.ts)                         | Locators and actions for the login page                |
| [`inventory-page.ts`](pages/inventory-page.ts)                 | Locators and actions for the product inventory listing |
| [`cart-page.ts`](pages/cart-page.ts)                           | Locators and actions for the shopping cart             |
| [`checkout-info-page.ts`](pages/checkout-info-page.ts)         | Locators and actions for the checkout information form |
| [`checkout-overview-page.ts`](pages/checkout-overview-page.ts) | Locators and actions for the checkout order summary    |
| [`checkout-complete-page.ts`](pages/checkout-complete-page.ts) | Locators and actions for the order confirmation page   |
| [`menu.ts`](pages/menu.ts)                                     | Locators and actions for the side navigation menu      |
| [`social-links.ts`](pages/social-links.ts)                     | Locators for footer social media link verification     |

When adding tests for a new page, create a corresponding class in `pages/` before writing the spec file.

---

## Environment Variables

The `playwright.config.ts` includes a commented-out block for [dotenv](https://github.com/motdotla/dotenv) support. If the project requires environment-specific credentials or URLs, follow these steps:

1. Create a `.env` file at the project root (never commit this file):

```env
BASE_URL=https://www.saucedemo.com
STANDARD_USER=standard_user
PASSWORD=secret_sauce
```

2. Create a `.env.example` file to document required variables for your team:

```env
BASE_URL=
```

3. Uncomment the dotenv lines in `playwright.config.ts`:

```ts
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
```

4. Add `.env` to `.gitignore`.
