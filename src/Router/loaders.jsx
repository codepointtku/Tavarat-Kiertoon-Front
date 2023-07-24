import axios from 'axios';
// import apiCall from '../Utils/apiCall';
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

    if (url.searchParams.has('kategoria')) {
        url.searchParams.forEach((value, key) => {
            if (key === 'kategoria') {
                url.searchParams.append('category', value);
            }
        });
        url.searchParams.delete('kategoria');
        // const { data } = await apiCall(auth, setAuth, `/products/?${url.searchParams}`, 'get');
        // get all categories
        const { data } = await productsApi.productsList(url.searchParams.getAll('category'));
        return data.results;
    }

    if (url.searchParams.has('haku')) {
        //const { data } = await apiCall(auth, setAuth, `/products/?${url.searchParams}`, 'get');
        console.log(url.searchParams.get('kategoriat'), url.searchParams.get('varit'));
        const { data } = await productsApi.productsList(
            url.searchParams.get('kategoria'),
            url.searchParams.get('varit'),
            null,
            null,
            null,
            url.searchParams.get('haku')
        );
        return data.results;
    }

    const { data } = await productsApi.productsList();

    return data.results;
};

/**
 * Get one product
 */
const productDetailsLoader = async ({ params }) => {
    // const { data } = await apiCall(auth, setAuth, `/products/${params.id}`, 'get');
    const { data: product } = await productsApi.productsRetrieve(params.id);
    const { data: products } = await productsApi.productsList(product.category);
    return { product, products };
};

/**
 * Get all orders.
 */
const ordersListLoader = async ({ params }) => {
    const { data } = await ordersApi.ordersList();
    // num will tell back-end which entries to bring
    // view is order status, unless archived can bring all?
    // or will be replaced into the back-end later?
    const statuses = {
        waiting: 2,
        delivery: 1,
        finished: 0,
    };
    statuses[params.view] = 10;
    data.results.sort((a, b) => {
        if (statuses[a.status] > statuses[b.status]) {
            return -1;
        }
        if (a.status === b.status) {
            if (a.id > b.id) {
                return -1;
            }
        }
        return 1;
    });

    return data.results;
};

/**
 * Get one order
 */
const orderViewLoader = async (auth, setAuth, params) => {
    // const response = await apiCall(auth, setAuth, `/orders/${params.id}`, 'get');
    const response = await ordersApi.ordersRetrieve(params.id);
    // TODO: check this later, with pdfViewLoader
    return response.data;
};

/**
 * Get one order
 */
const orderEditLoader = async (auth, setAuth, params) => {
    // const { data } = await apiCall(auth, setAuth, `/orders/${params.id}`, 'get');
    const { data } = await ordersApi.ordersRetrieve(params.id);
    return data;
};

/**
 * Get all categories and storages
 */
const addItemLoader = async () => {
    const dataList = [];
    let { data } = await axios.get('http://localhost:8000/categories/');
    dataList.push(data);
    data = await axios.get('http://localhost:8000/storages/');
    dataList.push(data.data);
    if (dataList) {
        return dataList;
    }
    return null;
};

/**
 * Get one order
 */

// TODO: is this a duplicate of orderEditLoader?
const pdfViewLoader = async (auth, setAuth, params) => {
    // const { data } = await apiCall(auth, setAuth, `/orders/${params.id}`, 'get');
    const { data } = await ordersApi.ordersRetrieve(params.id);
    return data;
};

/**
 * Get all storages
 */
const storagesListLoader = async (auth, setAuth) => {
    // const { data } = await apiCall(auth, setAuth, '/storages', 'get');
    const { data } = await storagesApi.storagesList();
    return data;
};

const storageEditLoader = async (auth, setAuth, params) => {
    // const { data } = await apiCall(auth, setAuth, `/storages/${params.id}`, 'get');
    const { data } = await storagesApi.storagesRetrieve(params.id);
    return data;
};

/**
 * Get all users.
 * Used in src/Components/Admin/UserList.jsx
 */
const usersListLoader = async (auth, setAuth) => {
    // const { data: users } = await apiCall(auth, setAuth, '/users', 'get');
    const { data: users } = await usersApi.usersList();
    return users;
};

