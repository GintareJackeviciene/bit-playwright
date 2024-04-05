import { test, expect } from '@playwright/test';
import { USER } from '../test.data';



test.describe('Login tests', () => {
test('should be able to login', async ({ page }) => {
  await page.goto('/register');

  await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

  await page.fill('#field-login-login', `${USER.userName}`);
  await page.fill('[type=\'password\']', `${USER.password}`);
  await page.click('//*[@id=\'field-login-loginSubmit\']');

  await expect(page.getByText('Log Out')).toBeVisible();
  await expect(page.getByText('Log Out')).toContainText('Log Out');
});

test('should not be able to login with invalid username', async ({ page }) => {
  await page.goto('/register');

  await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

  await page.fill('#field-login-login', `invalid`);
  await page.fill('[type=\'password\']', `${USER.password}`);
  await page.click('//*[@id=\'field-login-loginSubmit\']');

await expect(page.getByText('Incorrect value: Invalid login or password.')).toBeVisible();
  await expect(page.getByText('Log Out')).toBeHidden();
  
});

});