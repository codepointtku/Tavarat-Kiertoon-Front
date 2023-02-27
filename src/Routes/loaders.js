import axios from 'axios';
import apiCall from '../Utils/apiCall';

// just a comment for file-rename commit to work. remove this

/**
 * Get different defaults for the site
 */
const rootLoader = async (auth, setAuth) => {
    const [{ data: contacts }, { data: colors }, { data: categories }, { data: bulletins }, { data: shoppingCart }] =
        await Promise.all([
            apiCall(auth, setAuth, '/contacts/'),
            apiCall(auth, setAuth, '/colors/'),
            apiCall(auth, setAuth, '/categories/'),
            apiCall(auth, setAuth, '/bulletins/'),
            apiCall(auth, setAuth, '/shopping_carts/'),
        ]);

    console.log(categories);
    return { contacts, colors, categories, bulletins, shoppingCart };
};

/**
 * Get all products
 */
const productListLoader = async (auth, setAuth) => {
    try {
        const { data } = await apiCall(auth, setAuth, '/products/');
        return data.results;
    } catch (err) {
        return null;
    }
};

/**
 * Get one product
 */
const productDetailsLoader = async (auth, setAuth, params) => {
    try {
        const { data } = await apiCall(auth, setAuth, `/products/${params.id}`);
        return data;
    } catch {
        return null;
    }
};

/**
 * Get all orders.
 */
const ordersListLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, '/orders');
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

    if (data) {
        return data;
    }
    return null;
};

/**
 * Get one order
 */
const orderViewLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/orders/${params.id}`);
    if (data) {
        data.productList = data.products;
        return data;
    }
    return null;
};

/**
 * Get one order
 */
const orderEditLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/orders/${params.id}`);
    if (data) {
        return data;
    }
    return null;
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
    const { data } = await apiCall(auth, setAuth, `/orders/${params.id}`);
    return data || null;
};

/**
 * Get all storages
 */
const storagesListLoader = async (auth, setAuth) => {
    const { data } = await apiCall(auth, setAuth, '/storages');
    return data;
};

const storageEditLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/storages/${params.id}`);
    return data;
};

/**
 * Get all users
 */
const usersListLoader = async (auth, setAuth) => {
    const { data } = await apiCall(auth, setAuth, '/users');
    return data;
};

/**
 * Get one user
 */
const userEditLoader = async (auth, setAuth, params) => {
    const { data } = await apiCall(auth, setAuth, `/users/${params.id}`);
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
};
