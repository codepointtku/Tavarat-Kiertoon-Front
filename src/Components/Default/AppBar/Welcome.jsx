import { Form, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Typography, Button, Container, Box } from '@mui/material';

function Welcome({ auth }) {
    const { handleSubmit } = useForm();
    const submit = useSubmit();

    const onSubmit = () => {
        submit(null, {
            method: 'post',
            action: '/',
        });
    };

    return (
        <Container maxWidth="xs" component={Form} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4" align="center" color="primary.main" sx={{ mt: 5 }}>
                    Tervetuloa {auth.username}!
                </Typography>
                <Button sx={{ mt: 5, mb: 5 }} type="submit" fullWidth>
                    Kirjaudu ulos
                </Button>
            </Box>
        </Container>
    );
}

export default Welcome;
