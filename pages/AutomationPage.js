class AutomationPage {
    constructor(page) {
        this.page = page;

        // Automation navigation
        this.automationLink = page.getByText('Automation', {
            exact: true
        }).first();

        // Create button on Automation page
        this.createButton = page
            .getByRole('heading', {
                name: 'Automation Create Manage'
            })
            .getByLabel('Create');

        // Create -> Task Bot
        this.taskBotOption = page.locator(
            'button[name="createTaskbot"]'
        );

        // Create -> Form
        this.formOption = page.locator(
            'button[name="create-attended-form"]'
        );
    }

    async openAutomation() {
        // Start from the known home route
        await this.page.goto(
            'https://community.cloud.automationanywhere.digital/#/home',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        // Wait for SPA rendering
        await this.page.waitForTimeout(4000);

        // Click Automation from the left navigation
        await this.automationLink.click();
    }

    async openCreateMenu() {
        await this.createButton.click();
    }

    async selectTaskBot() {
        await this.taskBotOption.click();
    }

    async selectForm() {
        await this.formOption.click();
    }
}

module.exports = { AutomationPage };