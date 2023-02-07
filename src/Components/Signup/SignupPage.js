import { useState } from 'react';

import { Container, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import UserSignupForm from './UserSignupForm';
import LocationSignupForm from './LocationSignupForm';

function SignupPage() {
    const [showLocationForm, setShowLocationForm] = useState(false);

    const handleChange = (event) => {
        setShowLocationForm(event.target.checked);
    };

    return (
        <Paper>
            <Container
                id="signupforms-wrapper"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'pink',
                }}
            >
                {/* <Typography variant="body1" paragraph>
                        Hi mom
                    </Typography> */}

                {showLocationForm ? <LocationSignupForm /> : <UserSignupForm />}
            </Container>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={showLocationForm} onChange={handleChange} />}
                    label="Luo tili toimipaikalle"
                />
            </FormGroup>
        </Paper>
    );
}

export default SignupPage;
