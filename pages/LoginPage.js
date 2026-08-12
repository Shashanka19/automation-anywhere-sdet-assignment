class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.showPasswordButton = page.getByRole('button', { name: 'Show password' });
        this.rememberMe = page.getByText('Remember my username');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    async goto() {
        await this.page.goto(
            'https://community.cloud.automationanywhere.digital/'
        );
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };