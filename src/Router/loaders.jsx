import axios from 'axios';
import { redirect } from 'react-router-dom';

import {
    bikesApi,
    bulletinsApi,
    categoriesApi,
    colorsApi,
    contactFormsApi,
    contactsApi,
    ordersApi,
    productsApi,
    shoppingCartApi,
    storagesApi,
    userApi,
    usersApi,
} from '../api';

/**
 * Get various defaults for the site
 */
const rootLoader = async () => {
    const [{ data: contacts }, { data: colors }, { data: categories }, { data: bulletins }, { data: categoryTree }] =
        await Promise.all([
            contactsApi.contactsList(),
            colorsApi.colorsList(),
            categoriesApi.categoriesList(),
            bulletinsApi.bulletinsList(),
            categoriesApi.categoriesTreeRetrieve(),
            //usersApi.usersLoginRefreshCreate(),
        ]);

    return { contacts, colors, categories, bulletins, categoryTree };
};

/**
 * Get shoppingCart for logged in user
 */
const shoppingCartLoader = async () => {
    // TODO: why not combine these into one call?
    const { data: cart } = await shoppingCartApi.shoppingCartRetrieve();
    const { data: amountList } = await shoppingCartApi.shoppingCartAvailableAmountList();
    // console.log('@shoppingCartLoader, cart.product_items:', cart?.product_items);
    // console.log('@shoppingCartLoader, cart:', cart);

    // /* eslint-disable no-shadow */
    // // // auth check for future
    // // if (auth.user_group === true){...}

    const products = cart?.product_items?.reduce((cartItems, product) => {
        let cartItem = cartItems.find((cartItem) => cartItem.product.id === product.product.id);

        if (!cartItem) {
            cartItem = {
                ...product,
                count: 0,
            };
            cartItems.push(cartItem);
        }

        cartItem.count += 1;
        return cartItems;
    }, []);

    // const products = cart?.product_items;

    return { products, cart, amountList };
};

/**
 * Get all products / get products based on category id || search string
 */
const productListLoader = async ({ request }) => {
    const url = new URL(request.url);

    if (url.searchParams.has('haku') || url.searchParams.has('kategoria')) {
        const { data } = await productsApi.productsList(
            url.searchParams.getAll('kategoria'),
            url.searchParams.getAll('varit'),
            null,
            url.searchParams.get('sivu'),
            url.searchParams.get('sivukoko') || 25,
            url.searchParams.get('haku')
        );
        return data;
    }

    const { data } = await productsApi.productsList(
        null,
        null,
        null,
        url.searchParams.get('sivu'),
        url.searchParams.get('sivukoko') || 25,
        null
    );

    return data;
};

/**
 * Get one product (with product_items)
 */
const productDetailsLoader = async ({ params }) => {
    const { data: product } = await productsApi.productsRetrieve(params.id);
    const { data: products } = await productsApi.productsList(product.category);
    return { product, products };
};

/**
 * Get one product (with product_items), categories and colors, for editing
 */
const productEditLoader = async ({ params }) => {
    const [{ data: storages }, { data: colors }, { data: categories }, { data: product }] = await Promise.all([
        storagesApi.storagesList(),
        colorsApi.colorsList(),
        categoriesApi.categoriesList(),
        productsApi.productsRetrieve(params.id),
    ]);
    return { storages, colors, categories, product };
};

const productAddLoader = async () => {
    const [{ data: storages }, { data: colors }, { data: categories }] = await Promise.all([
        storagesApi.storagesList(),
        colorsApi.colorsList(),
        categoriesApi.categoriesList(),
    ]);
    return { storages, colors, categories };
};
/**
 * Get all orders.
 */
const ordersListLoader = async () => {
    const { data } = await ordersApi.ordersList();

    return data;
};

/**
 * Get one order
 */
const orderViewLoader = async ({ params }) => {
    const response = await ordersApi.ordersRetrieve(params.id);
    return response.data;
};

/**
 * Get one order
 */
const orderEditLoader = async ({ params }) => {
    const { data } = await ordersApi.ordersRetrieve(params.id);
    return data;
};

