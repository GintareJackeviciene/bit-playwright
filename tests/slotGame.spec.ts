import { test, expect } from '@playwright/test';

test.describe('slot machine game spec', () => {
    test('should be able to win', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/slot_machine_game/');

        await expect
            .poll(
                async () => {
                    await page.click('#spinButton');
                    return await page.textContent('#result');
                },
                {
                    timeout: 15_000
                }
            )
            .toEqual('You win!');
    });
    test('should be able to loose', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/slot_machine_game/');

        await expect
            .poll(
                async () => {
                    await page.click('#spinButton');
                    return await page.textContent('#result');
                },
                {
                    timeout: 15_000
                }
            )
            .toEqual('Try again!');
    });
});
