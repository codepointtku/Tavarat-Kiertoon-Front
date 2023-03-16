import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Typography, Button, Container, Box } from '@mui/material';
import CloseDrawerButton from './CloseDrawerButton';

function Welcome({ auth, setCurrentOpenDrawer }) {
    const { handleSubmit } = useForm();

    const onSubmit = () => {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
        window.location.reload(true);
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
                <CloseDrawerButton setCurrentOpenDrawer={setCurrentOpenDrawer} />
            </Box>
        </Container>
    );
}

export default Welcome;
