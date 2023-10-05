import { test, expect } from '@playwright/test';

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        test.setTimeout(120000);
        await page.goto('/');
        await expect(page.getByText('Virhe sijainnissa /')).not.toBeVisible();
    });
});

test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('tuotteet/4321');
        await expect(page.getByText('Virhe sijainnissa /tuotteet/4321')).not.toBeVisible();
    });
});

test.describe('taustatietoa', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/taustatietoa');
        await expect(page.getByText('Virhe sijainnissa /taustatietoa')).not.toBeVisible();
    });
});

test.describe('tilastot', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tilastot');
        await expect(page.getByText('Virhe sijainnissa /tilastot')).not.toBeVisible();
    });
});

test.describe('tiedotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tiedotteet');
        await expect(page.getByText('Virhe sijainnissa /tiedotteet')).not.toBeVisible();
    });
});

test.describe('rekisteroidy', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy');
        await expect(page.getByText('Virhe sijainnissa /rekisteroidy')).not.toBeVisible();
    });
});

test.describe('rekisteroidykayttaja', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/kayttaja');
        await expect(page.getByText('Virhe sijainnissa /rekisteroidy/kayttaja')).not.toBeVisible();
    });
});

test.describe('rekisteroidytoimipaikka', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/toimipaikka');
        await expect(page.getByText('Virhe sijainnissa /rekisteroidy/toimipaikka')).not.toBeVisible();
    });
});

test.describe('kirjaudu', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/kirjaudu');
        await expect(page.getByText('Virhe sijainnissa /kirjaudu')).not.toBeVisible();
    });
});

test.describe('ohjeet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet');
        await expect(page.getByText('Virhe sijainnissa /ohjeet')).not.toBeVisible();
    });
});

test.describe('ohjeetukk', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/ukk');
        await expect(page.getByText('Virhe sijainnissa /ohjeet/ukk')).not.toBeVisible();
    });
});

test.describe('ohjeettili', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tili');
        await expect(page.getByText('Virhe sijainnissa /ohjeet/tili')).not.toBeVisible();
    });
});

test.describe('ohjeettilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tilaus');
        await expect(page.getByText('Virhe sijainnissa /ohjeet/tilaus')).not.toBeVisible();
    });
});

test.describe('ohjeetnouto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/nouto');
        await expect(page.getByText('Virhe sijainnissa /ohjeet/nouto')).not.toBeVisible();
    });
});

test.describe('ohjeetpyorat', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/pyorat');
        await expect(page.getByText('Virhe sijainnissa /ohjeet/pyorat')).not.toBeVisible();
    });
});

test.describe('otayhteytta', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/otayhteytta');
        await expect(page.getByText('Virhe sijainnissa /otayhteytta')).not.toBeVisible();
    });
});

test.describe('varasto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto');
        await expect(page.getByText('Virhe sijainnissa /varasto')).not.toBeVisible();
    });
});

test.describe('tilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/tilaus/4127');
        await expect(page.getByText('Virhe sijainnissa /tilaus/4127')).not.toBeVisible();
    });
});

test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/tuotteet');
        await expect(page.getByText('Virhe sijainnissa /varasto/tuotteet')).not.toBeVisible();
    });
});

test.describe('koodinlukija', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/koodinlukija');
        await expect(page.getByText('Virhe sijainnissa /varasto/koodinlukija')).not.toBeVisible();
    });
});

test.describe('admin', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin');
        await expect(page.getByText('Virhe sijainnissa /admin')).not.toBeVisible();
    });
});

test.describe('kayttajat', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/kayttajat');
        await expect(page.getByText('Virhe sijainnissa /admin/kayttajat')).not.toBeVisible();
    });
});

test.describe('kayttaja', () => {
    test('no errors', async ({ page }) => {
        await page.goto('admin/kayttajat/0');
        await expect(page.getByText('Virhe sijainnissa /admin/kayttajat/0')).not.toBeVisible();
    });
});

test.describe('hakemukset', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/hakemukset');
        await expect(page.getByText('Virhe sijainnissa /admin/hakemukset')).not.toBeVisible();
    });
});

