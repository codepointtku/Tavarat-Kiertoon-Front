import { test, expect } from '@playwright/test';

//

// --- Defaultview route tests

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        test.setTimeout(120000);
        await page.goto('/');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('tuotteet/4321');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('toimitus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/toimitus');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('taustatietoa', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/taustatietoa');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('tilastot', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tilastot');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('tiedotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tiedotteet');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('rekisteroidy', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('rekisteroidykayttaja', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/kayttaja');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('rekisteroidytoimipaikka', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/toimipaikka');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('ohjeet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('ohjeetukk', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/ukk');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('ohjeettili', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tili');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('ohjeettilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tilaus');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('ohjeetnouto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/nouto');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('ohjeetpyorat', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/pyorat');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('otayhteytta', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/otayhteytta');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('passwordreset', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/salasananpalautus');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('passwordresetsuccessful', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/salasananpalautus/salasanapalautettu');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('linkexpired', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/salasananpalautus/linkexpired');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('pwdresetsession', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/salasananpalautus/asd/das');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('emailchange', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/sahkopostinvaihto');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

//

// --- Storageview route tests

test.describe('varasto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('tilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/tilaus/4127');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('luo', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/luo');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('koodinlukija', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/koodinlukija');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('pdf', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/pdf/0');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('fail', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/asd/asd/asd');
        await expect(page.getByText('ei valitettavasti löydy')).toBeVisible();
    });
});

//

// -- Adminview route tests

test.describe('admin', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admintilastot', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/tilastot');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admintilauslista', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/tilaukset');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admin-uusi-tilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/tilaukset/uusi');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('kayttajat', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/kayttajat');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('kayttaja', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/kayttajat/0');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('hakemukset', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/hakemukset');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('luotiedote', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tiedotteet/luo');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('arrived', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/saapuneet');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admintiedotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tiedotteet');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('muokkaatiedotetta', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tiedotteet/2/muokkaa');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admin-emailrecipients', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset/sahkopostilista');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admin-orderslist', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admin-createorder', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset/uusi');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admin-productslist', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tuotteet');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('admin-createproduct', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset/uusi');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

//

// --- Bike route tests

test.describe('bikes', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

// bike tests
test.describe('bike-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('bike-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaa/1');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('bike-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaa');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

// bike model tests
test.describe('bike-model-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyoramallit');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('bike-model-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaapyoramalli/1');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('bike-model-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaapyoramalli');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

// bike packet tests
test.describe('bike-packet-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyorapaketit');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('bike-packet-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaapaketti/1');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

test.describe('bike-packet-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaapaketti');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});

// bike orders tests
test.describe('bike-orders', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyoratilaukset');
        await expect(page.getByText('ei valitettavasti löydy')).not.toBeVisible();
    });
});
