import apiCall from '../Utils/apiCall';

/**
 * logins user
 */
const userLoginAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, '/users/login/', 'post', {
        email: formData.get('email'),
        password: formData.get('password'),
    });
    if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return { type: 'login', status: true };
    }
    return { type: 'login', status: false };
};

/**
 * creates new user
 */
const userSignupAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, '/users/create/', 'post', {
        user_name: formData.get('username'),
        first_name: formData.get('firstname'),
        last_name: formData.get('lastname'),
        email: formData.get('email'),
        phone_number: formData.get('phonenumber'),
        password: formData.get('password'),
        joint_user: formData.get('jointuser'),
        contact_person: formData.get('contactperson'),
        address: formData.get('address'),
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
 * removes items from the order and edits order data
 */
const orderEditAction = async (auth, setAuth, request, params) => {
    const formData = await request.formData();
    // const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
    // const productName = formData.get('productName');
    if (request.method === 'POST') {
        if (formData.get('type') === 'delete') {
            const response = await apiCall(auth, setAuth, `/orders/${params.id}`, 'post', {
                data: {
                    product: Number(formData.get('product')),
                    productId: Number(formData.get('productId')),
                },
            });
            if (response.status === 202) {
                return { type: 'delete', status: true };
            }
            return { type: 'delete', status: false };
        }
        if (formData.get('type') === 'put') {
            const response = await apiCall(auth, setAuth, `/orders/${params.id}`, 'put', {
                contact: formData.get('contact'),
                delivery_address: formData.get('delivery_address'),
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
    const response = await apiCall(auth, setAuth, 'http://localhost:8000/storages/', 'post', {
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
            const response = await apiCall(auth, setAuth, `http://localhost:8000/storages/${params.id}`, 'put', {
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

export { userSignupAction, contactAction, orderEditAction, storageCreateAction, storageEditAction, userLoginAction };
