import { test, expect } from '@playwright/test';

test.describe('unsecured session tests', () => {
    test('should be posible to open Tyrion Lannister profile', async ({ page }) => {
        const context = page.context();
        await context.addCookies([{ name: 'session', value: '3', url: 'https://testingmarathon.com' }]);
        await page.goto('https://testingmarathon.com/testing/unsecured_session/');
        await expect(page.locator('#name')).toContainText('Name: Tyrion Lannister');
    });
});
