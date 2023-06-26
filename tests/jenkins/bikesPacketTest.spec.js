import { test, expect } from '@playwright/test';

test('bikePacketTest', async ({ page }) => {
    await page.goto('http://localhost:3000/pyorat/pyoravarasto/pyorapaketit');
    await page.getByRole('link', { name: 'Uusi paketti' }).click();
    await page.locator('textarea[name="packetName"]').click();
    await page.locator('textarea[name="packetName"]').fill('klikkitestipaketti');
    await page.locator('textarea[name="packetName"]').press('Enter');
    await page.locator('textarea[name="packetDescription"]').click();
    await page.locator('textarea[name="packetDescription"]').fill('klikkitestipaketinkuvaus');
    await page.locator('textarea[name="packetDescription"]').press('Enter');
    await page.getByRole('button', { name: 'Lisää pyörä' }).click();
    await page.getByRole('button', { name: 'Valitse malli Todella hieno pyörä' }).click();
    await page.getByRole('option', { name: 'Wow pyörä' }).click();
    await page.getByRole('button', { name: 'Lisää pyörä' }).click();
    await page.getByRole('button', { name: 'Valitse malli Wow pyörä' }).click();
    await page.getByRole('option', { name: 'Ruosteinen pyörä' }).click();
    await page.getByRole('button', { name: 'Lisää pyörä' }).click();
    await page.getByRole('button', { name: 'Valitse malli Ruosteinen pyörä' }).click();
    await page.getByRole('option', { name: 'hackerman' }).click();
    await page.getByRole('button', { name: 'Lisää pyörä' }).click();
    await page
        .getByRole('row', { name: 'Pyörät: Woom 1 Vihreä Sähkö Todella hieno pyörä 14″' })
        .getByRole('button')
        .nth(1)
        .click();
    await page
        .getByRole('row', { name: 'Cannondale 1 Musta Muksubussi Wow pyörä 20″' })
        .getByRole('button')
        .nth(1)
        .click();
    await page
        .getByRole('row', { name: 'Cannondale 1 Sininen Sähkö Ruosteinen pyörä 24″' })
        .getByRole('button')
        .nth(1)
        .click();
    await page.getByRole('row', { name: 'hessuhopo 1 Sininen pieni hackerman iso' }).getByRole('button').nth(1).click();
    await page
        .getByRole('row', { name: 'Pyörät: Woom 2 Vihreä Sähkö Todella hieno pyörä 14″' })
        .getByRole('button')
        .first()
        .click();
    await page.getByRole('row', { name: 'hessuhopo 2 Sininen pieni hackerman iso' }).getByRole('button').nth(2).click();
    await page.getByRole('button', { name: 'Lisää pyörä' }).click();
    await page.getByRole('button', { name: 'Tallenna muutokset ja palaa listaan' }).click();
    await page
        .getByRole('row', { name: '17 klikkitestipaketti Muokkaa' })
        .getByRole('link', { name: 'Muokkaa' })
        .click();
    await page.getByRole('link', { name: 'Palaa pyörälistaan tallentamatta' }).click();
    await page
        .getByRole('row', { name: '17 klikkitestipaketti Muokkaa' })
        .getByRole('link', { name: 'Muokkaa' })
        .click();
    await page.getByRole('button', { name: 'Poista tämä paketti' }).click();
    await page.getByRole('button', { name: 'Poista' }).click();
    await page
        .getByRole('row', { name: '1 Päiväkoti -paketti Muokkaa' })
        .getByRole('link', { name: 'Muokkaa' })
        .click();
    await page.getByRole('link', { name: 'Palaa pyörälistaan tallentamatta' }).click();
});
