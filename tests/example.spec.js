import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('/ page', () => {
    test('should have Header text', async ({ page }) => {
        await expect(page.getByText('Header')).toBeVisible();
    });
});

test.describe('tavaratkiertoon page', () => {
    test('should have Tavarat Kiertoon text', async ({ page }) => {
        await page.goto('/tavaratkiertoon');
        await expect(page.getByText('Tavarat Kiertoon')).toBeVisible();
    });
});
