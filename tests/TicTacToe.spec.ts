import { test, expect } from '@playwright/test';

test.describe('TicTacToe tests', () => {
    test('should be able to win  X', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toEqual(`X wins!`);
            await dialog.accept();
        });
        await page.goto('/testing/TicTacToe/');
        await page.click('//*[@id="1"]');
        await page.click('//*[@id="2"]');
        await page.click('//*[@id="4"]');
        await page.click('//*[@id="5"]');
        await page.click('//*[@id="7"]');
    });
    test('should be able to win  0', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain(`O wins!`);
            await dialog.accept();
        });
        await page.goto('/testing/TicTacToe/');
        await page.click('//*[@id="1"]');
        await page.click('//*[@id="2"]');
        await page.click('//*[@id="4"]');
        await page.click('//*[@id="5"]');
        await page.click('//*[@id="6"]');
        await page.click('//*[@id="8"]');
    });
    test('should be able to be tie', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain(`It's a tie!`);
            await dialog.accept();
        });
        await page.goto('/testing/TicTacToe/');
        await page.click('//*[@id="5"]');
        await page.click('//*[@id="1"]');
        await page.click('//*[@id="2"]');
        await page.click('//*[@id="3"]');
        await page.click('//*[@id="4"]');
        await page.click('//*[@id="6"]');
        await page.click('//*[@id="7"]');
        await page.click('//*[@id="8"]');
        await page.click('//*[@id="9"]');
    });
});
