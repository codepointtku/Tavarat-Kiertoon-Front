import { test, expect } from '@playwright/test';

// const testText: string = 'Jokin meni pieleen';
const testText: string = 'Etsimääsi sijaintia';
// const testText: string = 'ei valitettavasti löydy';

// const adminErrorBoundaryText: string = 'Hetkinen, sanoi Putkinen';

//

// --- Defaultview route tests

test.describe('mainpage', () => {
    test('no errors', async ({ page }) => {
        test.setTimeout(120000);
        await page.goto('/');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('tuotteet/4321');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('taustatietoa', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/taustatietoa');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('tilastot', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tilastot');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('tiedotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tiedotteet');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('kirjaudu', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/kirjaudu');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('rekisteroidy', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('rekisteroidykayttaja', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/kayttaja');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('rekisteroidytoimipaikka', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/rekisteroidy/toimipaikka');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('ohjeet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('ohjeetukk', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/ukk');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('ohjeettili', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tili');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('ohjeettilaus', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/tilaus');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('ohjeetnouto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/nouto');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('ohjeetpyorat', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/ohjeet/pyorat');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('otayhteytta', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/otayhteytta');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('passwordreset', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/salasananpalautus');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('passwordresetsuccessful', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/salasananpalautus/salasanapalautettu');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('linkexpired', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/salasananpalautus/linkexpired');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('pwdresetsession', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/salasananpalautus/asd/das');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('emailchange', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/sahkopostinvaihto');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

//

// --- Storageview route tests

test.describe('varasto', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('varasto tilaukset', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/tilaukset/16');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('varasto tuotteet', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/tuotteet');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('varasto luo', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/tuotteet/luo');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('varasto koodinlukija', () => {
    test('no errors', async ({ page }) => {
        await page.goto('varasto/koodinlukija');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('varasto pdf', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/pdf/0');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('varasto fail', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/varasto/asd/asd/asd');
        await expect(page.getByText(`${testText}`)).toBeVisible();
    });
});

//

// -- Adminview route tests

test.describe('admin', () => {
    test('admin root path', async ({ page }) => {
        await page.goto('/admin');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('admin statspage', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilastot');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// orders
test.describe('admin orderlist', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// test.describe('admin order view', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/tilaukset/16');
//         await expect(page.getByText('Tilausnumeroa ei löytynyt.')).not.toBeVisible();
//     });
// });

// test.describe('admin order edit', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/tilaukset/16');
//         await expect(page.getByText('Tilausnumeroa ei löytynyt.')).not.toBeVisible();
//     });
// });

// test.describe('admin order delete', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/tilaukset/16/poista');
//         await expect(page.getByText('Tilausnumeroa ei löytynyt.')).not.toBeVisible();
//     });
// });

test.describe('admin order email recipients', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tilaukset/sahkopostilista');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// products
test.describe('admin products list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tuotteet');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('admin product color managing', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tuotteet/varit');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('admin product categories managing', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tuotteet/kategoriat');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// users
test.describe('admin users list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/kayttajat');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('admin single user view', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/kayttajat/1');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('admin user address edit', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/kayttajat/1/osoitteet/1');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('admin user address create', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/kayttajat/1/osoitteet/luo');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// storages
test.describe('admin storages list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/varastot');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// test.describe('admin single storage view', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/varastot/1');
//         await expect(page.getByText(`${testText}`)).not.toBeVisible();
//     });
// });

// test.describe('admin storage delete not available', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/varastot/8/poista');
//         await expect(page.getByText('Toiminto on estetty, koska varastoon on liitetty tuotteita.')).toBeVisible();
//     });
// });

// add this when seed data contains a storage with no products related to it
// test.describe('admin storage delete view', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/varastot/8/poista');
//         await expect(page.getByText(`${testText}`)).not.toBeVisible();
//     });
// });

// test.describe('admin products transfer view', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/varastot/8/siirto');
//         await expect(page.getByText(`${testText}`)).not.toBeVisible();
//     });
// });

test.describe('admin storage create', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/varastot/luo');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// bulletins
test.describe('admin bulletins list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tiedotteet');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// test.describe('admin bulletin edit', () => {
//     test('no errors', async ({ page }) => {
//         await page.goto('/admin/tiedotteet/2/muokkaa');
//         await expect(page.getByText(`${testText}`)).not.toBeVisible();
//     });
// });

test.describe('admin bulletin create', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/tiedotteet/luo');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// contact form messages / mailbox
test.describe('admin inbox', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/admin/viestit');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

//

// --- Bike route tests

test.describe('bikes', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// bike tests
test.describe('bike-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('bike-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaa/1');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('bike-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaa');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// bike model tests
test.describe('bike-model-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyoramallit');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('bike-model-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaapyoramalli/1');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('bike-model-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaapyoramalli');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// bike packet tests
test.describe('bike-packet-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyorapaketit');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('bike-packet-modify-1', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/muokkaapaketti/1');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('bike-packet-add-new', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/lisaapaketti');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// bike orders tests
test.describe('bike-rental-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyoratilaukset');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('bike-rental-detail', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/pyoratilaukset/1');
        console.log(page)
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

// bike trailers tests
test.describe('bike-trailers-list', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/pyorat/pyoravarasto/perakarryt');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('user', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tili');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('user active orders', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tili/tilaukset');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('user order history', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tili/tilaushistoria');
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});

test.describe('user search watch', () => {
    test('no errors', async ({ page }) => {
        await page.goto('/tili/hakuvahti');
        console.log(page);
        await expect(page.getByText(`${testText}`)).not.toBeVisible();
    });
});
