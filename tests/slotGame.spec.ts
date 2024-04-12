import { test, expect } from '@playwright/test';

// test.describe('slot machine game spec', () => {
//     test('should be able to win', async ({ page }) => {
//         await page.goto('https://testingmarathon.com/testing/slot_machine_game/');

//         await expect
//             .poll(
//                 async () => {
//                     await page.click('#spinButton');
//                     return await page.textContent('#result');
//                 },
//                 {
//                     timeout: 15_000
//                 }
//             )
//             .toEqual('You win!');
//     });
//     test('should be able to loose', async ({ page }) => {
//         await page.goto('https://testingmarathon.com/testing/slot_machine_game/');

//         await expect
//             .poll(
//                 async () => {
//                     await page.click('#spinButton');
//                     return await page.textContent('#result');
//                 },
//                 {
//                     timeout: 15_000
//                 }
//             )
//             .toEqual('Try again!');
//     });
// });
const parameter = [['You win!'], ['Try again!']];

for (const name of parameter) {
    test(`should be able to ${name[0]}`, async ({ page }) => {
        console.log('{parameter[0] ===', parameter[0]);
        console.log('{parameter[1] ===', parameter[1]);
        await page.goto('https://testingmarathon.com/testing/slot_machine_game/');
        await expect
            .poll(
                async () => {
                    await page.click('#spinButton');
                    return await page.textContent('#result');
                },
                {
                    timeout: 20_000
                }
            )
            .toEqual(name[0]);
    });
}
