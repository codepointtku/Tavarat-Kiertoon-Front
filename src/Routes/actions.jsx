import apiCall from '../Utils/apiCall';

/**
 * logins or logouts user, adds a product to shopping cart and deletes product from shopping cart
 */
const frontPageActions = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
    if (request.method === 'POST') {
        console.log(auth.username);
        if (auth.username) {
            const response = await apiCall(auth, setAuth, '/users/logout/', 'post', {
                formData,
            });
            if (response.status === 200) {
                return { type: 'logout', status: true };
            }
            return { type: 'logout', status: false };
        }
        const response = await apiCall(auth, setAuth, '/users/login/', 'post', {
            username: formData.get('email'),
            password: formData.get('password'),
        });
        if (response.status === 200) {
            return { type: 'login', status: true };
        }
        return { type: 'login', status: false };
    }
    if (request.method === 'PUT') {
        if (auth.user_group === false) {
            // eslint-disable-next-line no-alert
            alert('log in as with user_group rights first');
            return null;
        }
        const response = await apiCall(auth, setAuth, '/shopping_cart/', 'put', {
            products: id,
        });
        // console.log(id, 'put method test', response.status);
        if (response.status === 202) {
            // alert('Item added successfully');
            return { type: 'update', status: true };
        }
        return { type: 'update', status: false };
    }
    if (request.method === 'DELETE') {
        const response = await apiCall(auth, setAuth, '/shopping_cart/', 'put', {
            products: id,
        });

        if (response.status === 202) {
            return { type: 'delete', status: true };
        }
        return { type: 'delete', status: false };
    }
    return null;
};

/**
 * creates new user
 */
const userSignupAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, '/users/create/', 'post', {
        username: formData.get('username'),
        first_name: formData.get('firstname'),
        last_name: formData.get('lastname'),
        email: formData.get('email'),
        phone_number: formData.get('phonenumber'),
        password: formData.get('password'),
        joint_user: formData.get('jointuser'),
        address: formData.get('address'),
        zip_code: formData.get('zipcode'),
        city: formData.get('town'),
    });
    if (response.status === 201) {
        return { type: 'create', status: true };
    }
    return { type: 'create', status: false };
};

/**
 * sends contact form to back-end
 */
const contactAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, '/contact_forms/', 'post', formData);
    return response.data || null;
};
/**
 * sends bike order form to back-end
 */
const bikeOrderAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // console.log('@bikeorderAction', formData.get('contactPersonName'));
    const response = await apiCall(auth, setAuth, '/bikes/rental/', 'post', {
        contact_name: formData.get('contactPersonName'),
        contact_phone_number: formData.get('contactPersonPhoneNumber'),
        delivery_address: formData.get('deliveryAddress'),
        start_date: formData.get('startDateTime'),
        end_date: formData.get('endDateTime'),
        bike_stock: JSON.parse(formData.get('selectedBikes')),
    });
    return response.data || null;
};
/**
 * removes items from the order and edits order data
 */
const orderEditAction = async (auth, setAuth, request, params) => {
    const formData = await request.formData();
    // const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
    // const productName = formData.get('productName');
    if (request.method === 'POST') {
        if (formData.get('type') === 'delete') {
            const response = await apiCall(auth, setAuth, `/orders/${params.id}`, 'delete', {
                product: Number(formData.get('product')),
                productId: Number(formData.get('productId')),
            });
            if (response.status === 202) {
                return { type: 'delete', status: true };
            }
            return { type: 'delete', status: false };
        }
        if (formData.get('type') === 'put') {
            const response = await apiCall(auth, setAuth, `/orders/${params.id}/`, 'put', {
                contact: formData.get('contact'),
                delivery_address: formData.get('delivery_address'),
                phone_number: formData.get('phone_number'),
                status: formData.get('status'),
                order_info: formData.get('order_info'),
            });
            if (response.status === 200) {
                return { type: 'update', status: true };
            }
            return { type: 'update', status: false };
        }
    }

    return null;
};

/*
creates new storage
*/
const storageCreateAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, '/storages/', 'post', {
        address: formData.get('address'),
        name: formData.get('name'),
        in_use: formData.get('in_use'),
    });
    if (response.status === 201) {
        return { type: 'post', status: true };
    }
    return { type: 'post', status: false };
};

/**
 * edits storage information
 */
const storageEditAction = async (auth, setAuth, request, params) => {
    const formData = await request.formData();
    if (request.method === 'POST') {
        if (formData.get('type') === 'put') {
            const response = await apiCall(auth, setAuth, `/storages/${params.id}/`, 'put', {
                address: formData.get('address'),
                name: formData.get('name'),
                in_use: formData.get('in_use'),
            });
            if (response.status === 200) {
                return { type: 'update', status: true };
            }
            return { type: 'update', status: false };
        }
    }
    return null;
};

const userEditAction = async (auth, setAuth, request, params) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, `/users/update/${params.id}/`, 'put', formData);
    if (response.status === 200) {
        return { type: 'update', status: true };
    }
    return { type: 'update', status: false };
};

/**
 * creates a new item
 */

const itemCreateAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, '/products/', 'post', formData, {
        headers: { 'content-type': 'multipart/form-data' },
    });
    if (response.status === 200) {
        return { type: 'createitem', status: true };
    }
    return { type: 'createitem', status: false };
};

/**
 * updates existing item
 */

const itemUpdateAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, '/products/', 'put', formData);
    if (response.status === 200) {
        return { type: 'updateitem', status: true };
    }
    return { type: 'updateitem', status: false };
};

export {
    userSignupAction,
    frontPageActions,
    contactAction,
    orderEditAction,
    storageCreateAction,
    storageEditAction,
    userEditAction,
    itemCreateAction,
    itemUpdateAction,
    bikeOrderAction,
};
