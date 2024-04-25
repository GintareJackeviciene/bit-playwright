import { test, expect } from '@playwright/test';
import { shuffle } from '../test.data';

test.describe.configure({ mode: 'serial' });
//naudok 1 freda

test.describe('TicTacToe tests', () => {
    let T = 0;
    let O = 0;
    let X = 0;
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
            expect(dialog.message()).toEqual(`O wins!`);
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
            expect(dialog.message()).toEqual(`It's a tie!`);
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
    for (let i = 0; i < 5; i++) {
        test(`random game number= ${i}`, async ({ page }) => {
            await page.goto('/testing/TicTacToe/');
            let gameOver = false;

            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toMatch(/It's a tie!|O wins!|X wins!/);
                if (dialog.message() == `It's a tie!`) T++;
                if (dialog.message() == 'O wins!') O++;
                if (dialog.message() == 'X wins!') X++;

                console.log('T ===', T);
                console.log('O ===', O);
                console.log('X ===', X);
                gameOver = true;
                await dialog.accept();
            });

            const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            shuffle(positions);

            for (const position of positions) {
                if (gameOver) break;
                await page.click(`//*[@id="${position}"]`);
            }
        });
    }
});
