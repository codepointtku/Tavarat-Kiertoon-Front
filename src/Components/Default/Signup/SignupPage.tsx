import { Container } from '@mui/material';

import UserSignupForm from './UserSignupForm';
import LocationSignupForm from './LocationSignupForm';

interface Props {
    isLocationForm: boolean;
}

function SignupPage({ isLocationForm }: Props) {
    return (
        <Container sx={{ marginTop: 1, marginBottom: 1 }}>
            {isLocationForm ? <LocationSignupForm /> : <UserSignupForm />}
        </Container>
    );
}

export default SignupPage;
