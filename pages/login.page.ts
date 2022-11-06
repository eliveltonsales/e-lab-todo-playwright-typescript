import {
    Locator,
    Page
} from '@playwright/test';

import {
    username,
    password
} from '../data/data';

export class LoginPage {
    readonly page: Page
    readonly errorMessage: Locator
    readonly txtUsername: Locator
    readonly txtPassword: Locator
    readonly btnLogin: Locator
    readonly btnHelp: Locator

    constructor(page: Page) {
        this.page = page;
        this.errorMessage = page.locator('.loginfail')
        this.txtUsername = page.locator('#txtUsername')
        this.txtPassword = page.locator('#txtPassword')
        this.btnLogin = page.locator('#btnLogin')
        this.btnHelp = page.locator('#btnHelp')
    }

    async login() {
        await this.txtUsername.type(username)
        await this.txtPassword.type(password)
        await this.btnLogin.click()
    }

    async invalidLogin() {
        await this.txtUsername.type('username')
        await this.txtPassword.type('password')
        await this.btnLogin.click()
        return this.errorMessage.innerText()
    }
}