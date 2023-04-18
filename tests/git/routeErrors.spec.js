import { test, expect } from '@playwright/test';

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        test.setTimeout(120000);
        await page.goto('/');
        await expect(page.getByText('Etsimääsi sijaintia /')).not.toBeVisible();
    });
});

test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('tuotteet/4321');
        await expect(page.getByText('Etsimääsi sijaintia /tuotteet/4321')).not.toBeVisible();
    });
});

test.describe('toimitus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/toimitus');
        await expect(page.getByText('Etsimääsi sijaintia /toimitus')).not.toBeVisible();
    });
});

test.describe('taustatietoa', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/taustatietoa');
        await expect(page.getByText('Etsimääsi sijaintia /backgroundinfo')).not.toBeVisible();
    });
});

test.describe('tilastot', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tilastot');
        await expect(page.getByText('Etsimääsi sijaintia /tilastot')).not.toBeVisible();
    });
});

test.describe('tiedotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tiedotteet');
        await expect(page.getByText('Etsimääsi sijaintia /tiedotteet')).not.toBeVisible();
    });
});
test.describe('luotiedote', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tiedotteet/luo');
        await expect(page.getByText('Etsimääsi sijaintia /admin/tiedotteet/luo')).not.toBeVisible();
    });
});

test.describe('rekisteroidy', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy');
        await expect(page.getByText('Etsimääsi sijaintia /signup')).not.toBeVisible();
    });
});

test.describe('rekisteroidykayttaja', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/kayttaja');
        await expect(page.getByText('Etsimääsi sijaintia /signup/user')).not.toBeVisible();
    });
});

test.describe('rekisteroidytoimipaikka', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/toimipaikka');
        await expect(page.getByText('Etsimääsi sijaintia /signup/location')).not.toBeVisible();
    });
});

test.describe('ohjeet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet');
        await expect(page.getByText('Etsimääsi sijaintia /ohjeet')).not.toBeVisible();
    });
});

test.describe('ohjeetukk', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/ukk');
        await expect(page.getByText('Etsimääsi sijaintia /ohjeet/ukk')).not.toBeVisible();
    });
});

test.describe('ohjeettili', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tili');
        await expect(page.getByText('Etsimääsi sijaintia /ohjeet/tili')).not.toBeVisible();
    });
});

test.describe('ohjeettilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tilaus');
        await expect(page.getByText('Etsimääsi sijaintia /ohjeet/tilaus')).not.toBeVisible();
    });
});

test.describe('ohjeetnouto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/nouto');
        await expect(page.getByText('Etsimääsi sijaintia /ohjeet/nouto')).not.toBeVisible();
    });
});

test.describe('ohjeetpyorat', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/pyorat');
        await expect(page.getByText('Etsimääsi sijaintia /ohjeet/pyorat')).not.toBeVisible();
    });
});

test.describe('otayhteytta', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/otayhteytta');
        await expect(page.getByText('Etsimääsi sijaintia /otayhteytta')).not.toBeVisible();
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

test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/tuotteet');
        await expect(page.getByText('Etsimääsi sijaintia /varasto/tuotteet')).not.toBeVisible();
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

test.describe('fail', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/asd/asd/asd');
        await expect(page.getByText('Etsimääsi sijaintia /varasto/asd/asd/asd')).toBeVisible();
    });
});

test.describe('bikes', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat');
        await expect(page.getByText('Etsimääsi sijaintia /pyorat')).not.toBeVisible();
    });
});
test.describe('bikewarehouse', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto');
        await expect(page.getByText('Etsimääsi sijaintia /pyorat/pyoravarasto')).not.toBeVisible();
    });
});
test.describe('bikeorder', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyoratilaukset');
        await expect(page.getByText('Etsimääsi sijaintia /pyorat/pyoravarasto/pyoratilaukset')).not.toBeVisible();
    });
});
test.describe('bikepackets', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyorapaketit');
        await expect(page.getByText('Etsimääsi sijaintia /pyorat/pyoravarasto/pyorapaketit')).not.toBeVisible();
    });
});
