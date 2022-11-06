import {
    test,
    expect
} from '@playwright/test'
import {
    LoginPage
} from '../pages/Login.page'
import { url } from '../data/data'

test.describe('Regressive Login Tests', () => {
    test.beforeEach(async ({
        page
    }) => {
        await page.goto(url, {
            timeout: 12000
        })
    })

    test('Should login', async ({
        page
    }) => {
        const loginPage = new LoginPage(page)
        await loginPage.login()
        await expect(page.url()).toContain('todo');
    })

    test('Should not login', async ({
        page
    }) => {
        const loginPage = new LoginPage(page)
        expect(await loginPage.invalidLogin()).toBe('Invalid Credentials!')
    })

    test('Should load all interactive components', async ({
        page
    }) => {
        const loginPage = new LoginPage(page)
        await expect.soft(loginPage.txtPassword).toHaveCount(1, {
            timeout: 1000
        })
        await expect.soft(loginPage.btnHelp).toHaveCount(1, {
            timeout: 1000
        })
        await expect.soft(loginPage.txtUsername).toHaveCount(1, {
            timeout: 1000
        })
        await expect.soft(loginPage.btnLogin).toHaveCount(1, {
            timeout: 1000
        })
    })
})