const emailRecipientsLoader = async () => {
    const { data } = await ordersApi.ordersEmailrecipientsList();
    return data;
};

/**
 * Get all categories and storages
 */
const storageProductsLoader = async ({ request }) => {
    const url = new URL(request.url);

    const [/* { data: storages }, { data: colors }, { data: categories }, */ { data: products }] = await Promise.all([
        //storagesApi.storagesList(),
        //colorsApi.colorsList(),
        //categoriesApi.categoriesList(),
        storagesApi.storagesProductsList(
            // barcode should support partial search
            url.searchParams.get('viivakoodi'),
            url.searchParams.get('kategoria'),
            null,
            url.searchParams.get('sivu'),
            url.searchParams.get('sivukoko')
            // url.searchParams.get('varasto') // alternatively: varasto could be a param, storages/id/products
        ),
    ]);

    return { /* storages, colors, categories, */ products };
};

/**
 * Get all storages
 */
const storagesListLoader = async () => {
    const { data } = await storagesApi.storagesList();
    return data;
};

/**
 * Get all storages data and (available) products relations
 */
const storageEditLoader = async ({ params }) => {
    const [{ data: storageInfo }, { data: hasProducts }, { data: allStorages }] = await Promise.all([
        storagesApi.storagesRetrieve(params.id),
        productsApi.productsItemsList(true, null, null, null, null, null, params.id),
        storagesApi.storagesList(),
    ]);

    return { storageInfo, hasProducts, allStorages };
};

/**
 * Get all storages data and products relations
 */
const productTransferLoader = async ({ params }) => {
    const { data } = await productsApi.productsItemsList(true, null, null, null, null, null, params.id);

    const availableProductsCount = data.count;
    // product count === page size.

    // main call. This data is used at component level.
    const [{ data: storageInfo }, { data: hasProducts }, { data: allStorages }] = await Promise.all([
        storagesApi.storagesRetrieve(params.id),
        productsApi.productsItemsList(true, null, null, availableProductsCount, null, null, params.id),
        storagesApi.storagesList(),
    ]);

    return { storageInfo, hasProducts, allStorages };
};

/**
 * Get all users.
 * Used in src/Components/Admin/UserList.jsx
 */
const usersListLoader = async () => {
    const { data: users } = await usersApi.usersList();
    return users;
};

/**
 * Get one user and all auth groups
 * Used in src/Components/Admin/UserEdit.tsx
 */
const userEditLoader = async ({ params }) => {
    const [{ data: userInfo }, { data: userAuthGroups }] = await Promise.all([
        usersApi.usersRetrieve(params.userid),
        usersApi.usersGroupsList(),
    ]);

    return { userInfo, userAuthGroups };
};

const userAddressEditLoader = async ({ params }) => {
    const [{ data: userData }, { data: addressData }] = await Promise.all([
        await usersApi.usersRetrieve(params.userid),
        await usersApi.usersAddressRetrieve(params.aid),
    ]);
    return { userData, addressData };
};

const userAddressCreateLoader = async ({ params }) => {
    // aka get user loader
    // admin use
    const { data: userData } = await usersApi.usersRetrieve(params.userid);

    return { userData };
};

const addressEditLoader = async ({ params }) => {
    const { data: addressData } = await userApi.userAddressRetrieve(params.aid);

    return { addressData };
};

const searchWatchLoader = async () => {
    try {
        const { data } = await userApi.userSearchwatchList();
        return data;
    } catch {
        return null;
    }
};

/**
 * Get lists of bikes and packets for front page
 *
 * @param {*} auth
 * @param {*} setAuth
 * @returns
 */
const bikesDefaultLoader = async (auth, setAuth) => {
    const { data } = await bikesApi.bikesList();
    return data;
};

/**
 * Get list of all bikes
 *
 * @returns
 */
const bikesListLoader = async (auth, setAuth) => {
    const [{ data: loaderData }, { data: colors }] = await Promise.all([
        bikesApi.bikesStockList(),
        colorsApi.colorsList(),
    ]);
    return { loaderData, colors };
};

