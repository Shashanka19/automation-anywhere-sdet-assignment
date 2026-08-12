const {
    test,
    expect
} = require('@playwright/test');

const {
    FormPage
} = require('../pages/FormPage');


test.describe(
    'Use Case 2 - Form with Rules Builder',
    () => {

        test(
            'Verify Rules Builder form and Rule1 Rule2 Rule3',
            async ({ page }) => {

                test.setTimeout(120000);

                const formPage = new FormPage(page);

                console.log(
                    '\n========== USE CASE 2 =========='
                );

                // =====================================================
                // 1. OPEN AUTOMATION ANYWHERE
                // =====================================================

                await page.goto(
                    '/#/bots/repository/private/folders/33100073',
                    {
                        waitUntil: 'domcontentloaded',
                        timeout: 60000
                    }
                );

                console.log(
                    'CURRENT URL:',
                    page.url()
                );

                if (
                    page.url().includes('/login')
                ) {
                    throw new Error(
                        'Authentication session expired. Please refresh playwright/.auth/user.json.'
                    );
                }

                await expect(
                    formPage.createButton
                ).toBeVisible({
                    timeout: 30000
                });

                console.log(
                    'AUTOMATION PAGE READY'
                );


                // =====================================================
                // 2. FIND EXISTING FORM
                // =====================================================

                const searchBox =
                    page.locator(
                        'input[placeholder="Search"]'
                    ).first();

                await expect(
                    searchBox
                ).toBeVisible({
                    timeout: 15000
                });

                await searchBox.fill(
                    'PW_RulesBuilder_Final_Test'
                );

                await page.waitForTimeout(2000);

                const formLink =
                    page.getByText(
                        'PW_RulesBuilder_Final_Test',
                        {
                            exact: true
                        }
                    );

                await expect(
                    formLink
                ).toBeVisible({
                    timeout: 20000
                });

                console.log(
                    'FORM FOUND: PW_RulesBuilder_Final_Test'
                );


                // =====================================================
                // 3. OPEN FORM
                // =====================================================

                await formLink.click();

                await page.locator(
                    'iframe.modulepage-frame'
                ).waitFor({
                    state: 'visible',
                    timeout: 60000
                });

                console.log(
                    'FORM EDITOR IFRAME FOUND'
                );

                const frame =
                    formPage.editorFrame;

                await frame
                    .getByText(
                        'Text Box',
                        {
                            exact: true
                        }
                    )
                    .waitFor({
                        state: 'visible',
                        timeout: 30000
                    });

                console.log(
                    'FORM EDITOR LOADED'
                );


                // =====================================================
                // 4. VERIFY TWO TEXTBOXES
                // =====================================================

                const firstName =
                    frame.getByText(
                        'First Name',
                        {
                            exact: true
                        }
                    );

                const lastName =
                    frame.getByText(
                        'Last name',
                        {
                            exact: true
                        }
                    );

                await expect(
                    firstName
                ).toBeVisible({
                    timeout: 15000
                });

                await expect(
                    lastName
                ).toBeVisible({
                    timeout: 15000
                });

                console.log(
                    'FIRST NAME FIELD FOUND'
                );

                console.log(
                    'LAST NAME FIELD FOUND'
                );


                // =====================================================
                // 5. FIND FORM RULES
                // =====================================================

                const rulesTab =
                    frame.getByText(
                        'Form rules',
                        {
                            exact: false
                        }
                    );

                await expect(
                    rulesTab
                ).toBeVisible({
                    timeout: 20000
                });

                console.log(
                    'FORM RULES TAB FOUND'
                );


                // =====================================================
                // 6. OPEN FORM RULES
                // =====================================================

                console.log(
                    'CLICKING FORM RULES TAB...'
                );

                await rulesTab.click();

                await page.waitForTimeout(1500);

                console.log(
                    'FORM RULES TAB OPENED'
                );


                // =====================================================
                // 7. VERIFY RULE1
                // =====================================================

                const rule1 =
                    frame.getByText(
                        'Rule1',
                        {
                            exact: true
                        }
                    );

                await expect(
                    rule1
                ).toBeVisible({
                    timeout: 15000
                });

                console.log(
                    'RULE1 FOUND'
                );


                // =====================================================
                // 8. VERIFY RULE2
                // =====================================================

                const rule2 =
                    frame.getByText(
                        'Rule2',
                        {
                            exact: true
                        }
                    );

                await expect(
                    rule2
                ).toBeVisible({
                    timeout: 15000
                });

                console.log(
                    'RULE2 FOUND'
                );


                // =====================================================
                // 9. VERIFY RULE3
                // =====================================================

                const rule3 =
                    frame.getByText(
                        'Rule3',
                        {
                            exact: true
                        }
                    );

                await expect(
                    rule3
                ).toBeVisible({
                    timeout: 15000
                });

                console.log(
                    'RULE3 FOUND'
                );


                // =====================================================
                // 10. READ RULE BUILDER
                // =====================================================

                const rulesText =
                    await frame
                        .locator('body')
                        .innerText();

                console.log(
                    '\n========== RULES BUILDER TEXT =========='
                );

                console.log(
                    rulesText
                        .split('\n')
                        .map(
                            text => text.trim()
                        )
                        .filter(Boolean)
                        .slice(0, 250)
                );


                // =====================================================
                // 11. VERIFY THREE RULES
                // =====================================================

                expect(
                    rulesText
                ).toContain('Rule1');

                expect(
                    rulesText
                ).toContain('Rule2');

                expect(
                    rulesText
                ).toContain('Rule3');

                console.log(
                    'RULE1, RULE2 AND RULE3 VERIFIED'
                );


                // =====================================================
                // 12. VERIFY RULE BUILDER CONTROLS
                // =====================================================

                expect(
                    rulesText
                ).toContain('Add rule');

                expect(
                    rulesText
                ).toContain('Add condition');

                expect(
                    rulesText
                ).toContain('Add Group');

                expect(
                    rulesText
                ).toContain('Add action');

                console.log(
                    'RULE BUILDER CONTROLS VERIFIED'
                );


                // =====================================================
                // 13. VERIFY SET VALUE
                // =====================================================

                expect(
                    rulesText
                ).toContain('Set value');

                expect(
                    rulesText
                ).toContain('Value');

                console.log(
                    'SET VALUE ACTION VERIFIED'
                );


                // =====================================================
                // 14. VERIFY RULE CONDITIONS
                // =====================================================

                expect(
                    rulesText
                ).toContain(
                    'First Name - TextBox0'
                );

                expect(
                    rulesText
                ).toContain(
                    'Is not empty'
                );

                console.log(
                    'RULE CONDITION VERIFIED'
                );


                // =====================================================
                // 15. VERIFY EDIT BUTTONS
                // =====================================================

                const editButtons =
                    frame.getByText(
                        'Edit',
                        {
                            exact: true
                        }
                    );

                const editCount =
                    await editButtons.count();

                console.log(
                    'EDIT BUTTON COUNT:',
                    editCount
                );

                expect(
                    editCount
                ).toBeGreaterThanOrEqual(3);

                console.log(
                    'EDIT BUTTONS VERIFIED'
                );


                // =====================================================
                // 16. VERIFY FORM RULE COUNT
                // =====================================================

                const rulesCount =
                    frame.getByText(
                        /Form rules \(3\)/
                    );

                await expect(
                    rulesCount
                ).toBeVisible({
                    timeout: 10000
                });

                console.log(
                    'FORM RULES (3) VERIFIED'
                );


                // =====================================================
                // 17. VERIFY SAVE BUTTON
                // =====================================================

                const saveButton =
                    frame.getByText(
                        'Save',
                        {
                            exact: true
                        }
                    );

                await expect(
                    saveButton
                ).toBeVisible({
                    timeout: 10000
                });

                console.log(
                    'SAVE BUTTON VERIFIED'
                );


                // =====================================================
                // 18. VERIFY EDITOR URL
                // =====================================================

                console.log(
                    '\nFORM EDITOR URL:'
                );

                console.log(
                    page.url()
                );

                expect(
                    page.url()
                ).toContain(
                    '/module/attended/form/edit'
                );


                // =====================================================
                // FINAL
                // =====================================================

                console.log(
                    '\n========================================'
                );

                console.log(
                    'USE CASE 2 VERIFICATION PASSED'
                );

                console.log(
                    '========================================\n'
                );
            }
        );
    }
);