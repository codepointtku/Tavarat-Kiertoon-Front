import { test, expect } from '@playwright/test';

test('bikesIndividualBikes', async ({ page }) => {
    await page.goto('http://localhost:3000/pyorat/pyoravarasto/pyoralista');
    await page.getByRole('link', { name: 'Lisää uusi pyörä' }).click();
    await page.getByRole('row', { name: 'Nimi: Vaihda pyörämalli ​ ​' }).getByRole('cell', { name: 'Nimi:' }).click();
    await page.getByRole('button', { name: 'Vaihda pyörämalli ​' }).click();
    await page.getByRole('option', { name: 'Todella hieno pyörä' }).click();
    await page.getByRole('row', { name: 'Merkki: Woom' }).getByRole('cell').nth(2).click();
    await page.getByLabel('Muokkaa runkonumeroa *').click();
    await page.getByLabel('Muokkaa runkonumeroa *').fill('123123');
    await page.getByLabel('Muokkaa Numeroa *').click();
    await page.getByLabel('Muokkaa Numeroa *').fill('123123123');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Valitse pyörän tila AVAILABLE' }).click();
    await page.getByRole('option', { name: 'MAINTENANCE' }).click();
    await page.getByRole('button', { name: 'Valitse pyörän tila MAINTENANCE' }).click();
    await page.getByRole('option', { name: 'RENTED' }).click();
    await page.getByRole('button', { name: 'Valitse pyörän tila RENTED' }).click();
    await page.getByRole('option', { name: 'RETIRED' }).click();
    await page.getByRole('button', { name: 'Valitse pyörän tila RETIRED' }).click();
    await page.getByRole('option', { name: 'AVAILABLE' }).click();
    await page.getByRole('button', { name: 'Vaihda varasto ​' }).click();
    await page.getByRole('option', { name: 'Kahvivarasto' }).click();
    await page.getByText('Varasto XKahvivarastoPieni varasto').click();
    await page.getByRole('button', { name: 'Vaihda varasto Kahvivarasto' }).click();
    await page.getByRole('option', { name: 'Pieni varasto' }).click();
    await page.getByRole('button', { name: 'Vaihda varasto Pieni varasto' }).click();
    await page.getByRole('option', { name: 'Varasto X' }).click();
    await page.getByRole('button', { name: 'Tallenna muutokset ja palaa listaan' }).click();
    await page
        .getByRole('row', { name: 'Woom 14″ Sähkö Vihreä 123123 Muokkaa' })
        .getByRole('link', { name: 'Muokkaa' })
        .click();
    await page.getByRole('button', { name: 'Vaihda varasto Varasto X' }).click();
    await page.getByRole('option', { name: 'Kahvivarasto' }).click();
    await page.getByRole('button', { name: 'Tallenna muutokset ja palaa listaan' }).click();
    await page
        .getByRole('row', { name: 'Woom 14″ Sähkö Vihreä 123123 Muokkaa' })
        .getByRole('link', { name: 'Muokkaa' })
        .click();
    await page.getByRole('link', { name: 'Palaa pyörälistaan tallentamatta' }).click();
    await page
        .getByRole('row', { name: 'Woom 14″ Sähkö Vihreä 123123 Muokkaa' })
        .getByRole('link', { name: 'Muokkaa' })
        .click();
    await page.getByRole('button', { name: 'Poista tämä pyörä' }).click();
    await page.getByRole('button', { name: 'Poista' }).click();
});
