import PropTypes from 'prop-types';

import { Container } from '@mui/material';

import UserSignupForm from './UserSignupForm';
import LocationSignupForm from './LocationSignupForm';

function SignupPage({ isLocationForm }) {
    return (
        <Container sx={{ marginTop: 1, marginBottom: 1 }}>
            {isLocationForm ? <LocationSignupForm /> : <UserSignupForm />}
        </Container>
    );
}

export default SignupPage;

SignupPage.propTypes = {
    isLocationForm: PropTypes.bool.isRequired,
};
