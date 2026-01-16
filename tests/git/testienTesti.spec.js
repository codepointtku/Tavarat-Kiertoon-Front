import { test, expect } from '@playwright/test';

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/nothinghere');
        await expect(page.getByText('Jokin meni pieleen')).toBeVisible();
    });
});
