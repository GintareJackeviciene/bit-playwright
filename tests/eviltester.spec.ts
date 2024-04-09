import { test, expect } from '@playwright/test';

test.describe('click display:none button', () => {
    test(`Force click`, async ({ page }) => {
        await page.goto('https://eviltester.github.io/TestingApp/apps/testwith/version/1/testwith.html');
        await page.fill('#w1lw0', 't');
        await page.fill('#w1lw1', 'e');
        await page.fill('#w1lw2', 's');
        await page.fill('#w1lw3', 't');
        await page.fill('#w2lw0', 'a');
        await page.fill('#w2lw1', 't');
        await page.fill('#w2lw2', 't');
        await page.fill('#w2lw3', 'i');
        await page.fill('#w2lw4', 't');
        await page.fill('#w2lw5', 'u');
        await page.fill('#w2lw6', 'd');
        await page.fill('#w2lw7', 'e');
        //await page.click('//button[text()="Header"]', { force: true });
        await page.locator('//button[text()="Header"]').dispatchEvent('click');
        await expect(page.locator('#result')).toContainText('I t.e.s.t with a.t.t.i.t.u.d.e');
        await page.locator('//button[text()="Render"]').dispatchEvent('click');
        await expect(page.locator('#canvas')).toBeVisible();
    });
});
