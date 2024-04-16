import { test, expect } from '@playwright/test';

test.describe('Bank Account Age Calculator spec', () => {
    const parameter = [
        ['1995-01-01', 'Jonas Jonaitis, Your age: 29 years'],
        ['1996-01-01', 'Jonas Jonaitis, Your age: 28 years'],
        ['1997-01-01', 'Jonas Jonaitis, Your age: 27 years'],
        ['1998-01-01', 'Jonas Jonaitis, Your age: 26 years'],
        ['1999-01-01', 'Jonas Jonaitis, Your age: 25 years'],
        ['2000-01-01', 'Jonas Jonaitis, Your age (with Y2K bug): 124 years']
    ];

    for (const testCase of parameter) {
        test(`should be able to posible to calculate correct age for ${testCase[0]} `, async ({ page }) => {
            await page.goto('https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/');
            await page.fill('#firstName', 'Jonas');
            await page.fill('#lastName', 'Jonaitis');
            await page.fill('#dob', testCase[0]);
            await page.click('//button');
            await expect(page.locator('#result')).toContainText(testCase[1]);
        });
    }
});
