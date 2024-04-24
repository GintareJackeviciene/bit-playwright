import { test, expect } from '@playwright/test';

test.describe('Monty Hall Problem Simulator', () => {
    test('should win or loose when pressing first door 2 times', async ({ page }) => {
        await page.goto('/testing/MontyHall/');

        for (let i = 0; i < 1; i++) {
            await page.click('#door1');
            await page.click('#door1');

            const resultText = await page.locator('#message').textContent();
            expect(resultText).toMatch(/Sorry, the prize was behind door|Congratulations! You've found the prize!/);
            await page.getByText('Restart Game').click();
            const wins = await page.locator('#wins').textContent();
            console.log('win ===', wins);
        }
    });
    test('should win or loose when selecting other door', async ({ page }) => {
        await page.goto('/testing/MontyHall/');

        for (let i = 0; i < 100; i++) {
            await page.click('#door1');

            let door: string;
            const text = await page.locator('#message').textContent();
            // sita sakini susplitinam i array ir pasirenkam [1] kad matytumem kurias duris
            //Door 2 is open and empty. Do you want to switch your choice or stick with door 1? (Click again on your final choice)
            const doors = text.split(' ');
            const openDoor = doors[1];
            if (openDoor == '2') {
                door = '#door3';
            } else {
                door = '#door2';
            }

            await page.click(door);

            const resultText = await page.locator('#message').textContent();
            expect(resultText).toMatch(/Sorry, the prize was behind door|Congratulations! You've found the prize!/);
            await page.getByText('Restart Game').click();
            const wins = await page.locator('#wins').textContent();
            console.log('win ===', wins);
        }
    });
});
