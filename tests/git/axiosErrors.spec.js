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

test.describe('toimitus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/toimitus');
        await expect(page.getByText('Yhteysongelma sijainnissa /toimitus')).not.toBeVisible();
    });
});

test.describe('taustatietoa', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/taustatietoa');
        await expect(page.getByText('Yhteysongelma sijainnissa /taustatietoa')).not.toBeVisible();
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

test.describe('rekisteroidy', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy');
        await expect(page.getByText('Yhteysongelma sijainnissa /rekisteroidy')).not.toBeVisible();
    });
});

test.describe('rekisteroidykayttaja', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/kayttaja');
        await expect(page.getByText('Yhteysongelma sijainnissa /rekisteroidy/kayttaja')).not.toBeVisible();
    });
});

test.describe('rekisteroidylocation', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/toimipaikka');
        await expect(page.getByText('Yhteysongelma sijainnissa /rekisteroidy/toimipaikka')).not.toBeVisible();
    });
});

test.describe('ohjeet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet');
        await expect(page.getByText('Yhteysongelma sijainnissa /ohjeet')).not.toBeVisible();
    });
});

test.describe('ohjeetukk', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/ukk');
        await expect(page.getByText('Yhteysongelma sijainnissa /ohjeet/ukk')).not.toBeVisible();
    });
});

test.describe('ohjeettili', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tili');
        await expect(page.getByText('Yhteysongelma sijainnissa /ohjeet/tili')).not.toBeVisible();
    });
});

test.describe('ohjeettilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tilaus');
        await expect(page.getByText('Yhteysongelma sijainnissa /ohjeet/tilaus')).not.toBeVisible();
    });
});

test.describe('ohjeetnouto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/nouto');
        await expect(page.getByText('Yhteysongelma sijainnissa /ohjeet/nouto')).not.toBeVisible();
    });
});

test.describe('ohjeetpyorat', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/pyorat');
        await expect(page.getByText('Yhteysongelma sijainnissa /ohjeet/pyorat')).not.toBeVisible();
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
        await page.goto('/varasto/tilaus/4127');
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
