import { test, expect } from '@playwright/test';

test.describe('The Mysterious Black Box', () => {
    test('testCase 0', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/BlackBox/');

        await page.fill('#userInput', ' ');
        await page.click('//button');
        await expect(page.locator('#result')).toContainText('0');
    });
    test('testCase 5', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/BlackBox/');

        await page.fill('#userInput', 'aaaaa');
        await page.click('//button');
        await expect(page.locator('#result')).toContainText('5');
    });
    test('testCase 10', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/BlackBox/');

        await page.fill('#userInput', 'aaaaaaaaaa');
        await page.click('//button');
        await expect(page.locator('#result')).toContainText('10');
    });
    test('testCase 100', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/BlackBox/');

        await page.fill(
            '#userInput',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        );
        await page.click('//button');
        await expect(page.locator('#result')).toContainText('100');
    });
    test('testCase 1000', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/BlackBox/');

        await page.fill(
            '#userInput',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        );
        await page.click('//button');
        await expect(page.locator('#result')).toContainText('1000');
    });
});
