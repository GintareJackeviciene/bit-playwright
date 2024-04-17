import { test, expect } from '@playwright/test';
import { Segments } from '../app-api/segments';
import { Contact } from '../api/contact';
import { Contacts } from '../app-api/contacts';
import { getRandomString, sleep } from '../test.data';
import { ContactsDelete } from '../app-api/contactsDelete';
import { APP_URL, COOKIE } from '../test.data';

const email = `${getRandomString(20, 'qwertyuiopasdfghjklzxcvbnm')}@lokalus.lt`;

test.describe('Segment APP spec', () => {
    test.afterEach(async ({ page, context }) => {
        await page.goto(`${APP_URL}/audience/segments/contact-list`);
        await page.type('//*[@placeholder="Search contacts by email or phone number"]', email);
        await sleep(500);

        const pagePromise = context.waitForEvent('page');
        await page.getByText('No name').click();

        const newPage = await pagePromise;

        await newPage.click('//*[tid="more-actions"]');
        await newPage.click('//div[contains(text(), "Delete")]');
        await newPage.click('//div[contains(text(), "Yes, I’m 100% sure I want to delete the selected contacts.")]');
        await newPage.click('//div[contains(text(), "Confirm")]');
    });

    test('should be able to segment by contact id', async ({ page }) => {
        // const contact = await Contact.createContactByEmail(email);
        // contactID = (await contact.json()).contactID;

        //sukuriam kontakta
        const context = page.context();
        await context.addCookies([{ name: 'session.omnisend', value: COOKIE, url: APP_URL }]);
        await page.goto(`${APP_URL}/audience/imports/wizard/contact`);
        await page.fill('//input[@placeholder="Enter email"]', email);
        await page.click('//*[contains(text(), "This person gave permission to be added to the list.")]');
        await page.click('//*[contains(text(), "Add subscriber")]');
        await expect(page.locator('//tbody')).toContainText(email, { timeout: 15000 });

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
        await expect(page.locator('//tbody')).toContainText(email, { timeout: 25000 });
    });
});
