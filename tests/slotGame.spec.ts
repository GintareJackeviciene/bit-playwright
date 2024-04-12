import { test, expect } from '@playwright/test';

test.describe('slot machine game spec', () => {
    const parameter = ['You win!', 'Try again!'];
    for (const testCase of parameter) {
        test(`should be able to ${testCase}`, async ({ page }) => {
            await page.goto('https://testingmarathon.com/testing/slot_machine_game/');
            await expect
                .poll(
                    async () => {
                        await page.click('#spinButton');
                        return await page.textContent('#result');
                    },
                    {
                        timeout: 20_000
                    }
                )
                .toEqual(testCase);
        });
    }
});
