import { test, expect } from '@playwright/test';
import { sleep } from '../test.data';

test.describe('Human moving mouse spec', () => {
    test('Mouse moving robot', async ({ page }) => {
        await page.goto('/testing/HumanMovingMouse/');
        await page.click('#startButton');
        await page.click('#checker');
        await expect(page.locator('#detectionResult')).toContainText('Robot detected');
    });
    test('Mouse moving human', async ({ page }) => {
        await page.goto('/testing/HumanMovingMouse/');
        await page.click('#startButton');

        await page.mouse.move(0, 0);
        await page.mouse.move(0, 1000);
        await sleep(100);
        await page.mouse.move(1000, 100);
        await page.mouse.move(100, 1000);
        await sleep(100);
        await page.mouse.move(500, 500);

        await page.click('#checker');
        await expect(page.locator('#detectionResult')).toContainText('Human detected');
    });
});
