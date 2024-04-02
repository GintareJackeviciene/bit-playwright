import { test, expect } from '@playwright/test';
import { USER, API, API_KEY } from '../test.data';



test.describe('Login tests', () => {
test('should be able to login', async ({ page }) => {
  await page.goto('/register');

  await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

  await page.fill("#field-login-login", `${USER.userName}`);
  await page.fill("[type='password']", `${USER.password}`);
  await page.click("//*[@id='field-login-loginSubmit']");

  await expect(page.getByText('Log Out')).toBeVisible();
  await expect(page.getByText('Log Out')).toContainText('Log Out');
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
});