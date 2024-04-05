import { test, expect } from '@playwright/test';

test.describe('skelbiu.lt test', () => {
    test('skelbiu.lt', async ({ page }) => {
        await page.goto('https://skelbiu.lt/skelbimai/?&keywords=apple');
        await expect(page.locator('body')).toContainText('Greitas, brangus Apple/samsung supirkimas');
        await page.click('//*[@data-item-id="33096553"]');
        await expect(page.locator('//h1[contains(text(),"Greitas, brangus Apple/samsung supirkimas")]')).toBeVisible();
    });
});
