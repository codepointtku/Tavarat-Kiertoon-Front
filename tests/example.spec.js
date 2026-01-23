import { test, expect } from '@playwright/test';
/*
test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('/ page', () => {
    test('should have Header text', async ({ page }) => {
        await expect(page.getByText('Header')).toBeVisible();
    });
});

test.describe('tavaratkiertoon page', () => {
    test('should have Tavarat Kiertoon text', async ({ page }) => {
        await page.goto('/tavaratkiertoon');
        await expect(page.getByText('Tavarat Kiertoon')).toBeVisible();
    });
}); */
test("mocks a fruit and doesn't call api", async ({ page }) => {
    // Mock the api call before navigating
    await page.route('http://localhost:8000/contacts/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify([
                {
                    id: 1,
                    first_name: 'Matti',
                    last_name: 'Meikäläinen',
                    email: 'matti.meikalainen@example.com',
                },
            ]),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/colors/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify([
                {
                    id: 7,
                    name: 'Punainen',
                    default: true,
                },
            ]),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/categories/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify([
                {
                    id: 50,
                    product_count: 2986,
                    name: 'Huonekalut',
                    lft: 1,
                    rght: 38,
                    tree_id: 1,
                    level: 0,
                    parent: null,
                },
                {
                    id: 51,
                    product_count: 1011,
                    name: 'Tuolit',
                    lft: 2,
                    rght: 11,
                    tree_id: 1,
                    level: 1,
                    parent: 50,
                },
            ]),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/categories/tree/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify({
                1: [3, 4, 6, 7],
                2: [3, 4],
                3: [3],
                4: [4],
                5: [6, 7],
                6: [6],
                7: [7],
                8: [10],
                9: [10],
                10: [10],
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/shopping_cart/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify({
                id: 1,
                product_items: [],
                date: '2026-01-13T12:24:31.113Z',
                user: 1,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/users/login/refresh/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify({
                message: 'string',
                username: 'string',
                groups: ['string'],
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    });

    await page.route('http://localhost:8000/products/?category=72', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify({
                count: 123,
                next: 'http://api.example.org/accounts/?page=4',
                previous: 'http://api.example.org/accounts/?page=2',
                results: [
                    {
                        id: 0,
                        pictures: [
                            {
                                id: 0,
                                picture_address: 'string',
                            },
                        ],
                        amount: 0,
                        total_amount: 0,
                        category_name: 'string',
                        colors: [
                            {
                                id: 7,
                                name: 'Punainen',
                                default: true,
                            },
                        ],
                        name: 'string',
                        price: 0,
                        free_description: 'string',
                        measurements: 'string',
                        weight: 0,
                        category: 0,
                    },
                ],
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/products/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify({
                count: 123,
                next: 'http://localhost:8000/products/?page=3',
                previous: 'http://localhost:8000/products/?page=1',
                results: [
                    {
                        id: 5093,
                        pictures: [
                            {
                                id: 26,
                                picture_address: 'pictures/1718282964.140753.jpg',
                            },
                            {
                                id: 29,
                                picture_address: 'pictures/1718282964.545753.jpg',
                            },
                        ],
                        amount: 17,
                        total_amount: 23,
                        category_name: 'Sekalaiset',
                        colors: [
                            {
                                id: 7,
                                name: 'Punainen',
                                default: true,
                            },
                            {
                                id: 8,
                                name: 'Sininen',
                                default: true,
                            },
                        ],
                        name: 'Niittijuttukone',
                        price: 0,
                        free_description: 'Se mil voi niitata paperei yhteen',
                        measurements: '',
                        weight: 0,
                        category: 72,
                    },
                ],
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    });

    await page.route('http://localhost:8000/shopping_cart/available_amount/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify([]),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/bulletins/', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify([]),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/pausestore/today', async (route) => {
        return route.fulfill({
            status: 200,
            body: JSON.stringify([]),
            headers: { 'Content-Type': 'application/json' },
        });
    });
    await page.route('http://localhost:8000/products/5093/', async (route) => {
        return route.fulfill({
            status: 200,
            // We have full control over the response body, as well as the
            // status and headers.
            body: JSON.stringify({
                id: 5093,
                pictures: [
                    { id: 26, picture_address: 'pictures/1718282964.140753.jpg' },
                    { id: 29, picture_address: 'pictures/1718282964.545753.jpg' },
                ],
                amount: 17,
                total_amount: 23,
                name: 'Niittijuttukone',
                price: 0.0,
                free_description: 'Se mil voi niitata paperei yhteen',
                measurements: '',
                weight: 0.0,
                category: 72,
                colors: [7, 8],
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
    // Go to the page
    await page.goto('http://localhost:3000/tuotteet/5093');
    await page.getByRole('button', { name: 'Sulje' }).click();
    // Assert that the Niittijuttukone is visible
    await expect(page.getByText('Niittijuttukone')).toBeVisible();
});
