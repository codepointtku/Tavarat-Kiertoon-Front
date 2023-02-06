import { useState } from 'react';

import { Container, Paper, Button } from '@mui/material';

import UserSignupForm from './UserSignupForm';
import LocationSignupForm from './LocationSignupForm';

function SignupPage() {
    const [visibleForm, setVisibleForm] = useState(true);

    return (
        <Paper>
            <Container
                id="signupforms-wrapper"
                // sx={{ backgroundColor: 'pink' }}
            >
                {/* <Typography variant="body1" paragraph>
                        Hi mom
                    </Typography> */}
                {visibleForm ? <UserSignupForm /> : <LocationSignupForm />}
            </Container>
            <Button onClick={() => setVisibleForm(!visibleForm)}>paina mua</Button>
        </Paper>
    );
}

export default SignupPage;
