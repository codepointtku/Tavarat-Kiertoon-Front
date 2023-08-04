import { useContext, type Dispatch, type SetStateAction } from 'react';
import { Form, useSubmit, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Typography, Button, Container, Box } from '@mui/material';
import AuthContext from '../../../Context/AuthContext';

interface Props {
    setCurrentOpenDrawer?: Dispatch<SetStateAction<string>> | (() => void);
}

function Welcome({ setCurrentOpenDrawer }: Props) {
    const auth = useContext(AuthContext);
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
                    onClick={() => setCurrentOpenDrawer && setCurrentOpenDrawer('')}
                    component={Link}
                    to="/profiili"
                    fullWidth
                >
                    Siirry profiiliin
                </Button>
                <Button sx={{ mt: 5, mb: 5 }} type="submit" fullWidth>
                    Kirjaudu ulos
                </Button>
            </Box>
        </Container>
    );
}

export default Welcome;
