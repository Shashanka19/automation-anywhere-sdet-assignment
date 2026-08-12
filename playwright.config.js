// @ts-check

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    // Automation Anywhere uses a shared authenticated session.
    // Run tests sequentially to avoid session conflicts.
    fullyParallel: false,
    workers: 1,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    reporter: 'html',

    use: {
        baseURL:
            'https://community.cloud.automationanywhere.digital',

        storageState:
            'playwright/.auth/user.json',

        trace: 'on-first-retry',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});