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
const rootLoader = async (auth, setAuth) => {
    const [{ data: contacts }, { data: colors }, { data: categories }, { data: bulletins }, { data: categoryTree }] =
        await Promise.all([
            contactsApi.contactsList(),
            colorsApi.colorsList(),
            categoriesApi.categoriesList(),
            bulletinsApi.bulletinsList(),
            categoriesApi.categoriesTreeRetrieve(),
            usersApi.usersLoginRefreshCreate(),
        ]);

    return { contacts, colors, categories, bulletins, categoryTree };
};

/**
 * Get shoppingCart for logged in user
 */
const shoppingCartLoader = async (auth, setAuth) => {
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
const productListLoader = async (auth, setAuth, request) => {
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
        const { data } = await productsApi.productsList(null, null, null, null, null, url.searchParams.get('haku'));
        return data.results;
    }

    const { data } = await productsApi.productsList();

    return data.results;
};

/**
 * Get one product
 */
const productDetailsLoader = async (auth, setAuth, params) => {
    // const { data } = await apiCall(auth, setAuth, `/products/${params.id}`, 'get');
    const { data } = await productsApi.productsRetrieve(params.id);
    return data;
};

/**
 * Get all orders.
 */
const ordersListLoader = async (auth, setAuth, params) => {
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
    // const { data } = await apiCall(auth, setAuth, '/bikes', 'get');
    const { data } = await bikesApi.bikesList();
    return data;
};

/**
 * Get list of all bikes
 *
 * @param {*} auth
 * @param {*} setAuth
 * @returns
 */
const bikesListLoader = async (auth, setAuth) => {
    // const { data } = await apiCall(auth, setAuth, '/bikes/stock', 'get');
    const { data } = await bikesApi.bikesStockList();
    return data;
};

/**
 * Get information needed to modify a single bike
 *
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} params
 * @returns
 */
const bikeLoader = async (auth, setAuth, params) => {
    const [{ data: bikeData }, { data: bikeModelsData }, { data: storagesData }] = await Promise.all([
        // apiCall(auth, setAuth, `/bikes/stock/${params.id}`, 'get'),
        bikesApi.bikesStockRetrieve(params.id),
        // apiCall(auth, setAuth, '/bikes/models/', 'get'),
        bikesApi.bikesModelsList(),
        // apiCall(auth, setAuth, '/storages/', 'get'),
        storagesApi.storagesList(),
    ]);
    return { bikeData, bikeModelsData, storagesData };
};

const createNewBikeLoader = async (auth, setAuth) => {
    const [{ data: bikeModelsData }, { data: storagesData }] = await Promise.all([
        // apiCall(auth, setAuth, '/bikes/models/', 'get'),
        bikesApi.bikesModelsList(),
        // apiCall(auth, setAuth, '/storages/', 'get'),
        storagesApi.storagesList(),
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
    return { bikeData, bikeModelsData, storagesData };
};

/**
 * Get ALL Bike Models
 *
 * @param {*} auth
 * @param {*} setAuth
 * @returns
 */
const bikeModelsLoader = async (auth, setAuth) => {
    // const { data } = await apiCall(auth, setAuth, `/bikes/models/`, 'get');
    const { data } = await bikesApi.bikesModelsList();
    return data;
};

/**
 * Loader for modifying a single bike model
 * Get a single Bike Model based on ID and lists of all colors, brands, types
 * and sizes currently in the database
 *
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} params
 * @returns
 */
const bikeSingleModelLoader = async (auth, setAuth, params) => {
    const [{ data: bikeModel }, { data: colors }, { data: brands }, { data: types }, { data: sizes }] =
        await Promise.all([
            // apiCall(auth, setAuth, `/bikes/models/${params.id}`, 'get'),
            bikesApi.bikesModelsRetrieve(params.id),
            // apiCall(auth, setAuth, `/colors`, 'get'),
            colorsApi.colorsList(),
            // apiCall(auth, setAuth, `/bikes/brand`, 'get'),
            bikesApi.bikesBrandList(),
            // apiCall(auth, setAuth, `/bikes/type`, 'get'),
            bikesApi.bikesTypeList(),
            // apiCall(auth, setAuth, `/bikes/size`, 'get'),
            bikesApi.bikesSizeList(),
        ]);
    return { bikeModel, colors, brands, types, sizes };
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
        // apiCall(auth, setAuth, `/colors`, 'get'),
        colorsApi.colorsList(),
        // apiCall(auth, setAuth, `/bikes/brand`, 'get'),
        bikesApi.bikesBrandList(),
        // apiCall(auth, setAuth, `/bikes/type`, 'get'),
        bikesApi.bikesTypeList(),
        // apiCall(auth, setAuth, `/bikes/size`, 'get'),
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
 * returns null load
 */
const userSignupLoader = async () => null;

/**
 * Gets user info for shopping cart process
 */
const shoppingProcessLoader = async (auth, setAuth) => {
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

export {
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
    userSignupLoader,
    bikesDefaultLoader,
    bikesListLoader,
    bikeLoader,
    createNewBikeLoader,
    bikeModelsLoader,
    bikeSingleModelLoader,
    shoppingCartLoader,
    shoppingProcessLoader,
    adminLoader,
    adminInboxLoader,
    bikeNewModelLoader,
};
