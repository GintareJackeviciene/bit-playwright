import { test, expect } from '@playwright/test';

test.describe('Robot or Human spec', () => {
    test('Robot typing', async ({ page }) => {
        await page.goto('/testing/HumanOrRobot/');
        await page.click('#typingInput');
        await page.keyboard.type('As esu robotas');
        await expect(page.locator('#detectionResult')).toContainText('Robot typing detected');
    });
    test('Human typing', async ({ page }) => {
        await page.goto('/testing/HumanOrRobot/');
        await page.click('#typingInput');
        await page.keyboard.type('As', { delay: 5 });
        await page.keyboard.type(' esu', { delay: 50 });
        await page.keyboard.type('robotas', { delay: 100 });
        await expect(page.locator('#detectionResult')).toContainText('Human typing detected');
    });
});
