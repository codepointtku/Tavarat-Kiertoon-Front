import { redirect } from 'react-router-dom';
import apiCall from '../Utils/apiCall';
import {
    bikesApi,
    bulletinsApi,
    contactFormsApi,
    contactsApi,
    ordersApi,
    shoppingCartApi,
    storagesApi,
    usersApi,
} from '../api';

const adminLogOut = async (auth, setAuth, request) => {
    // const formData = await request.formData();
    if (request.method === 'POST') {
        if (auth.username) {
            // const response = await apiCall(auth, setAuth, '/users/logout/', 'post', {
            //     formData,
            // });
            const response = await usersApi.usersLogoutCreate();
            if (response.status === 200) {
                return { type: 'logout', status: true };
            }
            return { type: 'logout', status: false };
        }
    }
};

/**
 * logins or logouts user, adds a product to shopping cart and deletes product from shopping cart
 */
const frontPageActions = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
    const amount = formData.has('amount') ? Number(formData.get('amount')) : request.method === 'PUT' ? 1 : 0;
    if (request.method === 'POST') {
        if (auth.username) {
            // const response = await apiCall(auth, setAuth, '/users/logout/', 'post', {
            //     formData,
            // });
            const response = await usersApi.usersLogoutCreate();

            if (response.status === 200) {
                return { type: 'logout', status: true };
            }
            return { type: 'logout', status: false };
        }
        // const response = await apiCall(auth, setAuth, '/users/login/', 'post', {
        //     username: formData.get('email'),
        //     password: formData.get('password'),
        // });
        const response = await usersApi.usersLoginCreate({
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
        if (!id) {
            // clear cart if no id is being sent or clear cart and return "type: orderCreated" when a new order is created.
            // const response = await apiCall(auth, setAuth, '/shopping_cart/', 'put', {
            //     amount: -1,
            // });
            const response = await shoppingCartApi.shoppingCartUpdate({
                amount: -1,
            });

            if (formData.has('order')) {
                return { type: 'orderCreated', status: true };
            }
            return response;
        }
        // const response = await apiCall(auth, setAuth, '/shopping_cart/', 'put', {
        //     products: id,
        //     amount,
        // });
        const response = await shoppingCartApi.shoppingCartUpdate({
            product: id,
            amount,
        });
        if (response.status === 202) {
            // alert('Item added successfully');
            return { type: 'update', status: true };
        }
        return { type: 'update', status: false };
    }
    if (request.method === 'DELETE') {
        // const response = await apiCall(auth, setAuth, '/shopping_cart/', 'put', {
        //     product: id,
        //     amount,
        // });
        console.log('is in delete block');
        const response = await shoppingCartApi.shoppingCartUpdate({
            product: id,
            amount,
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
    // both single user signup form, and location signup form use this same action
    // and url in backend.

    // a single user does not have an username -- email-value is copied to username-value in BE.

    // this action defaults without username-field.
    // if username-field exists in the formData, its value is appended and sent with the apiCall.

    const formData = await request.formData();

    let userSignUpValues = {
        first_name: formData.get('firstname'),
        last_name: formData.get('lastname'),
        email: formData.get('email'),
        phone_number: formData.get('phonenumber'),
        password: formData.get('password'),
        address: formData.get('address'),
        zip_code: formData.get('zipcode'),
        city: formData.get('town'),
    };

    if (formData.has('username')) {
        userSignUpValues = { ...userSignUpValues, username: formData.get('username') };
    }

    // const response = await apiCall(auth, setAuth, '/users/create/', 'post', userSignUpValues);
    const response = await usersApi.usersCreateCreate(userSignUpValues);

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
    // const response = await apiCall(auth, setAuth, '/contact_forms/', 'post', formData);
    const response = await contactFormsApi.contactFormsCreate(Object.fromEntries(formData));
    return response.data || null;
};
/**
 * sends bike order form to back-end
 */
const bikeOrderAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // console.log('@bikeorderAction', formData.get('contactPersonName'));
    // const response = await apiCall(auth, setAuth, '/bikes/rental/', 'post', {
    //     contact_name: formData.get('contactPersonName'),
    //     contact_phone_number: formData.get('contactPersonPhoneNumber'),
    //     delivery_address: formData.get('deliveryAddress'),
    //     start_date: formData.get('startDateTime'),
    //     end_date: formData.get('endDateTime'),
    //     bike_stock: JSON.parse(formData.get('selectedBikes')),
    //     extra_info: formData.get('extraInfo'),
    //     pickup: formData.get('pickup'),
    // });
    const response = await bikesApi.bikesRentalCreate({
        contact_name: formData.get('contactPersonName'),
        contact_phone_number: formData.get('contactPersonPhoneNumber'),
        delivery_address: formData.get('deliveryAddress'),
        start_date: formData.get('startDateTime'),
        end_date: formData.get('endDateTime'),
        bike_stock: JSON.parse(formData.get('selectedBikes')),
        extra_info: formData.get('extraInfo'),
        pickup: formData.get('pickup'),
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
            // const response = await apiCall(auth, setAuth, `/orders/${params.id}`, 'delete', {
            //     product: Number(formData.get('product')),
            //     productId: Number(formData.get('productId')),
            // });

            // TODO: why payload with delete method???
            const response = await ordersApi.ordersDestroy(params.id, {
                product: Number(formData.get('product')),
                productId: Number(formData.get('productId')),
            });

            if (response.status === 202) {
                return { type: 'delete', status: true };
            }
            return { type: 'delete', status: false };
        }
        if (formData.get('type') === 'put') {
            // const response = await apiCall(auth, setAuth, `/orders/${params.id}/`, 'put', {
            //     contact: formData.get('contact'),
            //     delivery_address: formData.get('delivery_address'),
            //     phone_number: formData.get('phone_number'),
            //     status: formData.get('status'),
            //     order_info: formData.get('order_info'),
            // });
            const response = await ordersApi.ordersUpdate(params.id, {
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
    // const response = await apiCall(auth, setAuth, '/storages/', 'post', {
    //     address: formData.get('address'),
    //     name: formData.get('name'),
    //     in_use: formData.get('in_use') === 'käytössä' ? true : false,
    // });
    const response = await storagesApi.storagesCreate({
        address: formData.get('address'),
        name: formData.get('name'),
        in_use: formData.get('in_use') === 'käytössä' ? true : false,
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
            // const response = await apiCall(auth, setAuth, `/storages/${params.id}/`, 'put', {
            //     address: formData.get('address'),
            //     name: formData.get('name'),
            //     in_use: formData.get('in_use'),
            // });
            const response = await storagesApi.storagesUpdate(params.id, {
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
    // const response = await apiCall(auth, setAuth, `/users/${params.id}/edit/`, 'put', formData);
    const response = await usersApi.usersUpdate(params.id, Object.fromEntries(formData.entries()));
    if (response.status === 200) {
        return { type: 'update', status: true };
    }
    return { type: 'update', status: false };
};

/**
 * creates a new item
 */

// this will be replaced with openapi api call
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
 * create new bulletin post
 */

const createBulletinAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // const response = await apiCall(auth, setAuth, '/bulletins/', 'post', formData);
    const response = await bulletinsApi.bulletinsCreate(Object.fromEntries(formData.entries()));
    if (response.status === 200) {
        return { type: 'createnewannouncement', status: true };
    }
    return { type: 'createnewannouncement', status: false };
};

/**
 * updates existing item
 */

// this will be replaced with openapi api call
const itemUpdateAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, '/products/', 'put', formData);
    if (response.status === 200) {
        return { type: 'updateitem', status: true };
    }
    return { type: 'updateitem', status: false };
};

/**
 * adds or removes items from shopping cart while in ordering process phase 1
 */

const cartViewAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const amount = request.method === 'PUT' ? 1 : -1;
    const id = Number(formData.get('id'));
    if (request.method === 'PUT') {
        // const response = await apiCall(auth, setAuth, '/shopping_cart/', 'put', {
        //     product: id,
        //     amount,
        // });
        const response = await shoppingCartApi.shoppingCartUpdate({
            product: id,
            amount,
        });
        // console.log(id, 'put method test', response.status);
        if (response.status === 202) {
            // alert('Item added successfully');
            return { type: 'update', status: true };
        }
        return { type: 'update', status: false };
    }
    if (request.method === 'DELETE') {
        // const response = await apiCall(auth, setAuth, '/shopping_cart/', 'put', {
        //     product: id,
        //     amount,
        // });
        const response = await shoppingCartApi.shoppingCartUpdate({
            product: id,
            amount,
        });

        if (response.status === 202) {
            return { type: 'delete', status: true };
        }
        return { type: 'delete', status: false };
    }
    return null;
};

/**
 * Adds an item in order
 */

const confirmationAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // const response = await apiCall(auth, setAuth, '/orders/', 'post', {
    //     contact: formData.get('email'),
    //     delivery_address: formData.get('deliveryAddress'),
    //     phone_number: formData.get('phoneNumber'),
    //     status: 'Waiting',
    //     user: formData.get('id'),
    //     order_info: formData.get('orderInfo'),
    //     // products: formData.get('productIds'),
    // });
    const response = await ordersApi.ordersCreate({
        contact: formData.get('email'),
        delivery_address: formData.get('deliveryAddress'),
        phone_number: formData.get('phoneNumber'),
        status: 'Waiting',
        user: formData.get('id'),
        order_info: formData.get('orderInfo'),
        // products: formData.get('productIds'),
    });
    if (response.status === 200) {
        return { type: 'post', status: true };
    }
    return { type: 'post', status: false };
};

/**
 * sends email for resetting user password
 */

const resetEmailAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // const response = await apiCall(auth, setAuth, '/users/password/resetemail/', 'post', {
    //     username: formData.get('username'),
    // });
    const response = await usersApi.usersPasswordResetemailCreate({
        username: formData.get('username'),
    });
    if (response.status === 200) {
        return { type: 'emailsent', status: true };
    }
    return { type: 'emailsent', status: false };
};

const resetPasswordAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // const response = await apiCall(auth, setAuth, 'users/password/reset/', 'post', {
    //     new_password: formData.get('new_password'),
    //     new_password_again: formData.get('new_password_again'),
    //     uid: formData.get('uid'),
    //     token: formData.get('token'),
    // });
    const response = await usersApi.usersPasswordResetCreate({
        new_password: formData.get('new_password'),
        new_password_again: formData.get('new_password_again'),
        uid: formData.get('uid'),
        token: formData.get('token'),
    });
    if (response.status === 200) {
        return { type: 'passwordreset', status: true };
    } else if (response.status === 204) {
        return { type: 'outdatedtoken', status: true };
    }
    return { type: 'passwordreset', status: false };
};

/**
 * modifyBikeAction
 *
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} request
 * @param {*} params
 */
const modifyBikeAction = async (auth, setAuth, request, params) => {
    // collect data that needs to be sent to backend
    const data = await request.formData();
    const packageOnly = data.get('changePackageOnly');
    const submission = {
        bike: data.get('changeBikeModel'),
        frame_number: data.get('changeFrameNumber'),
        number: data.get('changeBikeNumber'),
        storage: data.get('changeBikeStorage'),
        state: data.get('changeBikeStatus'),
        package_only: packageOnly === null ? false : packageOnly, // from checkbox value seems to be 'on' or null
    };

    // send data and redirect back to bike list
    // await apiCall(auth, setAuth, `/bikes/stock/${params.id}/`, 'put', submission);
    await bikesApi.bikesStockUpdate(params.id, submission);
    return redirect('/pyorat/pyoravarasto');
};

const createNewBikeAction = async (auth, setAuth, request) => {
    // collect data that needs to be sent to backend
    const data = await request.formData();
    const packageOnly = data.get('changePackageOnly');
    const submission = {
        bike: data.get('changeBikeModel'),
        frame_number: data.get('changeFrameNumber'),
        number: data.get('changeBikeNumber'),
        storage: data.get('changeBikeStorage'),
        state: data.get('changeBikeStatus'),
        package_only: packageOnly === null ? false : packageOnly, // from checkbox value seems to be 'on' or null
    };

    // send data and redirect back to bike list
    // await apiCall(auth, setAuth, `/bikes/stock/`, 'post', submission);
    await bikesApi.bikesStockCreate(submission);
    return redirect('/pyorat/pyoravarasto');
};

const activationAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // const response = await apiCall(auth, setAuth, '/users/activate/', 'post', {
    //     uid: formData.get('uid'),
    //     token: formData.get('token'),
    // });
    const response = await usersApi.usersActivateCreate({
        uid: formData.get('uid'),
        token: formData.get('token'),
    });
    if (response.status === 200) {
        return { type: 'userActivation', status: true };
    }
    return { type: 'userActivation', status: false };
};

const deleteBikeAction = async (auth, setAuth, params) => {
    // await apiCall(auth, setAuth, `/bikes/stock/${params.id}`, 'delete');
    await bikesApi.bikesStockDelete(params.id);
    return redirect('/pyorat/pyoravarasto');
};

/**
 * deletes or modifies a bulletin
 */

const adminBulletinsAction = async (auth, setAuth, request) => {
    if (request.method === 'DELETE') {
        const formData = await request.formData();
        const response = await apiCall(auth, setAuth, `/bulletins/${formData.get('id')}`, 'delete');
        if (response.status === 204) {
            return { type: 'deleted', status: true };
        }
        return { type: 'deleted', status: false };
    }
    const formData = await request.formData();
    const response = await apiCall(auth, setAuth, `/bulletins/${formData.get('id')}`, 'put', {
        title: formData.get('title'),
        content: formData.get('content'),
    });
    if (response.status === 200) {
        return { type: 'modified', status: true };
    }
    return { type: 'modified', status: false };
};

/**
 * Changes read state of message
 */

const adminInboxAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const id = formData.get('id');
    // const response = await apiCall(auth, setAuth, `/contact_forms/${id}/`, 'put', {
    //     name: formData.get('name'),
    //     email: formData.get('email'),
    //     subject: formData.get('subject'),
    //     message: formData.get('message'),
    //     status: formData.get('status'),
    // });
    const response = await contactFormsApi.contactFormsUpdate(id, {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        status: formData.get('status'),
    });
    if (response.status === 200) {
        return { type: 'markasread', status: true };
    }
    return { type: 'markasread', status: false };
};

export {
    userSignupAction,
    frontPageActions,
    contactAction,
    orderEditAction,
    storageCreateAction,
    storageEditAction,
    createBulletinAction,
    userEditAction,
    itemCreateAction,
    itemUpdateAction,
    cartViewAction,
    bikeOrderAction,
    confirmationAction,
    resetEmailAction,
    resetPasswordAction,
    modifyBikeAction,
    createNewBikeAction,
    adminBulletinsAction,
    activationAction,
    deleteBikeAction,
    adminLogOut,
    adminInboxAction,
};
