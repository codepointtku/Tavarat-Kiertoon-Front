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

export { userSignupAction, contactAction };
