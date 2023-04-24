import PropTypes from 'prop-types';

import { Container, Paper } from '@mui/material';

import UserSignupForm from './UserSignupForm';
import LocationSignupForm from './LocationSignupForm';

function SignupPage({ isLocationForm }) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const bgColor = 'rgb(' + r + ',' + g + ',' + b + ')';

    console.log(bgColor);

    return (
        <Paper>
            <Container sx={{ marginTop: 1, marginBottom: 1 }}>
                {isLocationForm ? <LocationSignupForm bgColor={bgColor} /> : <UserSignupForm bgColor={bgColor} />}
            </Container>
        </Paper>
    );
}

export default SignupPage;

SignupPage.propTypes = {
    isLocationForm: PropTypes.bool.isRequired,
};
