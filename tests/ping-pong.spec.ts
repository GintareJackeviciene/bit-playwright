import { test, expect } from '@playwright/test';

test.describe('ping-pong', () => {
    test('should be able to wait', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/PingPong/');
        await expect(page.locator('//body')).toContainText('Start Game');

        // page.on('dialog', async (dialog) => {
        //     const message = dialog.message();
        //     expect(message).toContain("You've already liked this post!");
        //     await dialog.accept();
        // });

        // await page.click('#demo1');
        // await page.click('#demo1');
    });
});
