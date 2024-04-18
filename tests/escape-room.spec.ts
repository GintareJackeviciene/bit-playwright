import { test, expect } from '@playwright/test';

test.describe('Code Escape Room', () => {
    // test(`should be able to answer question`, async ({ page }) => {
    //     await page.goto('https://testingmarathon.com/testing/EscapeRoom/');

    const parameter = [
        ['1', `var greeting = 'Hello, world!';`],
        ['2', 'function isEven(num) { return num % 2 == 0; }'],
        ['3', 'string'],
        ['4', '200'],
        ['5', `expect(contact.firstName).toEqual('Jonas');`],
        ['6', 'const contact = new Contacts();'],
        ['7', 'httpOnly: true'],
        ['8', 'secure: true'],
        ['9', '//button[@data-tid="add-contacts-button"]'],
        ['10', '404']
    ];
    for (const testCase of parameter) {
        test(`should be able to answer ${testCase} question`, async ({ page }) => {
            await page.addInitScript(() => {
                window.localStorage.setItem('lastSolvedPuzzle', '10');
            });
            await page.goto('https://testingmarathon.com/testing/EscapeRoom/');

            await page.fill(`#answer${testCase[0]}`, testCase[1]);
            await page.click(`#button${testCase[0]}`);
            await expect(page.locator(`#result${testCase[0]}`)).toContainText('Correct! The box is unlocked.');
        });
    }
});
