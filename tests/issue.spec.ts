import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Login } from '../page/login';
import { Issue } from '../page/issue';

test.describe('Issue spec', () => {
    let createIssueTitle: string;
    let deleteIssueTitle: string;
    let issue: Issue;

    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
        await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

        const login = new Login(page);
        await login.login();

        await expect(page.getByText(/Administration Panel/i)).toBeVisible();
        await expect(page.getByText(/Log Out/i)).toBeVisible();
        await page.goto('/register/client/index.php?folder=1');

        issue = new Issue(page);
    });

    test('should be able to create and delete issue', async ({ page }) => {
        const title = faker.string.uuid();
        await issue.createIssue(title, 'Gintares issue description');
        await expect(page.locator(Issue.text.title(title))).toBeVisible();
        await issue.deleteIssue(title);
        // await expect(page.getByText(title)).not.toBeVisible();
    });

    test('should not be able to create issue with empty title', async ({ page }) => {
        await issue.createIssue(' ', 'Gintares issue description');
        await expect(page.getByText(/Incorrect value: Required value is missing./i)).toBeVisible();
    });

    test('should be able to create issue', async ({ page }) => {
        createIssueTitle = faker.string.uuid();
        await test.step('creating issue', async () => {
            await issue.createIssue(createIssueTitle, `Gintares issue description${createIssueTitle}`);
            await expect(page.locator(Issue.text.title(createIssueTitle))).toBeVisible();
        });
        await test.step('after all delete created data', async () => {
            await issue.deleteIssue(createIssueTitle);
        });
    });
    test('should be able to delete issue', async ({ page }) => {
        deleteIssueTitle = faker.string.uuid();
        await test.step('create data to delete', async () => {
            await issue.createIssue(deleteIssueTitle, `Gintares issue description${deleteIssueTitle}`);
        });

        await test.step('deleting issue', async () => {
            await issue.deleteIssue(deleteIssueTitle);
            await expect(page.locator(Issue.text.title(deleteIssueTitle))).toBeHidden();
        });
    });
});
