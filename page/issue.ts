import { Page } from '@playwright/test';
export class Issue {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    static buttons = {
        addIssue: '[title="Add Issue"]',
        deleteIssue: '[title="Delete Issue"]',
        submit: '#field-issues-okSubmit',
        search: '#field-search-searchSubmit',
        title: (title: string): string => `[title="${title}"]`
    };
    static fields = {
        name: '#field-issues-issueName',
        description: '#field-issues-descriptionText',
        search: '[name="searchBox"]'
    };
    static text = {
        title: (title: string): string => `//h2[text()="${title}"]`
    };
    async createIssue(title: string, description: string) {
        await this.page.click(Issue.buttons.addIssue);
        await this.page.fill(Issue.fields.name, title);
        await this.page.fill(Issue.fields.description, description);
        await this.page.click(Issue.buttons.submit);
    }
    async deleteIssue(title: string) {
        await this.page.goto('/register/client/index.php?folder=1');
        await this.page.fill(Issue.fields.search, title);
        await this.page.click(Issue.buttons.search);
        await this.page.click(Issue.buttons.title(title));
        await this.page.click(Issue.buttons.deleteIssue);
        await this.page.click(Issue.buttons.submit);
    }
}
