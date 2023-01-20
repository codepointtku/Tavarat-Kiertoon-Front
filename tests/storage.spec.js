import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('//*[@id="root"]/div[1]/div/div[2]/button[2]');
    await page.click('//*[@id="root"]/div[1]/div/div[1]/a[2]');
});

test.describe('storage view', () => {
    test('initial', async ({ page }) => {
        await expect(page.getByText('Tilaus (ID)')).toBeVisible();
    });
    test('next page', async ({ page }) => {
        await page.click('button[aria-label="next page"]');
        await expect(page.getByText('6–10 of 12')).toBeVisible();
    });
    test('last page', async ({ page }) => {
        await page.click('button[aria-label="last page"]');
        await expect(page.getByText('11–12 of 12')).toBeVisible();
    });
    test('10 rows per page', async ({ page }) => {
        await page.locator('select[aria-label="rows per page"]').selectOption({ label: '10' });
        await expect(page.getByText('1–10 of 12')).toBeVisible();
    });
    test('all rows', async ({ page }) => {
        await page.locator('select[aria-label="rows per page"]').selectOption({ label: 'All' });
        await expect(page.getByText('1–12 of 12')).toBeVisible();
    });
});
