import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('storage view', () => {
    test('initial', async ({ page }) => {
        await page.goto('/varasto');
        await expect(page.getByText('Tilaus (ID)')).toBeVisible();
    });
    test('next page', async ({ page }) => {
        await page.goto('/varasto');
        await page.click('button[aria-label="next page"]');
        await expect(page.getByText('6–10 of 12')).toBeVisible();
    });
    test('last page', async ({ page }) => {
        await page.goto('/varasto');
        await page.click('button[aria-label="last page"]');
        await page.locator('tr').first().waitFor();
        // console.log(await page.locator('tr').count());
        await ((await expect(page.locator('tr').count())) === 5);
    });
});
