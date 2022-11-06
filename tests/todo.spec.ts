import test, {
    expect
} from "@playwright/test";
import {
    LoginPage
} from "../pages/Login.page";
import {
    TodoPage
} from "../pages/Todo.page"
import {
    getRandomInt
} from "../util/datagen";

test.describe('Regressive Todo', () => {
    test.beforeEach(async ({
        page
    }) => {
        await page.goto('localhost:8081/login.php', {
            timeout: 12000
        })
        const loginPage = new LoginPage(page)
        await loginPage.login()
    })

    test('should add multiple tasks', async ({
        page
    }) => {
        const todoPage = new TodoPage(page)
        expect(await todoPage.createTask(getRandomInt())).toBeGreaterThan(0)
    })

    test('should delete multiple tasks', async ({
        page
    }) => {
        const todoPage = new TodoPage(page)
        const taskCount = await todoPage.createTask(getRandomInt())
        expect(await todoPage.deleteTask(taskCount)).toBe(0)
    })

    test('should set task as done', async ({
        page
    }) => {
        const todoPage = new TodoPage(page)
        await todoPage.createTask(1)
        expect(await todoPage.setTaskAsDone()).toBeGreaterThan(0)
    })
})