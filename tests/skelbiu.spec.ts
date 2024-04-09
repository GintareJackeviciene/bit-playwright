import { test, expect } from '@playwright/test';

test.describe('skelbimu test', () => {
    test('skelbiu.lt', async ({ page }) => {
        await page.goto('https://skelbiu.lt/skelbimai/?&keywords=apple');
        await expect(page.locator('body')).toContainText('Greitas, brangus Apple/samsung supirkimas');
        await page.click('//*[@data-item-id="33096553"]');
        await expect(page.locator('//h1[contains(text(),"Greitas, brangus Apple/samsung supirkimas")]')).toBeVisible();
    });
    test('alio.lt', async ({ page }) => {
        await page.goto('https://www.alio.lt/paieska/apple/?top_search=1');
        await expect(page.locator('body')).toContainText('MacBook Pro 13 (2017) 128 GB i5 8gb');
        await page.click('//*[@id="listviewphotoover_66429213"]');
        await expect(page.locator('//h1')).toContainText('MacBook Pro 13 (2017) 128 GB i5 8gb, Vilnius');
    });
});
