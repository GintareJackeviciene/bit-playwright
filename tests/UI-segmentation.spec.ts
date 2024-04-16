import { test, expect } from '@playwright/test';
import { Segments } from '../app-api/segments';
import { Contact } from '../api/contact';
import { Contacts } from '../app-api/contacts';
import { getRandomString } from '../test.data';
import { ContactsDelete } from '../app-api/contactsDelete';
import { APP_URL, COOKIE } from '../test.data';

const email = `${getRandomString(20, 'qwertyuiopasdfghjklzxcvbnm')}@lokalus.lt`;

const segment = {
    name: `segment by email = ${email}`,
    filters: {
        type: 'group',
        group: {
            junction: 'or',
            members: [
                {
                    type: 'group',
                    group: {
                        junction: 'and',
                        members: [
                            {
                                type: 'group',
                                group: {
                                    junction: 'and',
                                    members: [
                                        {
                                            type: 'rule',
                                            rule: {
                                                resourceType: 'contacts',
                                                filter: {
                                                    filterType: 'junction',
                                                    junction: 'and',
                                                    filters: [
                                                        {
                                                            filterType: 'filter',
                                                            filterValue: {
                                                                operator: 'eq',
                                                                valueType: 'string_list',
                                                                value: {
                                                                    operator: 'any',
                                                                    values: [email]
                                                                },
                                                                property: 'email'
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
};

let segmentID: string;
let contactID: string;

test.describe('Segment APP spec', () => {
    test.afterAll(async ({}) => {
        if (segmentID !== undefined) {
            await Segments.tryToDeleteSegment(segmentID);
        }
        if (contactID !== undefined) {
            await ContactsDelete.createBatchDelete([contactID]);
        }
    });

    test('should be able to segment by contact id', async ({ page }) => {
        // const contact = await Contact.createContactByEmail(email);
        // contactID = (await contact.json()).contactID;

        const context = page.context();
        await context.addCookies([{ name: 'session.omnisend', value: COOKIE, url: APP_URL }]);
        await page.goto(`${APP_URL}/audience/imports/wizard/contact`);
        await page.fill('//input[@placeholder="Enter email"]', email);
        await page.click('//*[contains(text(), "This person gave permission to be added to the list.")]');
        await page.click('//*[contains(text(), "Add subscriber")]');
        await expect(page.locator('//tbody')).toContainText(email);

        await page.goto(`${APP_URL}/audience/segments/editor/`);
        await page.click('//*[contains(text(), "Add filter")]');
        await page.click('//*[contains(text(), "Email address")]');

        await page.click('//div[@class="select ng-invalid"]');

        await page.fill('//*[@placeholder="Search or enter new value"]', email);
        await page.keyboard.press('Enter');
        await page.keyboard.press('Escape');

        await page.click('//*[contains(text(), "Save & show contacts"]');
        await page.fill('//input', email);
        await page.click('//div[(text()=" Save ")]');
        await expect(page.locator('//tbody')).toContainText(email, { timeout: 30000 });
    });
});
