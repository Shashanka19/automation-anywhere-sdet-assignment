const { test, expect } = require('@playwright/test');

const { AutomationPage } = require('../pages/AutomationPage');
const { TaskBotPage } = require('../pages/TaskBotPage');

test.describe('Use Case 1 - Message Box Task', () => {

    test('Verify Task Bot editor navigation', async ({ page, context }) => {

        // Allow enough time for Automation Anywhere's slow SPA operations
        test.setTimeout(120000);

        const automationPage = new AutomationPage(page);
        const taskBotPage = new TaskBotPage(page);

        // Open Automation Anywhere Bots page directly
        await page.goto(
            'https://community.cloud.automationanywhere.digital/#/bots/repository/private/folders/33100073',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        // Wait for the actual Create button
        await expect(
            automationPage.createButton
        ).toBeVisible({
            timeout: 30000
        });

        // Open Create menu
        await automationPage.openCreateMenu();

        // Select Task Bot
        await automationPage.selectTaskBot();

        // Verify Task Bot form
        await expect(
            taskBotPage.botNameInput
        ).toBeVisible({
            timeout: 20000
        });

        await expect(
            taskBotPage.descriptionInput
        ).toBeVisible({
            timeout: 20000
        });

        // Fill Task Bot details
        await taskBotPage.botNameInput.fill(
            'PW_Final_MessageBox_TestBot'
        );

        await taskBotPage.descriptionInput.fill(
            'Final Playwright Message Box validation'
        );

        // Verify entered data
        await expect(
            taskBotPage.botNameInput
        ).toHaveValue(
            'PW_Final_MessageBox_TestBot'
        );

        await expect(
            taskBotPage.descriptionInput
        ).toHaveValue(
            'Final Playwright Message Box validation'
        );

        console.log('\nBEFORE CREATE & EDIT URL:');
        console.log(page.url());

        console.log('\nPAGES BEFORE CREATE & EDIT:');
        console.log(
            context.pages().map(p => p.url())
        );

        // Create & Edit
        await taskBotPage.createAndEditButton.click();

        // Give the application a short chance to update
        await page.waitForTimeout(3000);

        console.log('\nAFTER CREATE & EDIT URL:');
        console.log(page.url());

        console.log('\nALL OPEN PAGES:');
        console.log(
            context.pages().map(p => p.url())
        );

        console.log('\nPAGE TITLE:');
        console.log(await page.title());

        console.log('\nVISIBLE BUTTONS:');
        console.log(
            await page.locator('button:visible').allTextContents()
        );

        console.log('\nVISIBLE LINKS:');
        console.log(
            await page.locator('a:visible').allTextContents()
        );

        console.log('\nPAGE TEXT:');
        console.log(
            (await page.locator('body').innerText())
                .split('\n')
                .map(text => text.trim())
                .filter(Boolean)
                .slice(0, 200)
        );

        // Confirm the Create Task Bot dialog is gone
        await expect(
            taskBotPage.createAndEditButton
        ).not.toBeVisible({
            timeout: 20000
        });

        console.log('\nCREATE TASK BOT DIALOG CLOSED SUCCESSFULLY.');
    });
});