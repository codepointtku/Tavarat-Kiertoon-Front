import { Page } from '@playwright/test';

export async function setupComprehensiveMocks(page: Page) {
    const baseUrl = 'http://localhost:8000';

    // Helper function to create mock response
    const mockResponse = (data: any, status = 200) => ({
        status,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });

    // Bikes endpoints
    await page.route(`${baseUrl}/bikes/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(`${baseUrl}/bikes/brand/`, async (route) => {
        if (route.request().method() === 'GET') {
            return route.fulfill(mockResponse([]));
        }
        return route.fulfill(mockResponse({}));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/brand/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/bikes/models/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/models/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/bikes/packageamounts/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(`${baseUrl}/bikes/packages/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/packages/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/bikes/rental/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/rental/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/bikes/size/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/size/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/bikes/stock/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/stock/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/bikes/trailermodels/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/trailermodels/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/bikes/trailers/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/trailers/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/bikes/type/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bikes/type/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Bulletins
    await page.route(`${baseUrl}/bulletins/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/bulletins/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Categories
    await page.route(`${baseUrl}/categories/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/categories/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/categories/tree/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Colors
    await page.route(`${baseUrl}/colors/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/colors/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Contact forms
    await page.route(`${baseUrl}/contact_forms/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/contact_forms/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Contacts
    await page.route(`${baseUrl}/contacts/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/contacts/\\d+`), async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Orders
    await page.route(`${baseUrl}/orders/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/orders/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/orders/emailrecipients/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/orders/emailrecipients/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/orders/stat/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/orders/user/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });

    // Pausestore
    await page.route(`${baseUrl}/pausestore/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/pausestore/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/pausestore/today/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(`${baseUrl}/pausestore/today`, async (route) => {
        return route.fulfill(mockResponse([]));
    });

    // Pictures
    await page.route(`${baseUrl}/pictures/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/pictures/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Products
    await page.route(`${baseUrl}/products/`, async (route) => {
        return route.fulfill(
            mockResponse({
                count: 0,
                next: null,
                previous: null,
                results: [],
            })
        );
    });
    await page.route(new RegExp(`${baseUrl}/products/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(new RegExp(`${baseUrl}/products/\\d+/add/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(new RegExp(`${baseUrl}/products/\\d+/retire/`), async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/products/\\d+/return/`), async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(`${baseUrl}/products/items/`, async (route) => {
        return route.fulfill(
            mockResponse({
                count: 0,
                next: null,
                previous: null,
                results: [],
            })
        );
    });
    await page.route(new RegExp(`${baseUrl}/products/items/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/products/transfer/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });

    // Schema
    await page.route(`${baseUrl}/schema/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Shopping cart
    await page.route(`${baseUrl}/shopping_cart/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/shopping_cart/available_amount/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(`${baseUrl}/shopping_carts/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });

    // Storages
    await page.route(`${baseUrl}/storages/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/storages/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/storages/products/`, async (route) => {
        return route.fulfill(
            mockResponse({
                count: 0,
                next: null,
                previous: null,
                results: [],
            })
        );
    });

    // User
    await page.route(`${baseUrl}/user/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/user/address/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/user/address/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/user/searchwatch/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(new RegExp(`${baseUrl}/user/searchwatch/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Users
    await page.route(`${baseUrl}/users/`, async (route) => {
        return route.fulfill(
            mockResponse({
                count: 0,
                next: null,
                previous: null,
                results: [],
            })
        );
    });
    await page.route(new RegExp(`${baseUrl}/users/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(new RegExp(`${baseUrl}/users/\\d+/bike_groups/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(new RegExp(`${baseUrl}/users/\\d+/groups/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/activate/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/address/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(new RegExp(`${baseUrl}/users/address/\\d+/`), async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/bike_users/`, async (route) => {
        return route.fulfill(
            mockResponse({
                count: 0,
                next: null,
                previous: null,
                results: [],
            })
        );
    });
    await page.route(`${baseUrl}/users/create/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/emailchange/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/emailchange/finish/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/groups/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });
    await page.route(`${baseUrl}/users/log/`, async (route) => {
        return route.fulfill(
            mockResponse({
                count: 0,
                next: null,
                previous: null,
                results: [],
            })
        );
    });
    await page.route(`${baseUrl}/users/login/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/login/refresh/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/logout/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/password/reset/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });
    await page.route(`${baseUrl}/users/password/resetemail/`, async (route) => {
        return route.fulfill(mockResponse({}));
    });

    // Specific mocks with data
    await page.route(`${baseUrl}/contacts/`, async (route) => {
        return route.fulfill(
            mockResponse([
                {
                    id: 1,
                    first_name: 'Matti',
                    last_name: 'Meikäläinen',
                    email: 'matti.meikalainen@example.com',
                },
            ])
        );
    });

    await page.route(`${baseUrl}/colors/`, async (route) => {
        return route.fulfill(
            mockResponse([
                {
                    id: 7,
                    name: 'Punainen',
                    default: true,
                },
            ])
        );
    });

    await page.route(`${baseUrl}/categories/`, async (route) => {
        return route.fulfill(
            mockResponse([
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
            ])
        );
    });

    await page.route(`${baseUrl}/categories/tree/`, async (route) => {
        return route.fulfill(
            mockResponse({
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
            })
        );
    });

    await page.route(`${baseUrl}/shopping_cart/`, async (route) => {
        return route.fulfill(
            mockResponse({
                id: 1,
                product_items: [],
                date: '2026-01-13T12:24:31.113Z',
                user: 1,
            })
        );
    });

    await page.route(`${baseUrl}/users/login/refresh/`, async (route) => {
        return route.fulfill(
            mockResponse({
                message: 'string',
                username: 'string',
                groups: ['string'],
            })
        );
    });

    await page.route(`${baseUrl}/products/?category=72`, async (route) => {
        return route.fulfill(
            mockResponse({
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
            })
        );
    });

    await page.route(`${baseUrl}/products/`, async (route) => {
        return route.fulfill(
            mockResponse({
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
            })
        );
    });

    await page.route(`${baseUrl}/shopping_cart/available_amount/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });

    await page.route(`${baseUrl}/bulletins/`, async (route) => {
        return route.fulfill(mockResponse([]));
    });

    await page.route(`${baseUrl}/products/?page_size=25`, async (route) => {
        return route.fulfill(
            mockResponse({
                count: 0,
                next: null,
                previous: null,
                results: [],
            })
        );
    });

    await page.route(`${baseUrl}/products/5093/`, async (route) => {
        return route.fulfill(
            mockResponse({
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
            })
        );
    });
}
