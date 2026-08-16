const { test, expect } = require('@playwright/test');

const { TaskBotPage } = require('../pages/TaskBotPage');

test.describe('Use Case 1 - Message Box Task', () => {

    test('Create Task Bot and automate Message Box', async ({ page }) => {

        test.setTimeout(120000);

        const taskBotPage = new TaskBotPage(page);

        console.log('\n========== USE CASE 1 ==========');

        // =====================================================
        // 1. OPEN AUTOMATION BOTS PAGE
        // =====================================================

        await page.goto(
            'https://community.cloud.automationanywhere.digital/#/bots/repository/private/folders/33100073',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        console.log('CURRENT URL:', page.url());

        // =====================================================
        // 2. VERIFY AUTHENTICATION
        // =====================================================

        if (page.url().includes('/login')) {
            throw new Error(
                'Authentication session expired. Refresh playwright/.auth/user.json.'
            );
        }

        console.log('AUTOMATION PAGE READY');

        // =====================================================
        // 3. OPEN CREATE MENU
        // =====================================================

        // Use the accessible name of the Create button.
        // This is more reliable than button[name="createOptions"].
        const createButton = page
            .getByRole('button', {
                name: 'Create',
                exact: true
            })
            .first();

        await expect(createButton).toBeVisible({
            timeout: 30000
        });

        console.log('CREATE BUTTON FOUND');

        await createButton.click();

        console.log('CREATE MENU OPENED');

        // =====================================================
        // 4. SELECT TASK BOT
        // =====================================================

        const taskBotOption = page
            .getByText('Task Bot…', {
                exact: true
            })
            .first();

        await expect(taskBotOption).toBeVisible({
            timeout: 15000
        });

        console.log('TASK BOT OPTION FOUND');

        await taskBotOption.click();

        console.log('TASK BOT FORM OPENED');

        // =====================================================
        // 5. CREATE TASK BOT
        // =====================================================

        const botName =
            `PW_MessageBox_Final_${Date.now()}`;

        await expect(
            taskBotPage.botNameInput
        ).toBeVisible({
            timeout: 20000
        });

        await taskBotPage.botNameInput.fill(botName);

        await taskBotPage.descriptionInput.fill(
            'Playwright automated Message Box validation'
        );

        console.log('BOT NAME:', botName);

        await expect(
            taskBotPage.createAndEditButton
        ).toBeVisible({
            timeout: 15000
        });

        await expect(
            taskBotPage.createAndEditButton
        ).toBeEnabled({
            timeout: 15000
        });

        console.log('CLICKING CREATE & EDIT...');

        await taskBotPage.createAndEditButton.click();

        // =====================================================
        // 6. WAIT FOR TASK BOT EDITOR
        // =====================================================

        console.log('WAITING FOR TASK BOT EDITOR...');

        await expect(
            page.getByRole('button', {
                name: 'Save',
                exact: true
            })
        ).toBeVisible({
            timeout: 30000
        });

        console.log('TASK BOT EDITOR FOUND');

        console.log(
            'EDITOR URL:',
            page.url()
        );

        // =====================================================
        // 7. VERIFY FLOW CANVAS
        // =====================================================

        await expect(
            page.getByText(
                'Drag an action here or',
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 30000
        });

        console.log('FLOW CANVAS READY');

        // =====================================================
        // 8. FIND QUICK ADD
        // =====================================================

        const quickAdds = page.locator(
            '[data-path="TaskbotNodeQuickAdd"]:visible'
        );

        await expect(
            quickAdds.first()
        ).toBeVisible({
            timeout: 30000
        });

        const quickAddCount =
            await quickAdds.count();

        console.log(
            'QUICK ADD COUNT:',
            quickAddCount
        );

        expect(
            quickAddCount
        ).toBeGreaterThanOrEqual(2);

        // =====================================================
        // 9. OPEN ACTION QUICK ADD
        // =====================================================

        console.log(
            'CLICKING ACTION QUICK ADD...'
        );

        await quickAdds
            .nth(1)
            .click();

        console.log(
            'ACTION QUICK ADD OPENED'
        );

        // =====================================================
        // 10. FIND ACTION SEARCH
        // =====================================================

        const searchInput = page.locator(
            'input[placeholder*="action" i], ' +
            'input[placeholder*="package" i], ' +
            'input[placeholder*="find" i]'
        ).filter({
            visible: true
        }).first();

        await expect(
            searchInput
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'ACTION SEARCH FOUND'
        );

        // =====================================================
        // 11. SEARCH FOR MESSAGE BOX
        // =====================================================

        await searchInput.fill('message');

        console.log(
            'SEARCHED FOR MESSAGE'
        );

        // =====================================================
        // 12. SELECT MESSAGE BOX
        // =====================================================

        const messageBox = page
            .getByText(
                'Message box',
                {
                    exact: true
                }
            )
            .last();

        await expect(
            messageBox
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'MESSAGE BOX ACTION FOUND'
        );

        await messageBox.click();

        console.log(
            'MESSAGE BOX ACTION ADDED'
        );

        // =====================================================
        // 13. VERIFY MESSAGE BOX CONFIGURATION
        // =====================================================

        await expect(
            page.getByText(
                'Enter the message box window title',
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 15000
        });

        await expect(
            page.getByText(
                'Enter the message to display',
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'MESSAGE BOX CONFIGURATION PANEL FOUND'
        );

        // =====================================================
        // 14. FIND MESSAGE BOX FIELDS
        // =====================================================

        const titleField = page.locator(
            '[contenteditable="true"][name="title"]:visible'
        ).first();

        const messageField = page.locator(
            '[contenteditable="true"][name="content"]:visible'
        ).first();

        await expect(
            titleField
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'WINDOW TITLE FIELD FOUND'
        );

        await expect(
            messageField
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'MESSAGE FIELD FOUND'
        );

        // =====================================================
        // 15. CONFIGURE MESSAGE BOX
        // =====================================================

        const windowTitle =
            'Playwright Message Box';

        const message =
            'Hello from Playwright automation';

        await titleField.fill(
            windowTitle
        );

        console.log(
            'WINDOW TITLE FILLED'
        );

        await messageField.fill(
            message
        );

        console.log(
            'MESSAGE FILLED'
        );

        // =====================================================
        // 16. VERIFY MESSAGE BOX VALUES
        // =====================================================

        await expect(
            titleField
        ).toHaveText(
            windowTitle
        );

        await expect(
            messageField
        ).toHaveText(
            message
        );

        console.log(
            'MESSAGE BOX VALUES VERIFIED'
        );

        // =====================================================
        // 17. VERIFY MESSAGE BOX ACTION
        // =====================================================

        const messageBoxInFlow =
            page.getByText(
                'Message box',
                {
                    exact: true
                }
            );

        expect(
            await messageBoxInFlow.count()
        ).toBeGreaterThan(0);

        console.log(
            'MESSAGE BOX ACTION VERIFIED'
        );

        // =====================================================
        // 18. SAVE
        // =====================================================

        const saveButton =
            page.getByRole(
                'button',
                {
                    name: 'Save',
                    exact: true
                }
            ).first();

        await expect(
            saveButton
        ).toBeVisible({
            timeout: 15000
        });

        await expect(
            saveButton
        ).toBeEnabled({
            timeout: 15000
        });

        console.log(
            'SAVE BUTTON VERIFIED'
        );

        await saveButton.click();

        console.log(
            'SAVE CLICKED'
        );

        // =====================================================
        // 19. VERIFY AFTER SAVE
        // =====================================================

        await expect(
            page
        ).toHaveURL(
            /\/task\//,
            {
                timeout: 30000
            }
        );

        console.log(
            'CURRENT URL AFTER SAVE:',
            page.url()
        );

        const savedMessageBox =
            page.getByText(
                'Message box',
                {
                    exact: true
                }
            );

        await expect(
            savedMessageBox.first()
        ).toBeVisible({
            timeout: 30000
        });

        console.log(
            'SAVED MESSAGE BOX VERIFIED'
        );

        // =====================================================
        // 20. FINAL VERIFICATION
        // =====================================================

        expect(
            page.url()
        ).toContain('/task/');

        console.log('\n========================================');
        console.log('USE CASE 1 COMPLETE');
        console.log('Task Bot:', botName);
        console.log('Window Title:', windowTitle);
        console.log('Message:', message);
        console.log('STATUS: PASS');
        console.log('========================================');
    });
});