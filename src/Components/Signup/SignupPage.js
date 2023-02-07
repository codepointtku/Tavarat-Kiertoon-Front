import PropTypes from 'prop-types';

import { Container, Paper } from '@mui/material';

import UserSignupForm from './UserSignupForm';
import LocationSignupForm from './LocationSignupForm';

function SignupPage({ isLocationForm }) {
    return (
        <Paper>
            <Container sx={{ marginTop: 2, marginBottom: 2 }}>
                {isLocationForm ? <LocationSignupForm /> : <UserSignupForm />}
            </Container>
        </Paper>
    );
}

export default SignupPage;

SignupPage.propTypes = {
    isLocationForm: PropTypes.bool.isRequired,
};
