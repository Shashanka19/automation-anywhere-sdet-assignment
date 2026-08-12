class AutomationPage {
    constructor(page) {
        this.page = page;

        // Automation Anywhere has multiple Create buttons.
        // Use aria-label and select the visible one.
        this.createButton = page
            .locator('button[aria-label="Create"]')
            .filter({ visible: true })
            .first();

        this.taskBotOption = page.getByText(
            'Task Bot…',
            { exact: true }
        );

        this.formOption = page.getByText(
            'Form…',
            { exact: true }
        );
    }

    async waitForAutomationPage() {

        // Wait until the Control Room SPA is actually loaded.
        await this.page.waitForFunction(() => {
            return (
                window.location.hash.includes(
                    '/bots/repository'
                ) ||
                document.body.innerText.includes(
                    'Automation'
                )
            );
        }, null, {
            timeout: 60000
        });

        // Give the SPA time to finish rendering.
        await this.page.waitForTimeout(3000);

        // If Create is not immediately found, reload once.
        let count = await this.page
            .locator('button[aria-label="Create"]')
            .count();

        if (count === 0) {

            await this.page.reload({
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            await this.page.waitForTimeout(5000);
        }

        await this.page
            .locator('button[aria-label="Create"]')
            .first()
            .waitFor({
                state: 'visible',
                timeout: 60000
            });
    }

    async openCreateMenu() {

        const createButtons = this.page.locator(
            'button[aria-label="Create"]'
        );

        const count = await createButtons.count();

        console.log(
            '\nCREATE BUTTON COUNT:',
            count
        );

        if (count === 0) {
            throw new Error(
                'Automation Anywhere Create button was not rendered.'
            );
        }

        // Find a visible Create button.
        for (let i = 0; i < count; i++) {

            const button = createButtons.nth(i);

            if (await button.isVisible()) {

                console.log(
                    'CLICKING CREATE BUTTON:',
                    i
                );

                await button.click({
                    force: true
                });

                break;
            }
        }

        // Wait for the Create menu.
        await this.page
            .getByText('Form…', {
                exact: true
            })
            .waitFor({
                state: 'visible',
                timeout: 20000
            });
    }

    async selectTaskBot() {

        const option = this.page.getByText(
            'Task Bot…',
            {
                exact: true
            }
        );

        await option.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await option.click({
            force: true
        });
    }

    async selectForm() {

        const option = this.page.getByText(
            'Form…',
            {
                exact: true
            }
        );

        await option.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await option.click({
            force: true
        });
    }
}

module.exports = {
    AutomationPage
};