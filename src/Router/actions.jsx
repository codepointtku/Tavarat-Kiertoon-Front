import { redirect } from 'react-router-dom';
import apiCall from '../Utils/apiCall';
import {
    bikesApi,
    bulletinsApi,
    contactFormsApi,
    // contactsApi,
    ordersApi,
    shoppingCartApi,
    storagesApi,
    userApi,
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
            // await usersApi.usersLogoutCreate();
            if (response.status === 200) {
                // return { type: 'logout', status: true };
                return redirect('/');
            }
            // return { type: 'logout', status: false };
        }
    }
};

/**
 * logins or logouts user, adds a product to shopping cart and deletes product from shopping cart
 */
const frontPageActions = async ({ request }) => {
    const formData = await request.formData();
    const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
    const amount = formData.has('amount') ? Number(formData.get('amount')) : request.method === 'PUT' ? 1 : 0;
    if (request.method === 'POST') {
        if (formData.get('password')) {
            const response = await usersApi.usersLoginCreate({
                username: formData.get('email'),
                password: formData.get('password'),
            });
            if (response.status === 200) {
                return { type: 'login', status: true };
            }
            return { type: 'login', status: false };
        } else {
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
    }
    if (request.method === 'PUT') {
        if (!id) {
            // clear cart if no id is being sent or clear cart and return "type: orderCreated" when a new order is created.
            // const response = await apiCall(auth, setAuth, '/shopping_cart/', 'put', {
            //     amount: -1,
            // });
            const response = await shoppingCartApi.shoppingCartUpdate({
                amount: -1,
            });
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
    // This action handles user data: info, addressinfo and users auth groups.
    // User data has different BE endpoints for different user data sections.

    // First apicall updates users editable info.
    // Second apicall patches users addressinfo. (not finalized, working on it)

    // Third apicall updates users auth groups: BE expects integers (representing different auth groups) in an array.
    // It gets all the checked checkboxes values into an array's first index.
    // The array is then splitted by comma into an array of strings. These indexes are then mapped into an array of integers,
    // and then sent to the BE in a composition BE expects.

    const formData = await request.formData();
    // let response = await apiCall(auth, setAuth, `/users/${params.id}/`, 'put', {
    //     first_name: formData.get('first_name'),
    //     last_name: formData.get('last_name'),
    //     phone_number: formData.get('phone_number'),
    // });

    let response = await usersApi.usersUpdate(params.id, {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone_number: formData.get('phone_number'),
    });

    // works if used perfectly. needs more validation. not yet ready for production. disabled for this pr.
    // const newAddress = {
    //     address: formData.get('address'),
    //     zipcode: formData.get('zip_code'),
    //     city: formData.get('city'),
    // };

    // response = await apiCall(auth, setAuth, `/users/address/${params.id}/`, 'patch', newAddress);

    const selectedAuthGroups = formData
        .getAll('groups')[0]
        .split(',')
        .map((group) => Number(group));
    // response = await apiCall(auth, setAuth, `/users/${params.id}/groups/permission/`, 'put', {
    //     groups: selectedAuthGroups,
    // });

    response = await usersApi.usersGroupsPermissionUpdate(params.id, { groups: selectedAuthGroups });

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

const cartViewAction = async ({ request }) => {
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

const confirmationAction = async ({ request }) => {
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
        user: Number(formData.get('id')),
        order_info: formData.get('orderInfo'),
        // products: formData.get('productIds'),
    });
    if (response.status === 201) {
        return { type: 'orderCreated', status: true };
    }
    return { type: 'orderCreated', status: false };
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
    const packageOnly = data.get('bikePackageOnlyCheckBox');
    const submission = {
        bike: data.get('bikeModelIdSelect'),
        frame_number: data.get('bikeFrameNumberTextField'),
        number: data.get('bikeNumberTextField'),
        storage: data.get('bikeStorageIdSelect'),
        state: data.get('bikeStatusSelect'),
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
    const packageOnly = data.get('bikePackageOnlyCheckBox');
    const submission = {
        bike: data.get('bikeModelIdSelect'),
        frame_number: data.get('bikeFrameNumberTextField'),
        number: data.get('bikeNumberTextField'),
        storage: data.get('bikeStorageIdSelect'),
        state: data.get('bikeStatusSelect'),
        package_only: packageOnly === null ? false : packageOnly, // from checkbox value seems to be 'on' or null
    };

    // send data and redirect back to bike list
    // await apiCall(auth, setAuth, `/bikes/stock/`, 'post', submission);
    await bikesApi.bikesStockCreate(submission);
    return redirect('/pyorat/pyoravarasto');
};

// kommentti
const modifyBikeOrderAction = async (auth, setAuth, request, params) => {
    console.log('p:', params);
    // collect data that needs to be sent to backend
    const data = await request.formData();
    // console.log('### data', data);
    const submission = {
        name: data.get('packetName'),
        description: data.get('packetDescription'),
        bikes: JSON.parse(data.get('bikes')),
    };
    // send data and redirect back to bike list
    // await apiCall(auth, setAuth, `/bikes/packages/${params.id}/`, 'put', submission);
    console.log('### submission', submission);
    await bikesApi.bikesPackagesUpdate(params.id, submission);
    return redirect('/pyorat/pyoravarasto/pyorapaketit/');
};
const createNewPacketAction = async (auth, setAuth, request) => {
    console.log('### createNewPacketAction');
    // collect data that needs to be sent to backend
    const data = await request.formData();
    const submission = {
        name: data.get('packetName'),
        description: data.get('packetDescription'),
        bikes: JSON.parse(data.get('bikes')),
    };

    // send data and redirect back to bike list
    // await apiCall(auth, setAuth, `/bikes/stock/`, 'post', submission);
    await bikesApi.bikesPackagesCreate(submission);
    return redirect('/pyorat/pyoravarasto/pyorapaketit/');
};
const deletePacketAction = async (auth, setAuth, params) => {
    console.log('### deletePacketAction');
    // await apiCall(auth, setAuth, `/bikes/stock/${params.id}`, 'delete');
    await bikesApi.bikesPackagesDestroy(params.id);
    return redirect('/pyorat/pyoravarasto/pyorapaketit/');
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

const changeEmailAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // const response = await apiCall(auth, setAuth, '/users/emailchange/', 'post', {
    //     new_email: formData.get('newEmail'),
    // });
    const response = await usersApi.usersEmailchangeCreate({
        new_email: formData.get('newEmail'),
    });

    if (response.status === 200) {
        return { type: 'changeEmail', status: true };
    }
    return { type: 'changeEmail', status: false };
};

const emailChangeSuccessfulAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    // const response = await apiCall(auth, setAuth, '/users/emailchange/finish/', 'post', {
    //     uid: formData.get('uid'),
    //     token: formData.get('token'),
    //     new_email: formData.get('newEmail'),
    // });
    const response = await usersApi.usersEmailchangeFinishCreate({
        uid: formData.get('uid'),
        token: formData.get('token'),
        new_email: formData.get('newEmail'),
    });

    if (response.status === 200) {
        return { type: 'emailchangesuccessful', status: true };
    }
    return { type: 'emailchangesuccessful', status: false };
};

/**
 * Delete a single bike
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} params
 * @returns
 */
const deleteBikeAction = async (auth, setAuth, params) => {
    // await apiCall(auth, setAuth, `/bikes/stock/${params.id}`, 'delete');
    await bikesApi.bikesStockDestroy(params.id);
    return redirect('/pyorat/pyoravarasto');
};

/**
 * Delete a single bike model
 */
const deleteBikeModelAction = async (auth, setAuth, params) => {
    // await apiCall(auth, setAuth, `/bikes/models/${params.id}`, 'delete');
    await bikesApi.bikesModelsDestroy(params.id);
    return redirect('/pyorat/pyoravarasto/pyoramallit');
};

/**
 * getOrCreateBikeModelIds
 * Read type, brand and size ids from data. If an id is greater than 0 this value is already created => use it.
 * Else this is a new value and needs to be created in the backend => Create the new value and return its ID
 *
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} data
 * @returns
 */
const getOrCreateBikeModelIds = async (auth, setAuth, data) => {
    // if selected type, brand or size do not exist they need to be created
    // need to create new is indicated by setting the bikeModelXXXId to -1 in the form
    let typeId = data.get('bikeModelTypeId');
    if (typeId <= 0) {
        // const response = await apiCall(auth, setAuth, `/bikes/type/`, 'post', { name: data.get('bikeModelTypeName') });
        const response = await bikesApi.bikesTypeCreate({ name: data.get('bikeModelTypeName') });
        typeId = response.data.id;
    }
    let brandId = data.get('bikeModelBrandId');
    if (brandId <= 0) {
        // const response = await apiCall(auth, setAuth, `/bikes/brand/`, 'post', {
        //     name: data.get('bikeModelBrandName'),
        // });
        const response = await bikesApi.bikesBrandCreate({ name: data.get('bikeModelBrandName') });
        brandId = response.data.id;
    }
    let sizeId = data.get('bikeModelSizeId');
    if (sizeId <= 0) {
        // const response = await apiCall(auth, setAuth, `/bikes/size/`, 'post', { name: data.get('bikeModelSizeName') });
        const response = await bikesApi.bikesSizeCreate({ name: data.get('bikeModelSizeName') });
        sizeId = response.data.id;
    }
    return { typeId, brandId, sizeId };
};

/**
 * Modify a single bike model.
 * During modification it is possible to create new brandname, size and/or type.
 *
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} request
 * @param {*} params
 * @returns
 */
const modifyBikeModelAction = async (auth, setAuth, request, params) => {
    // get data from form
    const data = await request.formData();

    // get or create new ids for type, brand and size
    const { typeId, brandId, sizeId } = await getOrCreateBikeModelIds(auth, setAuth, data);

    // append modified data to form data
    data.append('name', data.get('bikeModelName'));
    data.append('description', data.get('bikeModelDescription'));
    data.append('color', data.get('bikeModelColorId'));
    data.append('type', typeId);
    data.append('brand', brandId);
    data.append('size', sizeId);

    // send data and redirect
    // await apiCall(auth, setAuth, `/bikes/models/${params.id}/`, 'put', data, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    // });
    await bikesApi.bikesModelsUpdate(params.id, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    return redirect('/pyorat/pyoravarasto/pyoramallit');
};

/**
 * Create a new bike model.
 * During creation it is possible to create new brandname, size and/or type.
 *
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} request
 * @returns
 */
const createBikeModelAction = async (auth, setAuth, request) => {
    // get data from form
    const data = await request.formData();

    // get or create new ids for type, brand and size
    const { typeId, brandId, sizeId } = await getOrCreateBikeModelIds(auth, setAuth, data);

    // append modified data to form data
    data.append('name', data.get('bikeModelName'));
    data.append('description', data.get('bikeModelDescription'));
    data.append('color', data.get('bikeModelColorId'));
    data.append('type', typeId);
    data.append('brand', brandId);
    data.append('size', sizeId);

    // send data and redirect
    // await apiCall(auth, setAuth, `/bikes/models/`, 'post', data, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    // });
    await bikesApi.bikesModelsCreate(data, { headers: { 'Content-Type': 'multipart/form-data' } });

    return redirect('/pyorat/pyoravarasto/pyoramallit');
};

/**
 * deletes or modifies a bulletin
 * @param {*} auth
 * @param {*} setAuth
 * @param {*} request
 * @returns
 */
const adminBulletinsAction = async (auth, setAuth, request) => {
    if (request.method === 'DELETE') {
        const formData = await request.formData();
        // const response = await apiCall(auth, setAuth, `/bulletins/${formData.get('id')}`, 'delete');
        const response = await bulletinsApi.bulletinsRetrieve(formData.get('id'));
        if (response.status === 204) {
            return { type: 'deleted', status: true };
        }
        return { type: 'deleted', status: false };
    }
    const formData = await request.formData();
    // const response = await apiCall(auth, setAuth, `/bulletins/${formData.get('id')}`, 'put', {
    //     title: formData.get('title'),
    //     content: formData.get('content'),
    // });
    const response = await bulletinsApi.bulletinsUpdate(formData.get('id'), {
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
    const id = Number(formData.get('id'));
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

const userProfilePageAction = async (auth, setAuth, request) => {
    const formData = await request.formData();
    const response = await userApi.userUpdate({
        username: formData.get('username'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone_number: formData.get('phone_number'),
    });
    // apiCall(auth, setAuth, '/user/', 'put', formData);
    if (response.status === 200) {
        return { type: 'markasread', status: true };
    }
    return { type: 'markasread', status: false };
};

const modifyUserAddressesAction = async (request) => {
    const formData = await request.formData();
    if (request.formData === 'PUT') {
        const response = await userApi.userAddressEditUpdate({
            id: formData.get('id'),
            address: formData.get('address'),
            city: formData.get('city'),
            zip_code: formData.get('zip_code'),
        });
        if (response.status === 200) {
            return { type: 'addressModified', status: true };
        }
        return { type: 'addressModified', status: false };
    }
    const response = await userApi.userAddressEditCreate({
        address: formData.get('address'),
        city: formData.get('city'),
        zip_code: formData.get('zip_code'),
    });
    if (response.status === 200) {
        return { type: 'addressCreated', status: true };
    }
    return { type: 'addressCreated', status: false };
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
    modifyBikeModelAction,
    deleteBikeAction,
    adminLogOut,
    modifyBikeOrderAction,
    adminInboxAction,
    createBikeModelAction,
    deleteBikeModelAction,
    emailChangeSuccessfulAction,
    changeEmailAction,
    userProfilePageAction,
    createNewPacketAction,
    deletePacketAction,
    modifyUserAddressesAction,
};
