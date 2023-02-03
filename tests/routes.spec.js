import { test, expect } from '@playwright/test';

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});

// needs to be changed when errorelement is present
test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('tuotteet/4321');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});

test.describe('faq', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/faq');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});

test.describe('delivery', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/delivery');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});

test.describe('backgroundinfo', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/backgroundinfo');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});

test.describe('stats', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/stats');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});

test.describe('tiedotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tiedotteet');
        await expect(page.getByText('404 Not Found')).not.toBeVisible();
    });
});
