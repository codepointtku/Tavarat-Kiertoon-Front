import axios from 'axios';

/**
 * create new user
 */
const userSignupAction = async ({ request }) => {
    const formData = await request.formData();
    const response = await axios.post('http://localhost:8000/users/create/', {
        first_name: formData.get('firstname'),
        last_name: formData.get('lastname'),
        email: formData.get('email'),
        phone_number: formData.get('phonenumber'),
        password: formData.get('password'),
        joint_user: formData.get('jointuser'),
        contact_person: formData.get('contactperson'),
    });
    console.log(response);
    return null;
};

const contactAction = async ({ request }) => {
    const formData = await request.formData();
    const response = await axios.post('http://localhost:8000/contact_forms/', formData);
    console.log(response);
    return response.data || null;
};

const orderEditAction = async ({ params, request }) => {
    const formData = await request.formData();
    // const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
    // const productName = formData.get('productName');
    if (request.method === 'POST') {
        if (formData.get('type') === 'delete') {
            const response = await axios.delete(`http://localhost:8000/orders/${params.id}`, {
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
            const response = await axios.put(`http://localhost:8000/orders/${params.id}`, {
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

const storageEditAction = async ({ params, request }) => {
    const formData = await request.formData();
    if (request.method === 'POST') {
        if (formData.get('type') === 'put') {
            const response = await axios.put(`http://localhost:8000/storages/${params.id}`, {
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

export { userSignupAction, contactAction, orderEditAction, storageEditAction };
