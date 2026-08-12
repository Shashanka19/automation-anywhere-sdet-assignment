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

        await page.waitForTimeout(3000);

        console.log('CURRENT URL:', page.url());

        // =====================================================
        // 2. VERIFY LOGIN
        // =====================================================

        if (page.url().includes('/login')) {
            throw new Error(
                'Authentication session expired. Refresh playwright/.auth/user.json.'
            );
        }

        // =====================================================
        // 3. OPEN CREATE MENU
        // =====================================================

        const createButton = page
            .locator('button[name="createOptions"]:visible')
            .first();

        await expect(createButton).toBeVisible({
            timeout: 30000
        });

        console.log('CREATE BUTTON FOUND');

        await createButton.click();

        await page.waitForTimeout(500);

        console.log('CREATE MENU OPENED');

        // =====================================================
        // 4. SELECT TASK BOT
        // =====================================================

        const taskBotOption = page
            .locator('button[name="createTaskbot"]:visible')
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
        // 7. WAIT FOR FLOW CANVAS
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

        await page.waitForTimeout(1000);

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

        await page.waitForTimeout(1000);

        console.log(
            'ACTION QUICK ADD OPENED'
        );

        // =====================================================
        // 10. SEARCH MESSAGE BOX
        // =====================================================

        const searchInput =
            page.locator(
                'input[placeholder*="action" i], ' +
                'input[placeholder*="package" i], ' +
                'input[placeholder*="find" i]'
            )
            .filter({
                visible: true
            })
            .first();

        await expect(
            searchInput
        ).toBeVisible({
            timeout: 15000
        });

        await searchInput.fill(
            'message'
        );

        await page.waitForTimeout(1500);

        console.log(
            'SEARCHED FOR MESSAGE'
        );

        // =====================================================
        // 11. SELECT MESSAGE BOX
        // =====================================================

        const messageBox =
            page.getByText(
                'Message box',
                {
                    exact: true
                }
            )
            .filter({
                visible: true
            })
            .first();

        await expect(
            messageBox
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'MESSAGE BOX ACTION FOUND'
        );

        await messageBox.click();

        await page.waitForTimeout(2000);

        console.log(
            'MESSAGE BOX ACTION ADDED'
        );

        // =====================================================
        // 12. VERIFY CONFIGURATION PANEL
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
        // 13. LOCATE CONTENTEDITABLE FIELDS DIRECTLY
        // =====================================================

        const titleField =
            page.locator(
                '[contenteditable="true"][name="title"]:visible'
            );

        const messageField =
            page.locator(
                '[contenteditable="true"][name="content"]:visible'
            );

        await expect(
            titleField
        ).toBeVisible({
            timeout: 15000
        });

        await expect(
            messageField
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'WINDOW TITLE FIELD FOUND'
        );

        console.log(
            'MESSAGE FIELD FOUND'
        );

        // =====================================================
        // 14. FILL WINDOW TITLE
        // =====================================================

        await titleField.fill(
            'Playwright Message Box'
        );

        console.log(
            'WINDOW TITLE FILLED'
        );

        // =====================================================
        // 15. FILL MESSAGE
        // =====================================================

        await messageField.fill(
            'Hello from Playwright automation'
        );

        console.log(
            'MESSAGE FILLED'
        );

        // =====================================================
        // 16. VERIFY CONTENTEDITABLE VALUES
        // =====================================================

        await expect(
            titleField
        ).toHaveText(
            'Playwright Message Box'
        );

        await expect(
            messageField
        ).toHaveText(
            'Hello from Playwright automation'
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
            )
            .filter({
                visible: true
            });

        expect(
            await messageBoxInFlow.count()
        ).toBeGreaterThan(0);

        console.log(
            'MESSAGE BOX ACTION VERIFIED'
        );

        // =====================================================
        // 18. SAVE TASK BOT
        // =====================================================

        const saveButton =
            page.getByRole(
                'button',
                {
                    name: 'Save',
                    exact: true
                }
            );

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
        // 19. WAIT FOR SAVE
        // =====================================================

        await page.waitForTimeout(3000);

        console.log(
            'CURRENT URL AFTER SAVE:',
            page.url()
        );

        // =====================================================
        // 20. VERIFY MESSAGE BOX AFTER SAVE
        // =====================================================

        const savedMessageBox =
            page.getByText(
                'Message box',
                {
                    exact: true
                }
            )
            .filter({
                visible: true
            });

        await expect(
            savedMessageBox.first()
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'SAVED MESSAGE BOX VERIFIED'
        );

        // =====================================================
        // 21. FINAL ASSERTIONS
        // =====================================================

        expect(
            page.url()
        ).toContain('/task/');

        console.log(
            '\n========================================'
        );

        console.log(
            'USE CASE 1 COMPLETE'
        );

        console.log(
            'Task Bot:',
            botName
        );

        console.log(
            'Window Title:',
            'Playwright Message Box'
        );

        console.log(
            'Message:',
            'Hello from Playwright automation'
        );

        console.log(
            'STATUS: PASS'
        );

        console.log(
            '========================================'
        );
    });

});