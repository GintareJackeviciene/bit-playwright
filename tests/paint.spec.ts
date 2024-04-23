import { test, expect } from '@playwright/test';

test.describe('Paint tests', () => {
    test('Should be posible to paint', async ({ page }) => {
        await page.goto('/testing/MiniPaintApp/');
        const canvas = page.locator('#drawingCanvas');
        await canvas.dispatchEvent('mousedown');

        await page.mouse.move(100, 100);
        await page.mouse.move(150, 150);
        await page.mouse.move(200, 200);
        await page.mouse.move(300, 300);
        await page.mouse.move(400, 400);
        await page.mouse.move(500, 500);
        await page.mouse.move(600, 600);
        await page.mouse.move(700, 700);

        await expect(page.locator('#drawingCanvas')).toHaveScreenshot();
    });
    test('Should be posible to clear', async ({ page }) => {
        await page.goto('/testing/MiniPaintApp/');
        const canvas = page.locator('#drawingCanvas');
        await canvas.dispatchEvent('mousedown');

        await page.mouse.move(100, 100);
        await page.mouse.move(150, 150);
        await page.mouse.move(200, 200);
        await page.mouse.move(300, 300);
        await page.mouse.move(400, 400);
        await page.mouse.move(500, 500);
        await page.mouse.move(600, 600);
        await page.mouse.move(700, 700);

        await page.getByText('Clear').click();
        await expect(page.locator('#drawingCanvas')).toHaveScreenshot();
    });
});
