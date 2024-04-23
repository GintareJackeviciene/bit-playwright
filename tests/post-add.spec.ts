import { test, expect } from '@playwright/test';

test.describe('post your AD specs', () => {
    test('should be to able to post your AD', async ({ page }) => {
        await page.goto('/testing/ad/');
        await page.fill('#title', 'pavadinimas');
        await page.fill('#description', 'labai grazu aprasymas');
        await page.fill('#price', '999999.99');
        await page.fill('#email', 'jonas@jonas.lt');
        await page.fill('#address', 'Jaunimo 7, Vilnius');
        await page.getByText('Post Ad').click();
        await expect(page.locator('#message')).toContainText('Ad posted successfully with price: 999999.98 EUR');

        await expect(page.locator('#adsList')).toContainText('pavadinimas');
        await expect(page.locator('#adsList')).toContainText('labai grazu aprasymas');
        await expect(page.locator('#adsList')).toContainText('999999.98');
        await expect(page.locator('#adsList')).toContainText('jonas@jonas.lt');
        await expect(page.locator('#adsList')).toContainText('Jaunimo 7, Vilnius');
    });
});
