// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//     await page.goto('http://localhost:3000/');
//     await page.goto('http://localhost:3000/pyorat');
//     await page.goto('http://localhost:3000/pyorat/pyoravarasto');
//     await page.getByRole('heading', { name: 'Polkupyörien vuokraus' }).click();
//     await page.getByRole('link', { name: 'Kaikki Polkupyörät Kaikki saatavilla olevat polkupyörät' }).click();
//     await page.getByRole('button', { name: 'Etusivu' }).click();
//     await page.getByRole('link', { name: 'Kaikki pyörät' }).click();
//     await page.getByRole('link', { name: 'Pyörämallit' }).click();
//     await page.getByRole('link', { name: 'Pyörätilaukset' }).click();
//     await page.getByRole('link', { name: 'Pyöräpaketit' }).click();
//     await page.getByRole('button', { name: 'Etusivu' }).click();
//     await page.getByRole('link', { name: 'Pyöräpaketit Pyöräpakettien muokkaus.' }).click();
//     await page.getByRole('button', { name: 'Etusivu' }).click();
//     await page.getByRole('link', { name: 'Kaikki Polkupyörät Kaikki saatavilla olevat polkupyörät' }).click();
//     await page.getByRole('button', { name: 'Etusivu' }).click();
//     await page.getByRole('link', { name: 'Pyörien mallit Kaikkien saatavilla olevat pyörien mallit' }).click();
//     await page.getByRole('button', { name: 'Etusivu' }).click();
//     await page.getByRole('link', { name: 'Pyörätilaukset Pyörien varaukset ja toimitukset.' }).click();
//     await page.getByRole('button', { name: 'Etusivu' }).click();
//     await page.getByRole('link', { name: 'Kaikki pyörät' }).click();
//     await page.getByRole('link', { name: 'Lisää uusi pyörä' }).click();
//     await page.getByRole('link', { name: 'Palaa pyörälistaan tallentamatta' }).click();
//     await page.locator('div').filter({ hasText: 'Lisää uusi pyörä' }).nth(4).click();
//     await page
//         .locator('div')
//         .filter({ hasText: 'MerkkiKokoTyyppiVäriVarattupakettiinRunkonumeroMuokkaaWoom14″SähköVihreä59754483' })
//         .nth(4)
//         .click();
//     await page.locator('tr:nth-child(3) > td:nth-child(5)').click();
//     await page.locator('tr:nth-child(2) > td:nth-child(5)').click();
//     await page.getByRole('link', { name: 'Pyörämallit' }).click();
//     await page.getByRole('link', { name: 'Muokkaa' }).nth(3).click();
//     await page.locator('div:nth-child(3)').first().click();
//     await page.getByLabel('Nimi *').click();
//     await page.getByRole('button', { name: 'Väri Sininen' }).click();
//     await page.getByRole('option', { name: 'Punainen' }).click();
//     await page
//         .locator('div')
//         .filter({ hasText: 'EtusivuKaikki pyörätPyörämallitPyörätilauksetPyöräpaketitMuokkaa pyörämalliaVaih' })
//         .nth(2)
//         .click();
//     await page.locator('#bikes-navbar-container').click();
//     await page
//         .locator('div')
//         .filter({ hasText: 'EtusivuKaikki pyörätPyörämallitPyörätilauksetPyöräpaketitPolkupyörien vuokrausKa' })
//         .nth(2)
//         .dblclick();
//     await page.getByText('EtusivuKaikki pyörätPyörämallitPyörätilauksetPyöräpaketitPolkupyörien vuokrausKa').click();
//     await page.getByText('EtusivuKaikki pyörätPyörämallitPyörätilauksetPyöräpaketitPolkupyörien vuokrausKa').click();
//     await page
//         .getByRole('group', { name: 'navigation link buttons' })
//         .getByRole('link', { name: 'Pyörätilaukset' })
//         .click();
//     await page.getByRole('link', { name: 'Pyöräpaketit' }).click();
//     await page
//         .getByRole('row', { name: '1 Päiväkoti -paketti Muokkaa' })
//         .getByRole('link', { name: 'Muokkaa' })
//         .click();
//     await page.locator('#bikes-navbar-container').click();
//     await page.getByRole('link', { name: 'Pyöräpaketit' }).click();
//     await page
//         .getByRole('row', { name: '1 Päiväkoti -paketti Muokkaa' })
//         .getByRole('link', { name: 'Muokkaa' })
//         .click();
//     await page
//         .locator('#bike-view-stack div')
//         .filter({ hasText: 'Nimi:Kuvaus:16″ pyöriä 7 kpl, 14″ pyöriä 3 kpl, potkupyöriä 10 kpl, pyöräilykypä' })
//         .nth(2)
//         .click();
//     await page.getByRole('row', { name: 'Nimi: ​' }).getByRole('cell').nth(2).click();
//     await page.locator('textarea[name="packetName"]').click();
//     await page.getByText('16″ pyöriä 7 kpl, 14″ pyöriä 3 kpl, potkupyöriä 10 kpl, pyöräilykypäriä 20 kpl, ').click();
//     await page.getByRole('cell', { name: 'Sähkö' }).click();
//     await page.getByRole('cell', { name: 'Todella hieno pyörä' }).click();
//     await page.getByRole('cell', { name: 'Vihreä' }).click();
//     await page.getByRole('cell', { name: 'Todella hieno pyörä' }).click();
//     await page.getByRole('cell', { name: '14″' }).click();
//     await page
//         .getByRole('row', { name: 'Pyörät: Woom 1 Vihreä Sähkö Todella hieno pyörä 14″' })
//         .getByRole('button')
//         .first()
//         .click();
//     await page.getByRole('cell', { name: '0' }).getByRole('button').nth(1).click();
//     await page.getByRole('cell', { name: 'Woom' }).click();
//     await page.getByRole('button', { name: 'Valitse malli Todella hieno pyörä' }).click();
//     await page.getByRole('option', { name: 'Wow pyörä' }).click();
//     await page.getByRole('button', { name: 'Valitse malli Wow pyörä' }).click();
//     await page.getByRole('option', { name: 'Ruosteinen pyörä' }).click();
//     await page.getByRole('button', { name: 'Valitse malli Ruosteinen pyörä' }).click();
//     await page.getByRole('option', { name: 'Ruosteinen pyörä' }).click();
//     await page.getByRole('button', { name: 'Valitse malli Ruosteinen pyörä' }).click();
//     await page.getByRole('option', { name: 'asd' }).click();
//     await page.getByRole('button', { name: 'Lisää pyörä' }).click();
//     await page.getByRole('row', { name: 'asd 1 Sininen mummo asd 100"' }).getByRole('button').nth(1).click();
//     await page.getByRole('button', { name: 'Tallenna' }).click();
//     await page.getByRole('link', { name: 'Uusi paketti' }).click();
//     await page.getByRole('cell', { name: 'Nimi:' }).click();
//     await page.locator('textarea[name="packetName"]').click();
//     await page.locator('textarea[name="packetName"]').fill('111122223333');
//     await page.locator('textarea[name="packetDescription"]').click();
//     await page.locator('textarea[name="packetDescription"]').fill('333322221111');
//     await page.getByRole('button', { name: 'Valitse malli Todella hieno pyörä' }).click();
//     await page.locator('#menu- div').first().click();
//     await page.getByRole('button', { name: 'Lisää pyörä' }).click();
//     await page.getByText('Nimi:Kuvaus:333322221111 Pyörät: Woom1VihreäSähköTodella hieno pyörä14″Valitse m').click();
//     await page.getByText('Valitse malliTodella hieno pyöräValitse malli *Lisää pyörä').click();
//     await page.getByRole('button', { name: 'Valitse malli Todella hieno pyörä' }).click();
//     await page.getByRole('option', { name: 'Wow pyörä' }).click();
//     await page.getByRole('button', { name: 'Lisää pyörä' }).click();
//     await page.getByRole('button', { name: 'Valitse malli Wow pyörä' }).click();
//     await page.getByRole('option', { name: 'Ruosteinen pyörä' }).click();
//     await page.getByRole('button', { name: 'Lisää pyörä' }).click();
//     await page.getByRole('button', { name: 'Valitse malli Ruosteinen pyörä' }).click();
//     await page.getByRole('option', { name: 'asd' }).click();
//     await page.getByRole('button', { name: 'Lisää pyörä' }).click();
//     await page.getByRole('button', { name: 'Tallenna' }).click();
//     await page.getByRole('row', { name: '12 111122223333 Muokkaa' }).getByRole('link', { name: 'Muokkaa' }).click();
//     await page.getByRole('button', { name: 'Poista paketti' }).click();
//     await page.getByText('Oletko varma että haluat poistaa tämän paketin?PeruutaPoista').click();
//     await page.getByRole('heading', { name: 'Oletko varma että haluat poistaa tämän paketin?' }).click();
//     await page.getByText('PeruutaPoista').click();
//     await page.getByRole('button', { name: 'Poista' }).click();
//     await page.locator('html').click();
//     await page
//         .locator('div')
//         .filter({ hasText: 'Jokin meni pieleenYhteysongelma sijainnissa /pyorat/pyoravarasto/muokkaapaketti/' })
//         .nth(1)
//         .click();
//     await page.getByRole('button', { name: 'Takaisin' }).click();
//     await page.goto('http://localhost:3000/pyorat/pyoravarasto/muokkaapaketti');
//     await page.getByRole('link', { name: 'Pyöräpaketit' }).click();
//     await page.getByRole('link', { name: 'Uusi paketti' }).click();
//     await page.getByRole('row', { name: 'Nimi: ​' }).locator('div').nth(1).click();
//     await page.locator('textarea[name="packetName"]').fill('sdsadsa');
//     await page.locator('textarea[name="packetName"]').click();
//     await page.locator('textarea[name="packetDescription"]').click();
//     await page.locator('textarea[name="packetDescription"]').fill('fdsafdsaf');
//     await page.getByRole('button', { name: 'Lisää pyörä' }).click();
//     await page.getByRole('button', { name: 'Tallenna' }).click();
//     await page.locator('#header-container').click();
//     await page.getByRole('heading', { name: 'Tavarat Kiertoon' }).click();
//     await page.locator('#header-container div').nth(3).click();
//     await page
//         .locator('div')
//         .filter({ hasText: 'EtusivuKaikki pyörätPyörämallitPyörätilauksetPyöräpaketitUusi pakettiIDPaketin n' })
//         .nth(2)
//         .click();
//     await page.getByRole('row', { name: '14 sdsadsa Muokkaa' }).getByRole('cell', { name: 'Muokkaa' }).click();
//     await page.getByRole('cell', { name: 'sdsadsa' }).click();
//     await page
//         .getByRole('row', { name: '1 Päiväkoti -paketti Muokkaa' })
//         .getByRole('cell', { name: 'Muokkaa' })
//         .click();
//     await page.getByRole('cell', { name: 'Päiväkoti -paketti' }).click();
//     await page.getByRole('columnheader', { name: 'Paketin nimi' }).click();
//     await page.getByRole('columnheader', { name: 'Muokkaa' }).click();
//     await page.getByText('Uusi pakettiIDPaketin nimiMuokkaa 1 Päiväkoti -paketti Muokkaa 14 sdsadsa Muokka').click();
//     await page.getByText('EtusivuKaikki pyörätPyörämallitPyörätilauksetPyöräpaketitUusi pakettiIDPaketin n').click();
//     await page.getByRole('row', { name: '14 sdsadsa Muokkaa' }).getByRole('link', { name: 'Muokkaa' }).click();
//     await page.getByRole('button', { name: 'Poista paketti' }).click();
//     await page.getByRole('button', { name: 'Poista' }).click();
// });
