class TaskBotPage {
    constructor(page) {
        this.page = page;

        // ==========================================
        // Create Task Bot form
        // ==========================================

        this.botNameInput = page.locator('input[name="name"]');

        this.descriptionInput = page.locator(
            'input[name="description"]'
        );

        this.createAndEditButton = page.locator(
            'button[name="submit"]'
        );

        // ==========================================
        // Message Box
        // ==========================================

        this.messageBoxAction = page
            .getByText('Message box', {
                exact: true
            })
            .last();

        this.windowTitleInput = page.getByRole('textbox', {
            name: 'Enter the message box window title'
        });

        this.messageInput = page.getByRole('textbox', {
            name: 'Enter the message to display'
        });

        // ==========================================
        // Save
        // ==========================================

        this.saveButton = page.getByRole('button', {
            name: 'Save',
            exact: true
        });
    }

    // ==========================================
    // Create Task Bot
    // ==========================================

    async createTaskBot(name, description) {
        await this.botNameInput.fill(name);
        await this.descriptionInput.fill(description);
        await this.createAndEditButton.click();
    }

    // ==========================================
    // Temporary Message Box Diagnostic
    // ==========================================

    async addMessageBox() {
        await this.page.waitForTimeout(3000);

        console.log('\n=== QUICK / ADD / ACTION BUTTONS ===');

        console.log(
            await this.page.locator('button:visible').evaluateAll(
                buttons =>
                    buttons
                        .map((button, index) => ({
                            index,
                            text: button.textContent?.trim(),
                            ariaLabel:
                                button.getAttribute('aria-label'),
                            title:
                                button.getAttribute('title'),
                            name:
                                button.getAttribute('name'),
                            dataPath:
                                button.getAttribute('data-path')
                        }))
                        .filter(item => {
                            const value = JSON.stringify(item).toLowerCase();

                            return (
                                value.includes('quick') ||
                                value.includes('add') ||
                                value.includes('action')
                            );
                        })
            )
        );

        console.log('\n=== QUICK ADD TEXT ===');

        console.log(
            await this.page
                .locator('text=/quick add/i')
                .allTextContents()
        );

        console.log(
            '\n=== ELEMENTS WITH QUICK IN ARIA/TITLE ==='
        );

        console.log(
            await this.page
                .locator(
                    '[aria-label*="Quick" i], [title*="Quick" i]'
                )
                .evaluateAll(elements =>
                    elements.map(element => ({
                        tag: element.tagName,
                        text: element.textContent?.trim(),
                        ariaLabel:
                            element.getAttribute('aria-label'),
                        title:
                            element.getAttribute('title'),
                        dataPath:
                            element.getAttribute('data-path'),
                        outerHTML:
                            element.outerHTML.substring(0, 1500)
                    }))
                )
        );

        console.log('\n=== VISIBLE PAGE TEXT CONTAINING ADD ===');

        console.log(
            await this.page
                .locator('body')
                .innerText()
                .then(text =>
                    text
                        .split('\n')
                        .map(line => line.trim())
                        .filter(line =>
                            /add|action|quick/i.test(line)
                        )
                        .slice(0, 100)
                )
        );

        // Stop here temporarily.
    }

    // ==========================================
    // Configure Message Box
    // ==========================================

    async configureMessageBox(title, message) {
        await this.windowTitleInput.fill(title);
        await this.messageInput.fill(message);
    }

    // ==========================================
    // Save Task Bot
    // ==========================================

    async save() {
        await this.saveButton.click();
    }
}

module.exports = { TaskBotPage };