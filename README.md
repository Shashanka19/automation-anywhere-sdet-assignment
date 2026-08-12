# Automation Anywhere SDET Assignment

UI automation test suite for Automation Anywhere Community Edition using Playwright, JavaScript, and the Page Object Model (POM) design pattern.

## Framework & Tools

- **Automation Framework:** Playwright
- **Programming Language:** JavaScript
- **Runtime:** Node.js
- **Design Pattern:** Page Object Model (POM)
- **Browser:** Chromium
- **Test Reporting:** Playwright HTML Reporter
- **Version Control:** Git / GitHub

---

## Project Structure

```text
automation-anywhere-sdet-assignment/
│
├── pages/
│   ├── AutomationPage.js
│   ├── FormPage.js
│   └── TaskBotPage.js
│
├── tests/
│   ├── usecase1-message-box.spec.js
│   └── usecase2-rules-builder.spec.js
│
├── playwright/
│   └── .auth/
│       └── user.json          # Local authentication state
│
├── playwright.config.js
├── package.json
└── README.md