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
    readonly taskItem: Locator
    readonly taskCompleted: Locator
    readonly toastMessage: Locator

    constructor(page: Page) {
        this.page = page;
        this.btnAdd = page.locator('#btnAdd')
        this.cboFilter = page.locator('#cboFilter')
        this.btnDone = page.locator('.btnDone')
        this.btnDelete = page.locator('.btnDelete')
        this.txtTask = page.locator('#txtTask')
        this.taskItem = page.locator('.todo:visible')
        this.taskCompleted = page.locator('.todo.completed')
        this.toastMessage = page.locator('.toast')        
    }

    async createTask(taskCount: number) {
        for (let index = 0; index < taskCount; index++) {
            await this.txtTask.type(Date.now().toString())
            await this.btnAdd.click()
        }
        return await this.btnDelete.count()
    }

    async deleteTask(taskCount: number) {
        for (let index = 0; index < taskCount; index++) {
            await this.btnDelete.nth(index).click()
        }
        await this.btnDelete.last().waitFor({
            state: "detached"
        })
        return await this.btnDelete.count()
    }

    async setTaskAsDone(taskCount: number) {
        for (let index=0; index < taskCount; index++){
            await this.btnDone.nth(index).click()    
        }
        
        return await this.page.locator('.completed').count()
    }

    async filterComplete(taskCount: number){        
        await this.cboFilter.selectOption("Done")
        await this.cboFilter.dblclick()
        return await this.taskCompleted.count() < taskCount
    }

    async filterIncomplete(){
        await this.cboFilter.selectOption("To Do")
        await this.cboFilter.dblclick()
        return await this.taskItem.count() < await this.taskCompleted.count()
    }

    async getBlockMessage(){
        await this.btnAdd.click()
        return await this.toastMessage.textContent()
    }
}