import { test, expect } from '@playwright/test';
import { getRandomString } from '../test.data';
import { APP_URL, COOKIE } from '../test.data';

const email = `${getRandomString(20, 'qwertyuiopasdfghjklzxcvbnm')}@lokalus.lt`;

test.describe('Segment APP spec', () => {
    test.afterEach(async ({ page, context }) => {
        //istrina kontakta
        await page.goto(`${APP_URL}/audience/segments/contact-list`);
        await page.click('//*[@placeholder="Search contacts by email or phone number"]');
        await page.keyboard.type(email, { delay: 100 }); //similiuoja letesni suvedima
        //await page.keyboard.type('  ', { delay: 500 });

        // await expect(page.locator('//*[@data-tid="skeleton-loading-indicator"]')).toBeVisible();
        // await expect(page.locator('//*[@data-tid="skeleton-loading-indicator"]')).not.toBeVisible();

        const pagePromise = context.waitForEvent('page');
        await page.getByText('No name').click();
        const newPage = await pagePromise;
        await newPage.click('//button[@tid="more-actions"]');
        await newPage.click('//div[contains(text(), "Delete")]');
        await newPage.click('//div[contains(text(), "Yes, I’m 100% sure I want to delete the selected contacts.")]');
        await newPage.click('//div[contains(text(), "Confirm")]');

        //istrinam segmenta
        await page.goto(`${APP_URL}/audience/segments/segments-list`);
        await page.fill('//*[@data-tid="segments-list-page-search"]', email);
        await page.click('//*[@data-tid="more-actions"]');
        await page.click('//*[@data-tid="delete-all"]');
        await page.click('//*[@data-tid="delete-confimr"]');
    });

    test('should be able to segment by contact id', async ({ page }) => {
        //sukuriam kontakta
        const context = page.context();
        await context.addCookies([{ name: 'session.omnisend', value: COOKIE, url: APP_URL }]);
        await page.goto(`${APP_URL}/audience/imports/wizard/contact`);
        await page.fill('//input[@placeholder="Enter email"]', email);
        await page.click('//*[contains(text(), "This person gave permission to be added to the list.")]');
        await page.click('//*[contains(text(), "Add subscriber")]');
        await expect(page.locator('//tbody')).toContainText(email, { timeout: 10000 });

        //kuriam segmenta ir tikrinam ar kontaktas ikrenta i segmenta
        await page.goto(`${APP_URL}/audience/segments/editor/`);
        await page.click('//*[contains(text(), "Add filter")]');
        await page.click('//*[contains(text(), "Email address")]');
        await page.click('//div[@class="select ng-invalid"]');
        await page.fill('//*[@placeholder="Search or enter new value"]', email);
        await page.keyboard.press('Enter');
        await page.keyboard.press('Escape');
        await page.click('//*[contains(text(), "Save & show contacts")]');
        await page.fill('//input', email);
        await page.click('//div[(text()=" Save ")]');
        await expect(page.locator('//tbody')).toContainText(email, { timeout: 15000 });
    });
});
