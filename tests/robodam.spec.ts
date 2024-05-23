import { test, expect } from '@playwright/test';
import { getRandomString } from '../test.data';

test.describe('robodam test', () => {
    test('robodam.com', async ({ page }) => {
        await page.goto('https://robodam.com/#book-demo');
        const acceptButton = page.locator('text="Accept"');
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        }
        await expect(page.locator('//h1')).toContainText('New level of productivity');

        await page.click('//*[contains(text(),"About")]');
        await expect(page.getByText(/Meet the team/i)).toBeVisible();

        await page.click('//*[contains(text(),"Pricing")]');
        const demo = page.locator('//h3[contains(text(),"Demo call")]');
        await expect(demo).toHaveText(/Demo call/);

        await page.click('//*[contains(text(),"Library")]');
        await expect(page.locator('//h1')).toContainText(
            "Dive into our collection of eRobots, showcasing the range of solutions we've already crafted for clients. Discover the possibilities we can bring to you"
        );

        await page.click('//*[contains(text(),"News")]');
        await expect(page.getByText(/Stay updated with our latest insights/i)).toBeVisible();

        await page.click('//*[contains(text(),"Career")]');
        await expect(page.getByText(/Join us on our digital transformation journey/i)).toBeVisible();

        await page.click('//*[contains(text(),"Contacts")]');
        await expect(page.getByText(/Don’t hesitate to contact us anytime/i)).toBeVisible();

        await page.click('//*[contains(text(),"Try")]');
        await expect(page.getByText(/Book a/i)).toBeVisible();
    });
    const email = `${getRandomString(20, 'qwertyuiopasdfghjklzxcvbnm')}@lokalus.lt`;
    test('should be able to login for demo call', async ({ page }) => {
        await page.goto('https://robodam.com/#book-demo');
        const acceptButton = page.locator('text="Accept"');
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        }
        await page.click('//*[contains(text(),"Try")]');

        await page.fill('[name="name"]', 'Vardas');
        await page.fill('[name="company"]', 'Companija');
        await page.fill('[name="phone"]', '1');
        await page.fill('[name="email"]', email);

        await page.click('[type="submit"]');
        await expect(page.getByText(/Booked/i)).toBeVisible();
    });
});
