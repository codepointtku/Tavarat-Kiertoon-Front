import axios from 'axios';
import apiCall from '../Utils/apiCall';

/**
 * Get various defaults for the site
 */
const rootLoader = async (auth, setAuth) => {
    const [{ data: contacts }, { data: colors }, { data: categories }, { data: bulletins }, { data: categoryTree }] =
        await Promise.all([
            apiCall(auth, setAuth, '/contacts/', 'get'),
            apiCall(auth, setAuth, '/colors/', 'get'),
            apiCall(auth, setAuth, '/categories/', 'get'),
            apiCall(auth, setAuth, '/bulletins/', 'get'),
            apiCall(auth, setAuth, '/categories/tree/', 'get'),
            apiCall(auth, setAuth, '/users/login/refresh/', 'post'),
        ]);

    return { contacts, colors, categories, bulletins, categoryTree };
};

/**
 * Get shoppingCart for logged in user
 */
const shoppingCartLoader = async (auth, setAuth) => {
    const { data: cart } = await apiCall(auth, setAuth, '/shopping_cart/', 'get');
    const { data: amountList } = await apiCall(auth, setAuth, '/shopping_cart/available_amount/', 'get');
    // console.log('@shoppingCartLoader, cart.products:', cart?.products);
    // console.log('@shoppingCartLoader, cart:', cart);

    /* eslint-disable no-shadow */
    // // auth check for future
    // if (auth.user_group === true){...}
    const products = cart?.products?.reduce((cartItems, product) => {
        let cartItem = cartItems.find((cartItem) => cartItem.group_id === product.group_id);

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
        const { data } = await apiCall(auth, setAuth, `/products/?${url.searchParams}`, 'get');
        return data.results;
    }

    if (url.searchParams.has('haku')) {
        url.searchParams.forEach((value, key) => {
            if (key === 'haku') {
                url.searchParams.append('search', value);
            }
        });
        url.searchParams.delete('haku');
        const { data } = await apiCall(auth, setAuth, `/products/?${url.searchParams}`, 'get');
        return data.results;
    }

    const { data } = await apiCall(auth, setAuth, '/products/', 'get');
    return data.results;
};

/**
 * Get one product
 */
const productDetailsLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/products/${params.id}`, 'get');
    return data;
};

/**
 * Get all orders.
 */
const ordersListLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, '/orders', 'get');
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
    const response = await apiCall(auth, setAuth, `/orders/${params.id}`, 'get');
    response.data.productList = response.data.products;
    return response.data;
};

/**
 * Get one order
 */
const orderEditLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/orders/${params.id}`, 'get');
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
const pdfViewLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/orders/${params.id}`, 'get');
    return data;
};

/**
 * Get all storages
 */
const storagesListLoader = async (auth, setAuth) => {
    const { data } = await apiCall(auth, setAuth, '/storages', 'get');
    return data;
};

const storageEditLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/storages/${params.id}`, 'get');
    return data;
};

/**
 * Get all users
 */
const usersListLoader = async (auth, setAuth) => {
    const { data: users } = await apiCall(auth, setAuth, '/users', 'get');
    return users;
};

/**
 * Get one user
 */
const userEditLoader = async (auth, setAuth, params) => {
    const dataList = [];
    let { data } = await apiCall(auth, setAuth, `/users/${params.id}`, 'get');
    data.groups = data.groups.map((group) => group.id);
    dataList.push(data);
    data = await apiCall(auth, setAuth, '/users/groups', 'get');
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
    const { data } = await apiCall(auth, setAuth, '/bikes', 'get');
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
    const { data } = await apiCall(auth, setAuth, '/bikes/stock', 'get');
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
        apiCall(auth, setAuth, `/bikes/stock/${params.id}`, 'get'),
        apiCall(auth, setAuth, '/bikes/models/', 'get'),
        apiCall(auth, setAuth, '/storages/', 'get'),
    ]);
    return { bikeData, bikeModelsData, storagesData };
};

const createNewBikeLoader = async (auth, setAuth) => {
    const [{ data: bikeModelsData }, { data: storagesData }] = await Promise.all([
        apiCall(auth, setAuth, '/bikes/models/', 'get'),
        apiCall(auth, setAuth, '/storages/', 'get'),
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
 * returns null load
 */
const userSignupLoader = async () => null;

/**
 * Gets user info for shopping cart process
 */
const shoppingProcessLoader = async (auth, setAuth) => {
    const { data: user } = await apiCall(auth, setAuth, '/user/', 'get');
    return user;
};

const adminLoader = async (auth, setAuth) => {
    const [{ data: user }, { data: messages }] = await Promise.all([
        apiCall(auth, setAuth, '/user/', 'get'),
        apiCall(auth, setAuth, '/contact_forms/', 'get'),
    ]);

    return { user, messages };
};

const adminInboxLoader = async (auth, setAuth, request) => {
    const searchParams = new URL(request.url).searchParams;
    const status =
        searchParams.get('tila') === 'Luetut'
            ? 'Read'
            : searchParams.get('tila') === 'Lukemattomat'
            ? 'Not%20read'
            : searchParams.get('tila') === 'Hoidetut' && 'Handled';

    if (status) {
        const { data: messages } = await apiCall(
            auth,
            setAuth,
            searchParams.has('sivu')
                ? `/contact_forms/?page=${searchParams.get('sivu')}&status=${status}`
                : `/contact_forms/?status=${status}`,
            'get'
        );
        return messages;
    } else if (searchParams.has('sivu') && searchParams.get('sivu') != 0) {
        const { data: messages } = await apiCall(
            auth,
            setAuth,
            `/contact_forms/?page=${searchParams.get('sivu')}`,
            'get'
        );
        return messages;
    }
    const { data: messages } = await apiCall(auth, setAuth, '/contact_forms/', 'get');
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
    shoppingCartLoader,
    shoppingProcessLoader,
    adminLoader,
    adminInboxLoader,
};
