import { test, expect } from '@playwright/test';
test.slow();
test.describe('Matching game', () => {
    test('Attempts to match', async ({ page }) => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        await page.goto('https://testingmarathon.com/testing/Memory/');
        for (const number of numbers) {
            await page.click(`#card-${number}`);
            for (const card of numbers) {
                const className = await page.$eval(`#card-${number}`, (element) => {
                    return element.getAttribute('class');
                });
                if (className == 'card matched') break;
                await page.click(`#card-${number}`);
                await page.waitForTimeout(500);
                await page.click(`#card-${card}`);
                await page.waitForTimeout(500);
                console.log(className);
                if (className == 'card matched') break;
            }
        }
        await expect(page.locator('#gameStatus')).toContainText('Congratulations! You have won!');
    });
});
