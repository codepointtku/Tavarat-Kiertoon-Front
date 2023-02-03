import { test, expect } from '@playwright/test';

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});

test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tuotteet');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});
