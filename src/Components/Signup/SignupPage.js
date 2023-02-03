import { useState } from 'react';

import { Box, Container, Paper, Button } from '@mui/material';

import SignupHeader from './SignupHeader';
import UserSignupForm from './UserSignupForm';
import LocationSignupForm from './LocationSignupForm';

function SignupPage() {
    const [visibleForm, setVisibleForm] = useState(true);

    return (
        <Box>
            <Button onClick={() => setVisibleForm(!visibleForm)}>paina mua</Button>
            <Paper>
                <Container maxWidth="md">
                    {/* <Typography variant="body1" paragraph>
                        Hi mom
                    </Typography> */}
                    <SignupHeader />
                    {visibleForm ? <UserSignupForm /> : <LocationSignupForm />}
                </Container>
            </Paper>
        </Box>
    );
}

export default SignupPage;
