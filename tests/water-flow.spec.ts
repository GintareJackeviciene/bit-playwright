import { test, expect } from '@playwright/test';

test.describe('Water flow simulation', () => {
    const testConfiguraton = [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4],
        [1, 2, 3, 5],
        [1, 2, 3],
        [1, 2, 4, 5],
        [1, 2, 5],
        [1, 2],
        [1, 3, 4, 5],
        [1, 3, 4],
        [1, 3, 5],
        [1, 3],
        [1, 4, 5],
        [1, 4],
        [1, 5],
        [1],
        [2, 3, 4, 5],
        [2, 3, 4],
        [2, 3, 5],
        [2, 3],
        [2, 4, 5],
        [2, 4],
        [2, 5],
        [2],
        [3, 4, 5],
        [3, 4],
        [3, 5],
        [3],
        [4, 5],
        [4],
        [5],
        []
    ];
    for (const testCase of testConfiguraton) {
        test(`should be able turn on ${testCase.toString()} pipes `, async ({ page }) => {
            await page.goto('/testing/WaterFlowSimulation/');

            for (const pipes of testCase) {
                await page.click(`#valve${pipes}`);
            }
            for (const pipes of testCase) {
                await expect(page.locator(`#pipe${pipes}`)).toHaveClass('pipe active');
            }
        });
    }
});
