import { test, expect } from '@playwright/test';
import { sleep } from '../test.data';

test.describe('ping pong spec', () => {
    test('should be able see Game Over! Your score:0,', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/PingPong/');
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain('Game Over! Your score: 0');
            await dialog.accept();
        });
        await page.click('#startButton');
        await sleep(3000);
    });
    test('should be able see that ball is moving', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/PingPong/');
        await page.click('#startButton');

        const A = await page.$eval('#ball', (ball) => {
            return ball.style.left;
        });
        await sleep(1000);
        const B = await page.$eval('#ball', (ball) => {
            return ball.style.left;
        });

        expect(A).not.toEqual(B);
    });
});
