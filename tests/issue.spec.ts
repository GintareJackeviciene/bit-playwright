import { test, expect } from '@playwright/test';
import { USER } from '../test.data';
import { faker } from '@faker-js/faker';



test.describe('Issue spec', () => {
  let createIssueTitle: string;
 let deleteIssueTitle: string;
 test.beforeEach(async ({ page })=>{
   await page.goto('/register');
   await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);

   await page.fill("#field-login-login", `${USER.userName}`);
   await page.fill("[type='password']", `${USER.password}`);
   await page.click("//*[@id='field-login-loginSubmit']");

   await expect(page.getByText(/Administration Panel/i)).toBeVisible();
   await expect(page.getByText(/Log Out/i)).toBeVisible();
   await page.goto('/register/client/index.php?folder=1');
  });

test('should be able to create and delete issue', async ({ page }) => {
  await page.click('[title="Add Issue"]');
  await page.fill('#field-issues-issueName', 'playwright title');
  await page.fill('#field-issues-descriptionText', 'Gintares issue description');
  
  await page.click('#field-issues-okSubmit');
  await expect(page.locator("//h2[text()='playwright title']")).toBeVisible();

  await page.click('[title="Delete Issue"]');
  await page.click('#field-issues-okSubmit');
  await expect(page.getByText(/playwright title/i)).not.toBeVisible();
});

test('should not be able to create issue with empty title', async ({ page }) => {
  await page.click('[title="Add Issue"]');
  await page.fill('#field-issues-issueName', ' ');
  await page.fill('#field-issues-descriptionText','Gintares issue description');
  await page.click('#field-issues-okSubmit');

  await expect(page.getByText(/Incorrect value: Required value is missing./i)).toBeVisible();
  
});

test('should be able to create issue',async ({ page }) => {
  createIssueTitle = faker.string.uuid();
  await page.click('[title="Add Issue"]');
  await page.fill('#field-issues-issueName', createIssueTitle);
  await page.fill('#field-issues-descriptionText', `Cypress issue description ${createIssueTitle}`);
  await page.click('#field-issues-okSubmit');
 
  await expect(page.locator(`//h2[text()="${createIssueTitle}"]`)).toBeVisible();

  //delete test data
 await page.goto('/register/client/index.php?folder=1');
      await page.fill('[name="searchBox"]', createIssueTitle);
      await page.click('#field-search-searchSubmit');
      await page.click(`[title="${createIssueTitle}"]`);
      await page.click('[title="Delete Issue"]');
      await page.click('#field-issues-okSubmit');
});
 test('should be able to delete issue', async ({ page }) => {
 //craete data
  deleteIssueTitle = faker.string.uuid();
  await page.click('[title="Add Issue"]');
  await page.fill('#field-issues-issueName', deleteIssueTitle);
  await page.fill('#field-issues-descriptionText', `Cypress issue description ${deleteIssueTitle}`);
  await page.click('#field-issues-okSubmit');
 
  await expect(page.locator(`//h2[text()="${deleteIssueTitle}"]`)).toBeVisible();

 //test
        await page.fill('[name="searchBox"]', deleteIssueTitle);
        await page.click('#field-search-searchSubmit');
        await page.click(`[title="${deleteIssueTitle}"]`);

       await page.click('[title="Delete Issue"]');
       await page.click('#field-issues-okSubmit');
        await expect(page.locator(`//h2[text()="${deleteIssueTitle}"]`)).not.toBeVisible();
       
    });

});


