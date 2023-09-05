import { Form, useSubmit, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Typography, Button, Container, Stack } from '@mui/material';

import CloseDrawerButton from './CloseDrawerButton';
import Tooltip from '../../Tooltip';

import type { Dispatch, SetStateAction } from 'react';

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
        sessionStorage.clear();
    };

    return (
        <Container maxWidth="xs" component={Form} onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Typography variant="h4" align="center" color="primary.main" sx={{ mt: 5 }}>
                    Tervetuloa {auth.username}!
                </Typography>
                <Tooltip title="Katsele tilauksiasi, tarkastele ja muokkaa tietojasi">
                    <Button
                        id="accountpage-link-btn"
                        sx={{ mt: 5, backgroundColor: 'primary.dark' }}
                        onClick={() => setCurrentOpenDrawer('')}
                        component={Link}
                        to="tili"
                        fullWidth
                    >
                        Tili
                    </Button>
                </Tooltip>
                <Button id="logout-btn" sx={{ mt: 5, mb: 5 }} type="submit" fullWidth>
                    Kirjaudu ulos
                </Button>
                <CloseDrawerButton setCurrentOpenDrawer={setCurrentOpenDrawer} />
            </Stack>
        </Container>
    );
}

export default Welcome;
