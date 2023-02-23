import axios from 'axios';

/**
 * Get different defaults for the site
 */
export const rootLoader = async () => {
    const { data: contacts } = await axios.get('http://localhost:8000/contacts/');
    const { data: colors } = await axios.get('http://localhost:8000/colors/');
    const { data: categories } = await axios.get('http://localhost:8000/categories/');
    const { data: bulletins } = await axios.get('http://localhost:8000/bulletins/');
    const { data: cart } = await axios.get('http://localhost:8000/shopping_carts/8');

    /* eslint-disable no-shadow */

    const cartItems = cart.products.reduce((cartItems, product) => {
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

    return { contacts, colors, categories, bulletins, cart, cartItems };
};

/**
 * Get all products
 */
export const productListLoader = async () => {
    try {
        const { data: products } = await axios.get('http://localhost:8000/products/');
        return { products };
    } catch {
        return null;
    }
};

/**
 * Get one product
 */
export const productDetailsLoader = async ({ params }) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/products/${params.id}`);
        return data;
    } catch {
        return null;
    }
};

/**
 * Get all orders.
 */
export const ordersListLoader = async ({ params }) => {
    const { data } = await axios.get('http://localhost:8000/orders');
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
export const orderViewLoader = async ({ params }) => {
    const { data } = await axios.get(`http://localhost:8000/orders/${params.id}`);
    if (data) {
        data.productList = data.products;
        return data;
    }
    return null;
};

/**
 * Get one order
 */
export const orderEditLoader = async ({ params }) => {
    const { data } = await axios.get(`http://localhost:8000/orders/${params.id}`);
    if (data) {
        return data;
    }
    return null;
};

/**
 * Get all categories and storages
 */
export const addItemLoader = async () => {
    const dataList = [];
    let { data } = await axios.get('http://localhost:3001/categories/');
    dataList.push(data);
    data = await axios.get('http://localhost:3001/storages/');
    dataList.push(data.data);
    if (dataList) {
        return dataList;
    }
    return null;
};

/**
 * Get one order
 */
export const pdfViewLoader = async ({ params }) => {
    const { data } = await axios.get(`http://localhost:8000/orders/${params.id}`);
    return data || null;
};

/**
 * Get all storages
 */
export const storagesListLoader = async () => {
    const { data } = await axios.get('http://localhost:8000/storages');
    return data;
};

export const storageEditLoader = async ({ params }) => {
    const { data } = await axios.get(`http://localhost:8000/storages/${params.id}`);
    return data;
};

/**
 * Get all users
 */
export const usersListLoader = async () => {
    const { data } = await axios.get('http://localhost:8000/users');
    return data;
};

/**
 * Get one user
 */
export const userEditLoader = async ({ params }) => {
    const { data } = await axios.get(`http://localhost:8000/users/${params.id}`);
    return data;
};
