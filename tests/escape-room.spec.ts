import { test, expect } from '@playwright/test';

test.describe('Code Escape Room', () => {
    test('should be', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/EscapeRoom/');

        const parameter = [
            ['1', "var greeting = 'Hello, world!';"],
            ['2', 'function isEven(num) { return num % 2 == 0; }'],
            ['3', 'string'],
            ['4', '200'],
            ['5', "expect(contact.firstName).toEqual('Jonas');"],
            ['6', 'const contact = new Contacts();'],
            ['7', 'httpOnly: true'],
            ['8', 'secure: true'],
            ['9', '//button[@data-tid="add-contacts-button"]'],
            ['10', '404']
        ];
        for (const testCase of parameter) {
            await page.fill(`#answer${testCase[0]}`, testCase[1]);
            await page.click(`#button${testCase[0]}`);
            await expect(page.locator(`#result${testCase[0]}`)).toContainText('Correct! The box is unlocked.');
        }
    });
});

// test.describe('Code Escape Room', () => {
//     test('should be box unlocked.', async ({ page }) => {
//         await page.goto('https://testingmarathon.com/testing/EscapeRoom/');
//         await page.fill('#answer1', "var greeting = 'Hello, world!';");
//         await page.click('#button1');
//         await expect(page.locator('#result1')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer2', 'function isEven(num) { return num % 2 == 0; }');
//         await page.click('#button2');
//         await expect(page.locator('#result2')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer3', 'string');
//         await page.click('#button3');
//         await expect(page.locator('#result3')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer4', '200');
//         await page.click('#button4');
//         await expect(page.locator('#result4')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer5', "expect(contact.firstName).toEqual('Jonas');");
//         await page.click('#button5');
//         await expect(page.locator('#result5')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer6', 'const contact = new Contacts();');
//         await page.click('#button6');
//         await expect(page.locator('#result6')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer7', 'httpOnly: true');
//         await page.click('#button7');
//         await expect(page.locator('#result7')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer8', 'secure: true');
//         await page.click('#button8');
//         await expect(page.locator('#result8')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer9', '//button[@data-tid="add-contacts-button"]');
//         await page.click('#button9');
//         await expect(page.locator('#result9')).toContainText('Correct! The box is unlocked.');

//         await page.fill('#answer10', '404');
//         await page.click('#button10');
//         await expect(page.locator('#result10')).toContainText('Correct! The box is unlocked.');
//     });
// });