/**
 * Get all bikepackets and models
 *
 * @returns
 */
const bikesPacketLoader = async (auth, setAuth) => {
    const [{ data: packet }, { data: models }] = await Promise.all([
        bikesApi.bikesPackagesList(),
        bikesApi.bikesModelsList(),
    ]);

    return { packet, models };
};

/**
 * Get one bikepacket and all models
 *
 * @param {*} params
 * @returns
 */
const modifyBikePacketLoader = async (auth, setAuth, params) => {
    const [{ data: packet }, { data: models }, { data: bikes }] = await Promise.all([
        bikesApi.bikesPackagesRetrieve(params.id),
        bikesApi.bikesModelsList(),
        bikesApi.bikesStockList(),
    ]);
    return { packet, models, bikes };
};

/**
 *
 * @param {*} params
 * @returns
 */
const createBikePacketLoader = async (auth, setAuth, params) => {
    const [{ data: models }, { data: bikes }] = await Promise.all([
        bikesApi.bikesModelsList(),
        bikesApi.bikesStockList(),
    ]);
    const packet = {
        name: '',
        description: '',
        bikes: [],
    };
    return { packet, models, bikes };
};

/**
 * Get information needed to modify a single bike
 *
 * @param {*} params
 * @returns
 */
const modifyBikeLoader = async (auth, setAuth, params) => {
    const [{ data: bikeData }, { data: bikeModelsData }, { data: storagesData }, { data: colors }] = await Promise.all([
        bikesApi.bikesStockRetrieve(params.id),
        bikesApi.bikesModelsList(),
        storagesApi.storagesList(),
        colorsApi.colorsList(),
    ]);
    return { bikeData, bikeModelsData, storagesData, colors };
};

/**
 *
 * @returns
 */
const createNewBikeLoader = async (auth, setAuth) => {
    const [{ data: bikeModelsData }, { data: storagesData }, { data: colors }] = await Promise.all([
        bikesApi.bikesModelsList(),
        storagesApi.storagesList(),
        colorsApi.colorsList(),
    ]);
    // Empty bike to show in the page before information is added
    const bikeData = {
        bike: '',
        frame_number: '',
        number: '',
        package_only: false,
        state: 'AVAILABLE',
        storage: '',
    };
    return { bikeData, bikeModelsData, storagesData, colors };
};

/**
 * Get ALL Bike Models
 *
 * @returns
 */
const bikeModelsLoader = async (auth, setAuth) => {
    const { data } = await bikesApi.bikesModelsList();
    return data;
};

/**
 * Loader for modifying a single bike model
 * Get a single Bike Model based on ID and lists of all colors, brands, types
 * and sizes currently in the database
 *
 * @param {*} params
 * @returns
 */
const bikeSingleModelLoader = async (auth, setAuth, params) => {
    const [{ data: bikeModel }, { data: brands }, { data: types }, { data: sizes }] = await Promise.all([
        bikesApi.bikesModelsRetrieve(params.id),
        bikesApi.bikesBrandList(),
        bikesApi.bikesTypeList(),
        bikesApi.bikesSizeList(),
    ]);
    return {
        bikeModel,
        brands,
        types,
        sizes,
    };
};

/**
 * Loader for new bike model creation
 * Get lists of all colors, brands, types and sizes currently in the database
 * Create an empty model for the new bike (this allows the usage of same page
 * for both bike creation and modification)
 *
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} params
 * @returns
 */
const bikeNewModelLoader = async (auth, setAuth, params) => {
    const [{ data: colors }, { data: brands }, { data: types }, { data: sizes }] = await Promise.all([
        colorsApi.colorsList(),
        bikesApi.bikesBrandList(),
        bikesApi.bikesTypeList(),
        bikesApi.bikesSizeList(),
    ]);

    const bikeModel = {
        name: '',
        description: '',
        type: { id: null, name: '' },
        brand: { id: null, name: '' },
        size: { id: null, name: '' },
        color: { id: null, name: '' },
        picture: { id: null, picture_address: '' },
    };
    return { bikeModel, colors, brands, types, sizes };
};

