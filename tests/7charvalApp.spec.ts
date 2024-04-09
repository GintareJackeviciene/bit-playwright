import { test, expect } from '@playwright/test';
import { getRandomString } from '../test.data';

test.describe('Valid test', () => {
    const validRandomValues = Array.from({ length: 1 }, () =>
        getRandomString(7, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678901234567890123456789***************')
    );

    validRandomValues.forEach((validRandomValue, i) => {
        test(`(${i}) should be Valid value `, async ({ page }) => {
            await page.goto('https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm');
            await page.fill('[name="characters"]', validRandomValue);
            await page.click('[name="validate"]');
            const text = await page.locator('//input[@name="validation_message"]').inputValue();
            expect(`${text}`, `${validRandomValue} should be valid`).toEqual('Valid Value');
        });
    });

    test(`should be Valid value`, async ({ page }) => {
        let validRandomValue: string;
        for (let i = 0; i < 1; i++) {
            await test.step(`generate data [${i}]`, () => {
                validRandomValue = getRandomString(
                    7,
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678901234567890123456789***************'
                );
            });

            await test.step(`${validRandomValue}should be valid`, async () => {
                await page.goto('https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm');
                await page.fill('[name="characters"]', validRandomValue);
                await page.click('[name="validate"]');
                const text = await page.locator('//input[@name="validation_message"]').inputValue();
                expect(`${text}`, `${validRandomValue} should be valid`).toEqual('Valid Value');
            });
        }
    });

    const invalidRandomValues = Array.from({ length: 1 }, () => getRandomString(7, '!@#$%^&()_+{}":><?/'));

    invalidRandomValues.forEach((invalidRandomValue, i) => {
        test(`(${i}) should be invalid value `, async ({ page }) => {
            await page.goto('https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm');
            await page.fill('[name="characters"]', invalidRandomValue);
            await page.click('[name="validate"]');
            const text = await page.locator('//input[@name="validation_message"]').inputValue();
            expect(`${text}`, `${invalidRandomValue} should be invalid`).toEqual('Invalid Value');
        });
    });
});