/**
 * Get one user and all auth groups in separate apicalls, combine these responses into an array.
 * Array item 0 === user data, item 1 === auth groups.
 * Used in src/Components/Admin/UserEdit.jsx
 */
const userEditLoader = async (auth, setAuth, params) => {
    const dataList = [];
    // let { data } = await apiCall(auth, setAuth, `/users/${params.id}`, 'get');
    let { data } = await usersApi.usersRetrieve(params.id);
    data.groups = data.groups.map((group) => group.id);
    dataList.push(data);
    // data = await apiCall(auth, setAuth, '/users/groups', 'get');
    data = await usersApi.usersGroupsList();
    dataList.push(data.data);
    if (dataList) {
        return dataList;
    }
    return null;
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

const adminLoader = async (auth, setAuth) => {
    const [{ data: user }, { data: messages }] = await Promise.all([
        // apiCall(auth, setAuth, '/user/', 'get'),
        userApi.userRetrieve(),
        // apiCall(auth, setAuth, '/contact_forms/?status=Not read', 'get'),
        contactFormsApi.contactFormsList(null, null, null, { status: 'Not read' }),
    ]);

    return { user, messages };
};

const adminInboxLoader = async (auth, setAuth, request) => {
    const searchParams = new URL(request.url).searchParams;
    // const status =
    //     searchParams.get('tila') === 'Luetut'
    //         ? 'Read'
    //         : searchParams.get('tila') === 'Lukemattomat'
    //         ? 'Not read'
    //         : (searchParams.get('tila') === 'Hoidetut' && 'Handled') || null;

    const statusMap = {
        Luetut: 'Read',
        Lukemattomat: 'Not read',
        Hoidetut: 'Handled',
    };

    const status = statusMap[searchParams.get('tila')] || null;

    // if (status) {
    //     // const { data: messages } = await apiCall(
    //     //     auth,
    //     //     setAuth,
    //     //     searchParams.has('sivu')
    //     //         ? `/contact_forms/?page=${searchParams.get('sivu')}&status=${status}`
    //     //         : `/contact_forms/?status=${status}`,
    //     //     'get'
    //     // );
    //     const { data: messages } = await contactFormsApi.contactFormsList(null, searchParams.get('sivu'), null , searchParams.get('tila'));
    //     return messages;

    // } else if (searchParams.has('sivu') && searchParams.get('sivu') != 0) {
    //     const { data: messages } = await apiCall(
    //         auth,
    //         setAuth,
    //         `/contact_forms/?page=${searchParams.get('sivu')}`,
    //         'get'
    //     );
    //     return messages;
    // }

    const { data: messages } = await contactFormsApi.contactFormsList(null, searchParams.get('sivu'), null, status);

    // // const { data: messages } = await apiCall(auth, setAuth, '/contact_forms/', 'get');
    // const { data: messages } = await contactFormsApi.contactFormsList();

    return messages;
};

/* get logged in users data and user orders*/
const userInfoLoader = async (request) => {
    const searchParams = new URL(request.url).searchParams;
    const statusMap = {
        Aktiivinen: ['Waiting', 'Processing'],
        Odottaa: 'Waiting',
        Käsitellään: 'Processing',
        Toimitettu: 'Finished',
    };
    const orderingMap = {
        Uusinensin: '-creation_date',
        Vanhinensin: 'creation_date',
        Normaalitilanmukaan: 'status',
        Käänteinentilanmukaan: '-status',
    };
    const status = statusMap[searchParams.get('tila')] || null;
    const ordering = orderingMap[searchParams.get('järjestys') || null];
    const [{ data: userInfo }, { data: userOrders }] = await Promise.all([
        userApi.userRetrieve(),
        ordersApi.ordersUserList(ordering, searchParams.get('sivu'), null, status),
    ]);

    return { userInfo, userOrders };
};

export {
    bikesPacketLoader,
    rootLoader,
    productListLoader,
    productDetailsLoader,
    ordersListLoader,
    orderViewLoader,
    orderEditLoader,
    addItemLoader,
    pdfViewLoader,
    storagesListLoader,
    storageEditLoader,
    usersListLoader,
    userEditLoader,
    userInfoLoader,
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
    modifyBikePacketLoader,
    bikeNewModelLoader,
    createBikePacketLoader,
};