/**
 * Gets user info for shopping cart process
 */
const shoppingProcessLoader = async () => {
    // const { data: user } = await apiCall(auth, setAuth, '/user/', 'get');
    const { data: user } = await userApi.userRetrieve();
    return user;
};

const adminLoader = async () => {
    // console.log('adminLoader auth', auth);
    // tämä ei toiminut, auth.admin_group oli edelleen true
    // if (auth.admin_group === false) {
    //     return redirect('/');
    // }

    const [{ data: user }, { data: messages }] = await Promise.all([
        userApi
            .userRetrieve()
            // this could be removed if logic is moved to errorBoundary
            .catch((e) => {
                // Todo redirect to admin/login or /login
                return redirect('/kirjaudu');
            }),
        contactFormsApi.contactFormsList(null, null, null, { status: 'Not read' }),
    ]);

    return { user, messages };
};

const adminInboxLoader = async ({ request }) => {
    // const searchParams = new URL(request.url).searchParams;

    // const statusMap = {
    //     Luetut: 'Read',
    //     Lukemattomat: 'Not read',
    //     Hoidetut: 'Handled',
    // };

    // const status = statusMap[searchParams.get('tila')] || null;

    // const { data: messages } = await contactFormsApi.contactFormsList(null, searchParams.get('sivu'), null, status);
    const { data: messages } = await contactFormsApi.contactFormsList(null, null, null, 'Not read');

    return messages;
};

/**
 * bulletins
 */
const adminBulletinsLoader = async () => {
    const { data: bulletins } = await bulletinsApi.bulletinsList();
    return { bulletins };
};

const adminBulletinLoader = async ({ params }) => {
    const { data: bulletin } = await bulletinsApi.bulletinsRetrieve(params.id);
    return { bulletin };
};

const createBulletinLoader = async () => {
    const { data: user } = await userApi.userRetrieve();
    return { user };
};

/* get logged in users data and user orders*/

const userInfoLoader = async (request) => {
    // const searchParams = new URL(request.url).searchParams;
    // const statusMap = {
    //     Aktiivinen: ['Waiting', 'Processing'],
    //     Odottaa: 'Waiting',
    //     Käsitellään: 'Processing',
    //     Toimitettu: 'Finished',
    // };
    // const orderingMap = {
    //     Uusinensin: '-creation_date',
    //     Vanhinensin: 'creation_date',
    //     Normaalitilanmukaan: 'status',
    //     Käänteinentilanmukaan: '-status',
    // };

    // const status = statusMap[searchParams.get('tila')] || null;
    // const ordering = orderingMap[searchParams.get('järjestys') || null];

    const [{ data: userInfo }, { data: userOrders }] = await Promise.all([
        userApi.userRetrieve().catch(() => {
            return redirect('/');
        }),
        ordersApi.ordersUserList().catch(() => {
            return redirect('/');
        }),
    ]);

    return { userInfo, userOrders };
};

export {
    bikesPacketLoader,
    rootLoader,
    productListLoader,
    productDetailsLoader,
    productEditLoader,
    productAddLoader,
    productTransferLoader,
    ordersListLoader,
    orderViewLoader,
    orderEditLoader,
    storageProductsLoader,
    storagesListLoader,
    storageEditLoader,
    usersListLoader,
    userEditLoader,
    userAddressEditLoader,
    userAddressCreateLoader,
    userInfoLoader,
    searchWatchLoader,
    bikesDefaultLoader,
    bikesListLoader,
    modifyBikeLoader,
    createNewBikeLoader,
    bikeModelsLoader,
    bikeSingleModelLoader,
    shoppingCartLoader,
    shoppingProcessLoader,
    adminLoader,
    adminInboxLoader,
    emailRecipientsLoader,
    modifyBikePacketLoader,
    bikeNewModelLoader,
    createBikePacketLoader,
    adminBulletinsLoader,
    adminBulletinLoader,
    createBulletinLoader,
    addressEditLoader,
};
