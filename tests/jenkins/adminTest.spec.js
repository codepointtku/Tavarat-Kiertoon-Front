import { test, expect } from '@playwright/test';

const loginAdmin = async (page) => {
    await page.goto('/');
    await page.locator('#appbar-containing-div').getByRole('button').nth(1).click();
    await page.getByPlaceholder('sinä@turku.fi').click();
    await page.getByPlaceholder('sinä@turku.fi').fill('super');
    await page.getByPlaceholder('****').click();
    await page.getByPlaceholder('****').fill('super');
    await page.getByRole('button', { name: 'Sisään' }).click();
    await page.getByRole('button', { name: 'Sulje' }).click();
};

test.describe('Admin Tests', () => {
    test('Login as admin', async ({ page }) => {
        await loginAdmin(page);
        // replace name: 5 when randomdata updates to non-random
        await expect(page.getByRole('button', { name: 5 })).toBeVisible();
    });
    test('Navigate to adminview', async ({ page }) => {
        await loginAdmin(page);
        // replace this with link when navbar links exist
        await page.goto('/admin');
        await expect(page.getByRole('link', { name: 'Varastot' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Tilaukset' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Käyttäjät' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Hakemukset' })).toBeVisible();
    });
});

export default loginAdmin;
