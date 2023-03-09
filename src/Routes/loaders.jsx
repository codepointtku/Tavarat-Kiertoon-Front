import axios from 'axios';
import apiCall from '../Utils/apiCall';

// just a comment for file-rename commit to work. remove this

/**
 * Get various defaults for the site
 */
const rootLoader = async (auth, setAuth) => {
    console.log('rootLoader, auth:', auth);

    if (auth.user_group === false) {
        const [{ data: contacts }, { data: colors }, { data: categories }, { data: bulletins }] = await Promise.all([
            apiCall(auth, setAuth, '/contacts/', 'get'),
            apiCall(auth, setAuth, '/colors/', 'get'),
            apiCall(auth, setAuth, '/categories/', 'get'),
            apiCall(auth, setAuth, '/bulletins/', 'get'),
        ]);

        return { contacts, colors, categories, bulletins };
    }

    const [{ data: contacts }, { data: colors }, { data: categories }, { data: bulletins }, { data: cart }] =
        await Promise.all([
            apiCall(auth, setAuth, '/contacts/', 'get'),
            apiCall(auth, setAuth, '/colors/', 'get'),
            apiCall(auth, setAuth, '/categories/', 'get'),
            apiCall(auth, setAuth, '/bulletins/', 'get'),
            apiCall(auth, setAuth, '/shopping_cart/', 'get'),
        ]);

    console.log('@rootLoader, cart.products:', cart?.products);
    console.log('cart:', cart);

    /* eslint-disable no-shadow */

    const cartItems = cart?.products?.reduce((cartItems, product) => {
        let cartItem = cartItems.find((cartItem) => cartItem.group_id === product.group_id);

        if (!cartItem) {
            cartItem = {
                ...product,
                count: 0,
            };
            cartItems.push(cartItem);
        }

        cartItem.count += 1;
        console.log(cartItems);
        return cartItems;
    }, []);

    return { contacts, colors, categories, bulletins, cart, cartItems };
};

/**
 * Get all products
 */
const productListLoader = async (auth, setAuth) => {
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
    data.sort((a, b) => {
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

    return data;
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
    const { data } = await apiCall(auth, setAuth, '/users', 'get');
    return data;
};

/**
 * Get one user
 */
const userEditLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/users/${params.id}`, 'get');
    return data;
};

/**
 * Get all bikes
 */
const bikesListLoader = async () => {
    const { data } = await axios.get('http://localhost:8000/bikes/');
    return data;
};

/**
 * returns null load
 */
const userSignupLoader = async () => null;

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
    bikesListLoader,
};
