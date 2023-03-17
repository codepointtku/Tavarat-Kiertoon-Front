import axios from 'axios';
import apiCall from '../Utils/apiCall';

// just a comment for file-rename commit to work. remove this

/**
 * Get various defaults for the site
 */
const rootLoader = async (auth, setAuth) => {
    const [{ data: contacts }, { data: colors }, { data: categories }, { data: bulletins }] = await Promise.all([
        apiCall(auth, setAuth, '/contacts/', 'get'),
        apiCall(auth, setAuth, '/colors/', 'get'),
        apiCall(auth, setAuth, '/categories/', 'get'),
        apiCall(auth, setAuth, '/bulletins/', 'get'),
        apiCall(auth, setAuth, '/users/login/refresh/', 'post'),
    ]);

    return { contacts, colors, categories, bulletins };
};

/**
 * Get shoppingCart for logged in user
 */
const shoppingCartLoader = async (auth, setAuth) => {
    const { data: cart } = await apiCall(auth, setAuth, '/shopping_cart/', 'get');
    // console.log('@shoppingCartLoader, cart.products:', cart?.products);
    // console.log('@shoppingCartLoader, cart:', cart);

    /* eslint-disable no-shadow */
    // // auth check for future
    // if (auth.user_group === true){...}
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
        // console.log(cartItems);
        return cartItems;
    }, []);

    return { cartItems, cart };
};

/**
 * Get all products / get products based on category id
 */
const productListLoader = async (auth, setAuth, request) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get('kategoria');
    if (filter) {
        const { data } = await apiCall(auth, setAuth, `/categories/${filter}/products`, 'get');
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

/**
 * Gets user info for shopping cart process phase 2
 */

const contactsAndDeliveryLoader = async (auth, setAuth) => {
    const { data } = await apiCall(auth, setAuth, '/user/', 'get');
    return data;
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
    bikesListLoader,
    shoppingCartLoader,
    contactsAndDeliveryLoader,
};
