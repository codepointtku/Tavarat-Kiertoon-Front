import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('//*[@id="root"]/header/div[2]/div/div[2]/button[2]');
    await page.click('//*[@id="root"]/header/div[2]/div/div[2]/button[2]');
    await page.click('text=Varasto');
});

test.describe('order detail view', () => {
    test('open order', async ({ page }) => {
        await page.click('text=4127');
        await expect(page.getByText('Tuotenimi')).toBeVisible();
    });
    test('open collapsible table', async ({ page }) => {
        await page.click('text=4127');
        await page.click('//*[@id="root"]/main/div/table/tbody/tr[1]/td[1]/button');
        await expect(page.getByText('5679')).toBeVisible();
    });
    test('close collapsible table', async ({ page }) => {
        await page.click('text=4127');
        await page.click('//*[@id="root"]/main/div/table/tbody/tr[1]/td[1]/button');
        await page.click('//*[@id="root"]/main/div/table/tbody/tr[1]/td[1]/button');
        await expect(page.getByText('5679')).not.toBeVisible();
    });
    test('next page', async ({ page }) => {
        await page.click('text=4127');
        await page.click('button[aria-label="next page"]');
        await expect(page.getByText('6–9 of 9')).toBeVisible();
    });
});
