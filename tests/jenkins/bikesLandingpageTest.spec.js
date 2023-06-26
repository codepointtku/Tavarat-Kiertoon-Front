import { test, expect } from '@playwright/test';

test('bikeLandingPageTest', async ({ page }) => {
    await page.goto('http://localhost:3000/pyorat/pyoravarasto');
    await page.getByRole('link', { name: 'Kaikki Pyörät Kaikki saatavilla olevat pyörät' }).click();
    await page.getByRole('button', { name: 'Etusivu' }).click();
    await page.getByRole('link', { name: 'Pyörien mallit Luo, poista ja muokkaa pyörämalleja.' }).click();
    await page.getByRole('button', { name: 'Etusivu' }).click();
    await page.getByRole('link', { name: 'Pyörätilaukset Pyörien varaukset ja toimitukset.' }).click();
    await page.getByRole('button', { name: 'Etusivu' }).click();
    await page.getByRole('link', { name: 'Pyöräpaketit Pyöräpakettien muokkaus.' }).click();
    await page.getByRole('button', { name: 'Etusivu' }).click();
    await page
        .getByRole('group', { name: 'navigation link buttons' })
        .getByRole('link', { name: 'Kaikki pyörät' })
        .click();
    await page.getByRole('link', { name: 'Pyörämallit' }).click();
    await page.getByRole('link', { name: 'Pyöräpaketit' }).click();
});
