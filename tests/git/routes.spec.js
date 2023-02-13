import { test, expect } from '@playwright/test';

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByText('Etsimääsi sijaintia /')).not.toBeVisible();
    });
});

// needs to be changed when errorelement is present
test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('tuotteet/4321');
        await expect(page.getByText('Etsimääsi sijaintia /tuotteet/4321')).not.toBeVisible();
    });
});

test.describe('faq', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/faq');
        await expect(page.getByText('Etsimääsi sijaintia /faq')).not.toBeVisible();
    });
});

test.describe('toimitus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/toimitus');
        await expect(page.getByText('Etsimääsi sijaintia /toimitus')).not.toBeVisible();
    });
});

test.describe('backgroundinfo', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/backgroundinfo');
        await expect(page.getByText('Etsimääsi sijaintia /backgroundinfo')).not.toBeVisible();
    });
});

test.describe('stats', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/stats');
        await expect(page.getByText('Etsimääsi sijaintia /stats')).not.toBeVisible();
    });
});

test.describe('tiedotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tiedotteet');
        await expect(page.getByText('Etsimääsi sijaintia /tiedotteet')).not.toBeVisible();
    });
});

test.describe('signup', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/signup');
        await expect(page.getByText('Etsimääsi sijaintia /signup')).not.toBeVisible();
    });
});

test.describe('signupuser', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/signup/user');
        await expect(page.getByText('Etsimääsi sijaintia /signup/user')).not.toBeVisible();
    });
});

test.describe('signuplocation', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/signup/location');
        await expect(page.getByText('Etsimääsi sijaintia /signup/location')).not.toBeVisible();
    });
});

test.describe('contactpage', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/contactpage');
        await expect(page.getByText('Etsimääsi sijaintia /contactpage')).not.toBeVisible();
    });
});

test.describe('varasto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto');
        await expect(page.getByText('Etsimääsi sijaintia /varasto')).not.toBeVisible();
    });
});

test.describe('tilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/tilaus/4127?page=0&rows=5');
        await expect(page.getByText('Etsimääsi sijaintia /tilaus/4127')).not.toBeVisible();
    });
});

test.describe('luo', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/luo');
        await expect(page.getByText('Etsimääsi sijaintia /varasto/luo')).not.toBeVisible();
    });
});

test.describe('koodinlukija', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/koodinlukija');
        await expect(page.getByText('Etsimääsi sijaintia /varasto/koodinlukija')).not.toBeVisible();
    });
});

test.describe('admin', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin');
        await expect(page.getByText('Etsimääsi sijaintia /admin')).not.toBeVisible();
    });
});

test.describe('users', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/users');
        await expect(page.getByText('Etsimääsi sijaintia /admin/users')).not.toBeVisible();
    });
});

test.describe('user', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/users/0');
        await expect(page.getByText('Etsimääsi sijaintia /admin/users/0')).not.toBeVisible();
    });
});

test.describe('hakemukset', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/hakemukset');
        await expect(page.getByText('Etsimääsi sijaintia /admin/hakemukset')).not.toBeVisible();
    });
});

test.describe('pdf', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/pdf/0');
        await expect(page.getByText('Etsimääsi sijaintia /varasto/pdf/0')).not.toBeVisible();
    });
});

test.describe('fail-test', () => {
    test('fail-test', async ({ page }) => {
        await page.goto('/test/failing');
        await expect(page.getByText('Etsimääsi sijaintia /test/failing')).toBeVisible();
    });
});
