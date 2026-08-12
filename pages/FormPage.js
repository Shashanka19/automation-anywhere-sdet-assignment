class FormPage {
    constructor(page) {
        this.page = page;

        // Automation page
        this.createButton = page.locator(
            'button[name="createOptions"]:visible'
        ).first();

        this.formOption = page.locator(
            'button[name="create-attended-form"]'
        );

        // Create Form dialog
        this.formNameInput = page.locator(
            'input[name="name"]'
        ).last();

        this.descriptionInput = page.locator(
            'input[name="description"]'
        ).last();

        this.createAndEditButton = page.getByRole(
            'button',
            {
                name: 'Create & edit',
                exact: true
            }
        );

        // Form editor iframe
        this.editorFrame = page.frameLocator(
            'iframe.modulepage-frame'
        );
    }

    async openCreateMenu() {
        await this.createButton.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await this.createButton.click();
    }

    async selectForm() {
        await this.formOption.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.formOption.click();
    }

    async createForm(name, description) {
        await this.formNameInput.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.formNameInput.fill(name);

        if (
            await this.descriptionInput.count() > 0
        ) {
            await this.descriptionInput.fill(
                description
            );
        }

        await this.createAndEditButton.click();
    }

    async waitForEditor() {
        await this.page.locator(
            'iframe.modulepage-frame'
        ).waitFor({
            state: 'visible',
            timeout: 60000
        });

        await this.editorFrame
            .getByText('Form rules', {
                exact: false
            })
            .waitFor({
                state: 'visible',
                timeout: 30000
            });
    }

    async getEditorFrame() {
        return this.editorFrame;
    }

    async verifyFormEditor() {
        const frame = this.editorFrame;

        await frame.getByText(
            'Form',
            {
                exact: true
            }
        ).waitFor({
            state: 'visible',
            timeout: 15000
        });

        await frame.getByText(
            'Text Box',
            {
                exact: true
            }
        ).waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    async getRulesText() {
        return await this.editorFrame
            .locator('body')
            .innerText();
    }

    async verifyRulesTab() {
        const rulesTab = this.editorFrame.getByText(
            'Form rules',
            {
                exact: false
            }
        );

        await rulesTab.waitFor({
            state: 'visible',
            timeout: 20000
        });

        return rulesTab;
    }

    async verifyThreeRules() {
        const frame = this.editorFrame;

        const bodyText = await frame
            .locator('body')
            .innerText();

        return {
            hasRule1: bodyText.includes('Rule1'),
            hasRule2: bodyText.includes('Rule2'),
            hasRule3: bodyText.includes('Rule3'),
            hasFormRules: bodyText.includes('Form rules')
        };
    }

    async verifyRuleControls() {
        const frame = this.editorFrame;

        const bodyText = await frame
            .locator('body')
            .innerText();

        return {
            hasAddRule: bodyText.includes('Add rule'),
            hasEdit: bodyText.includes('Edit'),
            hasRule1: bodyText.includes('Rule1'),
            hasRule2: bodyText.includes('Rule2'),
            hasRule3: bodyText.includes('Rule3'),
            hasAnd: bodyText.includes('AND'),
            hasSetValue: bodyText.includes('Set value')
        };
    }

    async save() {
        const saveButton = this.editorFrame.getByRole(
            'button',
            {
                name: 'Save',
                exact: true
            }
        );

        await saveButton.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await saveButton.click();
    }
}

module.exports = {
    FormPage
};