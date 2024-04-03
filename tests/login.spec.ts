import { test, expect } from '@playwright/test';
import { USER } from '../test.data';



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

test('should not be able to login with invalid username', async ({ page }) => {
  await page.goto('/register');

  await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

  await page.fill("#field-login-login", `invalid`);
  await page.fill("[type='password']", `${USER.password}`);
  await page.click("//*[@id='field-login-loginSubmit']");

await expect(page.getByText("Incorrect value: Invalid login or password.")).toBeVisible();
  await expect(page.getByText('Log Out')).not.toBeVisible();
  
});
test('should not be able to login with invalid password', async ({ page }) => {
  await page.goto('/register');

  await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

  await page.fill("#field-login-login", `${USER.userName}`);
  await page.fill("[type='password']", `invalid`);
  await page.click("//*[@id='field-login-loginSubmit']");

  await expect(page.getByText("Incorrect value: Invalid login or password.")).toBeVisible();
  await expect(page.getByText('Log Out')).not.toBeVisible();
  
});
test('should not be able to login with empty username and password', async ({ page }) => {
  await page.goto('/register');

  await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

  await page.fill("#field-login-login", ` `);
  await page.fill("[type='password']", `fhgfhjgh`);
  await page.click("//*[@id='field-login-loginSubmit']");
 
  await expect(page.getByText(" Incorrect value: Required value is missing.")).toBeVisible();
  await expect(page.getByText('Log Out')).not.toBeVisible();
  
});
});