test.describe('pdf', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/pdf/0');
        await expect(page.getByText('Virhe sijainnissa /varasto/pdf/0')).not.toBeVisible();
    });
});

test.describe('fail-test', () => {
    test('fail-test', async ({ page }) => {
        await page.goto('/test/failing');
        await expect(page.getByText('Virhe sijainnissa /test/failing')).not.toBeVisible();
    });
});

test.describe('luotiedote', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tiedotteet/luo');
        await expect(page.getByText('Virhe sijainnissa /admin/tiedotteet/luo')).not.toBeVisible();
    });
});

test.describe('admin-emailrecipientslist', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset/sahkopostilista');
        await expect(page.getByText('Virhe sijainnissa /admin/tilaukset/sahkopostilista')).not.toBeVisible();
    });
});

test.describe('admin-orderslist', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset');
        await expect(page.getByText('Virhe sijaintia /admin/tilaukset')).not.toBeVisible();
    });
});

// test.describe('admin-singleorderview', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/tilaukset');
//         await expect(page.getByText('Virhe sijaintia /admin/tilaukset/1')).not.toBeVisible();
//     });
// });

test.describe('admin-createorder', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset/uusi');
        await expect(page.getByText('Virhe sijaintia /admin/tilaukset/uusi')).not.toBeVisible();
    });
});

test.describe('admin-productslist', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tuotteet');
        await expect(page.getByText('Virhe sijaintia /admin/tuotteet')).not.toBeVisible();
    });
});

// test.describe('admin-singleproductview', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/tuotteet/1');
//         await expect(page.getByText('Virhe sijaintia /admin/tuotteet/1')).not.toBeVisible();
//     });
// });

test.describe('admin-createproduct', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset/uusi');
        await expect(page.getByText('Virhe sijaintia /admin/tuotteet/uusi')).not.toBeVisible();
    });
});

/*
 *  Bike tests
 *      /pyorat
 *      /pyorat/pyoravarasto
 *      /pyorat/pyoravarasto/pyoratilaukset
 *      /pyorat/pyoravarasto/pyorapaketit
 *    ( /pyorat/pyoravarasto/muokkaa => /pyorat/pyoravarasto ) : no test yet
 *      /pyorat/pyoravarasto/muokkaa/0
 *      /pyorat/pyoravarasto/lisaa
 *      /pyorat/pyoravarasto/pyoramallit
 *    ( /pyorat/pyoravarasto/muokkaapyoramalli => pyorat/pyoravarasto/pyoramallit ) : no test yet
 *      /pyorat/pyoravarasto/muokkaapyoramalli/0
 *      /pyorat/pyoravarasto/lisaapyoramalli
 */
test.describe('bikes', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat');
        await expect(page.getByText('Virhe sijainnissa /pyorat')).not.toBeVisible();
    });
});
// bike tests
test.describe('bike-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto')).not.toBeVisible();
    });
});
test.describe('bike-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaa/1');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/pyorapaketit/1')).not.toBeVisible();
    });
});
test.describe('bike-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaa');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/lisaa')).not.toBeVisible();
    });
});
// bike model tests
test.describe('bike-model-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyoramallit');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/pyoramallit')).not.toBeVisible();
    });
});
test.describe('bike-model-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaapyoramalli/1');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/muokkaapyoramalli/1')).not.toBeVisible();
    });
});
test.describe('bike-model-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaapyoramalli');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/lisaapyoramalli')).not.toBeVisible();
    });
});
// bike packet tests
test.describe('bike-packet-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyorapaketit');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/pyorapaketit')).not.toBeVisible();
    });
});
test.describe('bike-packet-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaapaketti/1');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/muokkaapaketti/1')).not.toBeVisible();
    });
});
test.describe('bike-packet-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaapaketti');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/lisaapaketti')).not.toBeVisible();
    });
});
// bike orders tests
test.describe('bike-orders', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyoratilaukset');
        await expect(page.getByText('Virhe sijainnissa /pyorat/pyoravarasto/pyoratilaukset')).not.toBeVisible();
    });
});

/*
 *
 */
