import { redirect } from 'react-router-dom';
import apiCall from '../Utils/apiCall';
import {
    bikesApi,
    bulletinsApi,
    contactFormsApi,
    // contactsApi,
    ordersApi,
    productsApi,
    shoppingCartApi,
    storagesApi,
    userApi,
    usersApi,
} from '../api';

const adminLogOut = async ({ request }) => {
    if (request.method === 'POST') {
        await usersApi.usersLogoutCreate();
        return { type: 'logout', status: true };
    }
    return { type: 'logout', status: false };
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
        // console.log('is in delete block');
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

const userSignupAction = async (request) => {
    // both single user signup form and location signup form use this same action
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

    try {
        const response = await usersApi.usersCreateCreate(userSignUpValues);
        if (response.status === 201) {
            return { type: 'create', status: true, message: response.data.message };
        }
        if (response.status === 400) {
            return { type: 'create', status: false, message: response.data.message };
        }
    } catch (error) {
        return { type: 'create', status: false, message: request.responseText };
    }

    return { type: 'create', status: false, r: 'returnauksien returnaus' };
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
 * edits order data
 */
const orderEditAction = async ({ request, params }) => {
    const formData = await request.formData();

    const submission = {
        id: formData.get('orderId'),
        contact: formData.get('contact'),
        phone_number: formData.get('phoneNumber'),
        delivery_address: formData.get('deliveryAddress'),
        status: formData.get('status'),
        order_info: formData.get('orderInfo'),
        product_items: JSON.parse(formData.get('productItems')),
    };

    const response = await ordersApi.ordersUpdate(params.id, submission);

    if (response.status === 202) {
        return { type: 'orderupdate', status: true };
    }
    return { type: 'orderupdate', status: false };
};

// return redirect(`/varasto/tilaukset/${params.id}`);

/*
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
}
*/

const orderDeleteAction = async ({ params }) => {
    await ordersApi.ordersDestroy(params.id);
    return redirect('/admin/tilaukset');
};

/*
 * Creates a new storage
 */
const storageCreateAction = async ({ request }) => {
    const formData = await request.formData();

    const newStorage = {
        name: formData.get('name'),
        address: formData.get('address'),
        in_use: formData.get('in_use') === 'Käytössä' ? true : false,
    };

    const response = await storagesApi.storagesCreate(newStorage);

    if (response.status === 201) {
        return { type: 'createstorage', status: true };
    }

    return { type: 'createstorage', status: false };
};

/**
 * Edits storage information
 */
const storageEditAction = async ({ request, params }) => {
    const formData = await request.formData();

    const response = await storagesApi.storagesUpdate(params.id, {
        address: formData.get('address'),
        name: formData.get('name'),
        zip_code: formData.get('zip_code'),
        city: formData.get('city'),
        in_use: formData.get('in_use') === 'Käytössä' ? true : false,
    });

    if (response.status === 200) {
        return { type: 'updatestorage', status: true };
    }

    return { type: 'updatestorage', status: false };
};

/**
 * Deletes storage information
 */
const storageDeleteAction = async ({ params }) => {
    await storagesApi.storagesDestroy(params.id);
    return redirect('/admin/varastot');
};

/**
 * Products transfer
 */
const productsTransferAction = async ({ request }) => {
    const formData = await request.formData();

    const selectedStorage = JSON.parse(formData.get('storage_to'));
    const productIds = JSON.parse(formData.get('product_ids'));
    // const productIds = formData.get('product_ids');

    // console.log('%c selected storage a:', 'color: green; font-weight: bold', selectedStorage);
    console.log('%c selected prodIds a:', 'color: red; font-weight: bold', productIds);

    const transfer = {
        storage: selectedStorage,
        product_items: productIds,
    };

    // console.log('transfer a:', transfer);

    const response = await productsApi.productsTransferUpdate(transfer);

    if (productIds.length === 0 && response.status === 200) {
        return { type: 'productstransferempty', status: true };
    }
    if (response.status === 200) {
        return { type: 'productstransfer', status: true };
    }

    return { type: 'productstransfer', status: false };
};

const userEditAction = async ({ request, params }) => {
    // This action handles user data: info and users auth groups.
    // User data has different BE endpoints for these different user data sections.

    // First apicall updates users editable info.
    // Second apicall updates users auth groups: BE expects integers (representing different auth groups) in an array.
    // - Get all the checked checkboxes values into an array's first index.
    // - The array is then splitted by comma into an array of strings. These values are then mapped into an array of integers,
    // - and then sent to the BE in a composition BE expects.

    const formData = await request.formData();

    const userInfo = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone_number: formData.get('phone_number'),
    };

    const selectedAuthGroups = formData
        .getAll('groups')[0]
        .split(',')
        .map((group) => Number(group));

    const userInfoUpdateResponse = await usersApi.usersUpdate(params.userid, userInfo);
    const userPermissionsUpdateResponse = await usersApi.usersGroupsPermissionUpdate(params.userid, {
        groups: selectedAuthGroups,
    });

    if (userInfoUpdateResponse.status === 200 && userPermissionsUpdateResponse.status === 200) {
        return { type: 'update', status: true };
    }

    return { type: 'update', status: false };
};

const adminUserAddressEditAction = async ({ request, params }) => {
    const formData = await request.formData();

    const modifiedAddress = {
        address: formData.get('address'),
        zip_code: formData.get('zip_code'),
        city: formData.get('city'),
        user: params.userid,
    };

    const userAddressUpdateResponse = await usersApi.usersAddressUpdate(params.aid, modifiedAddress);

    if (userAddressUpdateResponse.status === 200) {
        return { type: 'addressupdate', status: true };
    }

    return { type: 'addressupdate', status: false };
};

const adminUserAddressCreateAction = async ({ request, params }) => {
    const formData = await request.formData();

    const newAddress = {
        address: formData.get('address'),
        zip_code: formData.get('zip_code'),
        city: formData.get('city'),
        user: params.userid,
    };

    const userAddressCreateResponse = await usersApi.usersAddressCreate(newAddress);

    if (userAddressCreateResponse.status === 201) {
        return { type: 'addresscreate', status: true };
    }

    return { type: 'addresscreate', status: false };
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

    const response = await ordersApi.ordersCreate({
        contact: formData.get('email'),
        delivery_address: formData.get('deliveryAddress'),
        phone_number: formData.get('phoneNumber'),
        user: Number(formData.get('id')),
        order_info: formData.get('orderInfo'),
        delivery_required: formData.get('deliveryRequired'),
        status: 'Waiting',
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
        color: data.get('bikeColorIdSelect'),
        frame_number: data.get('bikeFrameNumberTextField'),
        number: data.get('bikeNumberTextField'),
        storage: data.get('bikeStorageIdSelect'),
        state: data.get('bikeStatusSelect'),
        package_only: packageOnly === null ? false : packageOnly, // from checkbox value seems to be 'on' or null
    };

    // send data and redirect back to bike list
    await bikesApi.bikesStockUpdate(params.id, submission);
    return redirect('/pyorat/pyoravarasto/pyoralista');
};

const createNewBikeAction = async (auth, setAuth, request) => {
    // collect data that needs to be sent to backend
    const data = await request.formData();
    const packageOnly = data.get('bikePackageOnlyCheckBox');
    const submission = {
        bike: data.get('bikeModelIdSelect'),
        color: data.get('bikeColorIdSelect'),
        frame_number: data.get('bikeFrameNumberTextField'),
        number: data.get('bikeNumberTextField'),
        storage: data.get('bikeStorageIdSelect'),
        state: data.get('bikeStatusSelect'),
        package_only: packageOnly === null ? false : packageOnly, // from checkbox value seems to be 'on' or null
    };

    // send data and redirect back to bike list
    await bikesApi.bikesStockCreate(submission);
    return redirect('/pyorat/pyoravarasto/pyoralista');
};

/**
 * Update the 'packet_only' flag on each individual bike
 * This function is needed when individual bikes are not put on packets. Instead the packets
 * just know how many of each bikeModel is included in the package
 */
const updateBikesStockPacketOnlyFlag = async () => {
    // create a list of all bike ID's and their amounts
    const allPackets = await bikesApi.bikesPackagesList();
    const bikeAmounts = [];
    // loop through all bikeIds in all packets
    allPackets.data.forEach((packet) => {
        packet.bikes.forEach((bike) => {
            const index = bikeAmounts.findIndex((entry) => entry.bikeId === bike.bike);
            if (index < 0) {
                // bikeId not found, create new bikeId and amount
                const newEntry = { bikeId: bike.bike, amount: bike.amount };
                bikeAmounts.push(newEntry);
            } else {
                // add amount to existing bikeId
                bikeAmounts[index].amount += bike.amount;
            }
        });
    });

    // Get all bikes, compare their package_only flagged bike amounts to packets amounts
    // and change the needed number of flags to true or false
    const allBikes = await bikesApi.bikesStockList();
    const uniqueBikeIds = [...new Set(allBikes.data.map((item) => item.bike.id))];
    for (const uniqueBikeId of uniqueBikeIds) {
        const bikesWithuniqueBikeId = allBikes.data.filter((item) => item.bike.id === uniqueBikeId);
        const amountNeeded = bikeAmounts.find((item) => item.bikeId === uniqueBikeId)?.amount ?? 0;
        // bikes with packet_only === true
        for (let i = 0; i < amountNeeded; i++) {
            const newBike = {
                ...bikesWithuniqueBikeId[i],
                bike: bikesWithuniqueBikeId[i].bike.id,
                package_only: true,
            };
            await bikesApi.bikesStockUpdate(bikesWithuniqueBikeId[i].id, newBike);
        }
        // bikes with packet_only === false
        for (let i = amountNeeded; i < bikesWithuniqueBikeId.length; i++) {
            const newBike = {
                ...bikesWithuniqueBikeId[i],
                bike: bikesWithuniqueBikeId[i].bike.id,
                package_only: false,
            };
            await bikesApi.bikesStockUpdate(bikesWithuniqueBikeId[i].id, newBike);
        }
    }
};

/**
 * Modify existing bike packet
 *
 * @param {*} request
 * @param {*} params
 * @returns
 */
const modifyBikePacketAction = async (request, params) => {
    // collect data that needs to be sent to backend
    const data = await request.formData();
    const submission = {
        name: data.get('packetName'),
        description: data.get('packetDescription'),
        bikes: JSON.parse(data.get('bikes')),
    };

    // send data and redirect back to bike list
    await bikesApi.bikesPackagesUpdate(params.id, submission);
    await updateBikesStockPacketOnlyFlag();
    return redirect('/pyorat/pyoravarasto/pyorapaketit/');
};

/**
 * Create a new bike packet
 *
 * @param {*} request
 * @returns
 */
const createNewPacketAction = async (request) => {
    // collect data that needs to be sent to backend
    const data = await request.formData();
    const submission = {
        name: data.get('packetName'),
        description: data.get('packetDescription'),
        bikes: JSON.parse(data.get('bikes')),
    };

    // send data and redirect back to bike list
    await bikesApi.bikesPackagesCreate(submission);
    await updateBikesStockPacketOnlyFlag();
    return redirect('/pyorat/pyoravarasto/pyorapaketit/');
};

/**
 * Delete existing bike packet
 *
 * @param {*} params
 * @returns
 */
const deletePacketAction = async (params) => {
    await bikesApi.bikesPackagesDestroy(params.id);
    await updateBikesStockPacketOnlyFlag();

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
    await bikesApi.bikesStockDestroy(params.id);
    return redirect('/pyorat/pyoravarasto/pyoralista');
};

/**
 * Delete a single bike model
 */
const deleteBikeModelAction = async (auth, setAuth, params) => {
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

    let bikeName =
        data.get('bikeModelSizeName') + '" ' + data.get('bikeModelTypeName') + ' ' + data.get('bikeModelBrandName');
    if (typeId <= 0) {
        const response = await bikesApi.bikesTypeCreate({ name: data.get('bikeModelTypeName') });
        typeId = response.data.id;
    }
    let brandId = data.get('bikeModelBrandId');
    if (brandId <= 0) {
        const response = await bikesApi.bikesBrandCreate({ name: data.get('bikeModelBrandName') });
        brandId = response.data.id;
    }
    let sizeId = data.get('bikeModelSizeId');
    if (sizeId <= 0) {
        const response = await bikesApi.bikesSizeCreate({ name: data.get('bikeModelSizeName') });
        sizeId = response.data.id;
    }
    return { typeId, brandId, sizeId, bikeName };
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
    const { typeId, brandId, sizeId, bikeName } = await getOrCreateBikeModelIds(auth, setAuth, data);

    // append modified data to form data
    data.append('name', bikeName);
    data.append('description', data.get('bikeModelDescription'));
    data.append('color', 1);
    data.append('type', typeId);
    data.append('brand', brandId);
    data.append('size', sizeId);

    // send data and redirect
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
    const { typeId, brandId, sizeId, bikeName } = await getOrCreateBikeModelIds(auth, setAuth, data);

    // append modified data to form data
    data.append('name', bikeName);
    data.append('description', data.get('bikeModelDescription'));
    data.append('color', 1);
    data.append('type', typeId);
    data.append('brand', brandId);
    data.append('size', sizeId);

    // send data and redirect
    await bikesApi.bikesModelsCreate(data, { headers: { 'Content-Type': 'multipart/form-data' } });
    return redirect('/pyorat/pyoravarasto/pyoramallit');
};

/**
 * deletes or modifies a bulletin
 */
const adminBulletinsAction = async ({ request, params }) => {
    const formData = await request.formData();

    if (request.method === 'DELETE') {
        const response = await bulletinsApi.bulletinsDestroy(formData.get('id'));
        if (response.status === 204) {
            return { type: 'bulletindelete', status: true };
        }
        return { type: 'bulletindelete', status: false };
    }

    if (request.method === 'PUT') {
        const response = await bulletinsApi.bulletinsUpdate(params.id, {
            title: formData.get('title'),
            content: formData.get('content'),
        });

        if (response.status === 200) {
            return { type: 'bulletinedit', status: true };
        }
        return { type: 'bulletinedit', status: false };
    }

    return null;
};

/**
 * create a new bulletin post
 */
const createBulletinAction = async ({ request }) => {
    const formData = await request.formData();
    const response = await bulletinsApi.bulletinsCreate(Object.fromEntries(formData.entries()));

    if (response.status === 201) {
        return { type: 'bulletincreate', status: true };
    }

    return { type: 'bulletincreate', status: false };
};

/**
 * Changes read state of message
 */

const adminInboxAction = async ({ request }) => {
    const formData = await request.formData();
    const id = Number(formData.get('id'));

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

const adminEmailRecipientsAction = async ({ request }) => {
    const formData = await request.formData();
    const recipient = formData.get('email');
    const id = formData.get('id');
    console.log(id);

    if (request.method === 'POST') {
        await ordersApi.ordersEmailrecipientsCreate({ email: recipient });
        return { type: 'emailrecipient', status: true };
    }

    if (request.method === 'DELETE') {
        console.log('actionis', id);
        await ordersApi.ordersEmailrecipientsDestroy(id);
        return { type: 'emailrecipient-del', status: true };
    }

    return { type: 'emailrecipient', status: false };
};

const userProfilePageAction = async (request) => {
    const formData = await request.formData();
    const response = await userApi.userUpdate({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone_number: formData.get('phone_number'),
    });
    if (response.status === 200) {
        return { type: 'userinfoupdated', status: true };
    }
    return { type: 'userinfoupdated', status: false };
};

const modifyUserAddressesAction = async (request) => {
    const formData = await request.formData();
    if (request.method === 'PUT') {
        const response = await userApi.userAddressEditUpdate({
            id: formData.get('id'),
            address: formData.get('address'),
            city: formData.get('city'),
            zip_code: formData.get('zip_code'),
        });
        if (response.status === 200) {
            return { type: 'addressmodified', status: true };
        }
        return { type: 'addressmodified', status: false };
    }
    const response = await userApi.userAddressEditCreate({
        address: formData.get('address'),
        city: formData.get('city'),
        zip_code: formData.get('zip_code'),
    });
    if (response.status === 200) {
        return { type: 'addresscreated', status: true };
    }
    return { type: 'addresscreated', status: false };
};

export {
    userSignupAction,
    frontPageActions,
    contactAction,
    orderEditAction,
    orderDeleteAction,
    storageCreateAction,
    storageEditAction,
    storageDeleteAction,
    productsTransferAction,
    createBulletinAction,
    userEditAction,
    adminUserAddressEditAction,
    adminUserAddressCreateAction,
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
    modifyBikePacketAction,
    adminInboxAction,
    adminEmailRecipientsAction,
    createBikeModelAction,
    deleteBikeModelAction,
    emailChangeSuccessfulAction,
    changeEmailAction,
    userProfilePageAction,
    createNewPacketAction,
    deletePacketAction,
    modifyUserAddressesAction,
};
