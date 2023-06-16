import { Dispatch, SetStateAction } from 'react';
import { Form, useSubmit, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Typography, Button, Container, Box } from '@mui/material';
import CloseDrawerButton from './CloseDrawerButton';

interface Props {
    auth: { username: string };
    setCurrentOpenDrawer: Dispatch<SetStateAction<string>>;
}

function Welcome({ auth, setCurrentOpenDrawer }: Props) {
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
                <Button
                    sx={{ mt: 5, backgroundColor: 'primary.dark' }}
                    onClick={() => setCurrentOpenDrawer('')}
                    component={Link}
                    to="profiili"
                    fullWidth
                >
                    Siirry profiiliin
                </Button>
                <Button sx={{ mt: 5, mb: 5 }} type="submit" fullWidth>
                    Kirjaudu ulos
                </Button>
                <CloseDrawerButton setCurrentOpenDrawer={setCurrentOpenDrawer} />
            </Box>
        </Container>
    );
}

export default Welcome;
