// enable these only after back-end is working

/* import { test, expect } from '@playwright/test';

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        test.setTimeout(120000)
        await page.goto('/');
        await expect(page.getByText('Yhteysongelma sijainnissa /')).not.toBeVisible();
    });
});

test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('tuotteet/4321');
        await expect(page.getByText('Yhteysongelma sijainnissa /tuotteet/4321')).not.toBeVisible();
    });
});

test.describe('faq', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/faq');
        await expect(page.getByText('Yhteysongelma sijainnissa /faq')).not.toBeVisible();
    });
});

test.describe('toimitus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/toimitus');
        await expect(page.getByText('Yhteysongelma sijainnissa /toimitus')).not.toBeVisible();
    });
});

test.describe('backgroundinfo', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/backgroundinfo');
        await expect(page.getByText('Yhteysongelma sijainnissa /backgroundinfo')).not.toBeVisible();
    });
});

test.describe('stats', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/stats');
        await expect(page.getByText('Yhteysongelma sijainnissa /stats')).not.toBeVisible();
    });
});

test.describe('tiedotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tiedotteet');
        await expect(page.getByText('Yhteysongelma sijainnissa /tiedotteet')).not.toBeVisible();
    });
});

test.describe('signup', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/signup');
        await expect(page.getByText('Yhteysongelma sijainnissa /signup')).not.toBeVisible();
    });
});

test.describe('signupuser', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/signup/user');
        await expect(page.getByText('Yhteysongelma sijainnissa /signup/user')).not.toBeVisible();
    });
});

test.describe('signuplocation', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/signup/location');
        await expect(page.getByText('Yhteysongelma sijainnissa /signup/location')).not.toBeVisible();
    });
});

test.describe('otayhteytta', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/otayhteytta');
        await expect(page.getByText('Yhteysongelma sijainnissa /otayhteytta')).not.toBeVisible();
    });
});

test.describe('varasto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto');
        await expect(page.getByText('Yhteysongelma sijainnissa /varasto')).not.toBeVisible();
    });
});

test.describe('tilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/tilaus/4127?page=0&rows=5');
        await expect(page.getByText('Yhteysongelma sijainnissa /tilaus/4127')).not.toBeVisible();
    });
});

test.describe('luo', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/luo');
        await expect(page.getByText('Yhteysongelma sijainnissa /varasto/luo')).not.toBeVisible();
    });
});

test.describe('koodinlukija', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/koodinlukija');
        await expect(page.getByText('Yhteysongelma sijainnissa /varasto/koodinlukija')).not.toBeVisible();
    });
});

test.describe('admin', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin');
        await expect(page.getByText('Yhteysongelma sijainnissa /admin')).not.toBeVisible();
    });
});

test.describe('users', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/users');
        await expect(page.getByText('Yhteysongelma sijainnissa /admin/users')).not.toBeVisible();
    });
});

test.describe('user', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/users/0');
        await expect(page.getByText('Yhteysongelma sijainnissa /admin/users/0')).not.toBeVisible();
    });
});

test.describe('hakemukset', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/hakemukset');
        await expect(page.getByText('Yhteysongelma sijainnissa /admin/hakemukset')).not.toBeVisible();
    });
});

test.describe('pdf', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/pdf/0');
        await expect(page.getByText('Yhteysongelma sijainnissa /varasto/pdf/0')).not.toBeVisible();
    });
});

test.describe('fail-test', () => {
    test('fail-test', async ({ page }) => {
        await page.goto('/test/failing');
        await expect(page.getByText('Yhteysongelma sijainnissa /test/failing')).not.toBeVisible();
    });
}); */
