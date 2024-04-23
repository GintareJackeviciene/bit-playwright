import { test, expect } from '@playwright/test';

test.describe('atm bank tests', () => {
    test('should be able to take money from atm', async ({ page }) => {
        await page.goto('/testing/atm/');
        await page.getByText('Insert Card').click();
        await page.fill('#pinInput', '1234');
        await page.click('//*[text()="Enter"]');

        page.on('dialog', async (dialog) => {
            const message = dialog.message();
            expect(message).toContain(`How much would you like to withdraw?`);
            await dialog.accept('1000');
        });

        await page.getByText('Withdraw').click();
        await expect(page.locator('#screen')).toContainText('Please take your cash. Your new balance is 410 EUR.');
    });
    test('should be able to take money from atm when correct pin entered in last atempt', async ({ page }) => {
        await page.goto('/testing/atm/');
        await page.getByText('Insert Card').click();

        await page.fill('#pinInput', '1111');
        await page.click('//*[text()="Enter"]');
        await page.fill('#pinInput', '1224');
        await page.click('//*[text()="Enter"]');
        await page.fill('#pinInput', '1234');
        await page.click('//*[text()="Enter"]');

        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toEqual(`How much would you like to withdraw?`);
            await dialog.accept('1000');
        });

        await page.getByText('Withdraw').click();
        await expect(page.locator('#screen')).toContainText('Error: BSOD');
    });
});
