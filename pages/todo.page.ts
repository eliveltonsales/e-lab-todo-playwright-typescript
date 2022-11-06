import {
    Locator,
    Page
} from "@playwright/test";

export class TodoPage {
    readonly page: Page
    readonly btnAdd: Locator
    readonly cboFilter: Locator
    readonly btnDone: Locator
    readonly btnDelete: Locator
    readonly txtTask: Locator

    constructor(page: Page) {
        this.page = page;
        this.btnAdd = page.locator('#btnAdd')
        this.cboFilter = page.locator('#cboFilter')
        this.btnDone = page.locator('.btnDone')
        this.btnDelete = page.locator('.btnDelete')
        this.txtTask = page.locator('#txtTask')
    }

    async createTask(taskCount) {
        for (let index = 0; index < taskCount; index++) {
            await this.txtTask.type(Date.now().toString())
            await this.btnAdd.click()
        }
        return await this.btnDelete.count()
    }

    async deleteTask(taskCount) {
        for (let index = 0; index < taskCount; index++) {
            await this.btnDelete.nth(index).click()
        }
        await this.btnDelete.last().waitFor({
            state: "detached"
        })
        return await this.btnDelete.count()
    }

    async setTaskAsDone() {
        await this.btnDone.click()
        return await this.page.locator('.completed').count()
    }
}