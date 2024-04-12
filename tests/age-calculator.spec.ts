import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const names = {
    firstName: `${faker.person.firstName()}`,
    lastName: `${faker.person.lastName()}`
};

test.describe('Bank Account Age Calculator spec', () => {
    test('Gimimo data iki 2000', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/');

        await page.fill('#firstName', names.firstName);
        await page.fill('#lastName', names.lastName);
        await page.fill('#dob', '1999-01-01');
        await page.click('//button[@onclick="calculateAge()"]');
        await expect(page.locator('#result')).toContainText(`${names.firstName} ${names.lastName}, Your age: 25 years`);
    });
    test('Gimimo data po 2000', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/');

        await page.fill('#firstName', names.firstName);
        await page.fill('#lastName', names.lastName);
        await page.fill('#dob', '2000-01-01');
        await page.click('//button[@onclick="calculateAge()"]');
        await expect(page.locator('#result')).toContainText(`${names.firstName} ${names.lastName}, Your age (with Y2K bug): 124 years`);
    });
});

// test.describe('Bank Account Age Calculator spec', () => {
//     const birthDates = ['1999-01-01', '2000-01-01'];
//     const parameter = ['Jonas Jonaitis, Your age: 25 years', 'Jonas Jonaitis, Your age (with Y2K bug): 124 years'];

//     for (const testCase of parameter) {
//         for (const dob of birthDates) {
//             test(`should be able to ${testCase} with birth date ${dob}`, async ({ page }) => {
//                 await page.goto('https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/');
//                 await page.fill('#firstName', 'Jonas');
//                 await page.fill('#lastName', 'Jonaitis');
//                 await page.fill('#dob', dob);
//                 await expect
//                     .poll(
//                         async () => {
//                             await page.click('//button[@onclick="calculateAge()"]');
//                             return await page.textContent('#result');
//                         },
//                         {
//                             timeout: 15_000
//                         }
//                     )
//                     .toEqual(testCase);
//             });
//         }
//     }
// });
