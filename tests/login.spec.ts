import { test, expect } from '@playwright/test';
import { USER } from '../test.data';
import { Login } from '../page/login';

test.describe('Login tests', () => {
    let login: Login;
    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
        await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);
        login = new Login(page);
    });
    test('should be able to login', async ({ page }) => {
        await login.login();
        await expect(page.getByText('Log Out')).toBeVisible();
        await expect(page.getByText('Log Out')).toContainText('Log Out');
    });
    test('should not be able to login with invalid username', async ({ page }) => {
        await login.login('invalid', `${USER.password}`);
        await expect(page.getByText('Incorrect value: Invalid login or password.')).toBeVisible();
        await expect(page.getByText('Log Out')).toBeHidden();
    });
    test('should not be able to login with invalid password', async ({ page }) => {
        await login.login(`${USER.userName}`, 'invalid');
        await expect(page.getByText('Incorrect value: Invalid login or password.')).toBeVisible();
        await expect(page.getByText('Log Out')).toBeHidden();
    });
    test('should not be able to login with empty username', async ({ page }) => {
        await login.login(' ', 'random');
        await expect(page.getByText(' Incorrect value: Required value is missing.')).toBeVisible();
        await expect(page.getByText('Log Out')).toBeHidden();
    });
});
