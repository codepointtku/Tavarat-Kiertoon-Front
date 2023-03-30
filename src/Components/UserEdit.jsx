import { TextField, Box, Button, Grid, Container, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit } from 'react-router-dom';
import AlertBox from './AlertBox';
import ConfirmWindow from './ConfirmWindow';

function UserEdit() {
    const userData = useLoaderData();
    const [userState, setUserState] = useState(userData[0]);
    const groups = userData[1];
    const responseStatus = useActionData();
    const submit = useSubmit();
    const [isOpen, setIsOpen] = useState(false);
    const eventRef = useRef();

    const handleChange = (key, event, group) => {
        if (key === 'groups') {
            if (event.target.checked) {
                setUserState({ ...userState, [key]: userState.groups.concat(group.id) });
            } else {
                setUserState({ ...userState, [key]: userState.groups.filter((group_) => group_ !== group.id) });
            }
        } else {
            setUserState({ ...userState, [key]: event.target.value });
        }
    };

    const checkChange = (key) => {
        if (userState[key] === userData[0][key]) {
            return false;
        }
        return true;
    };

    const revertChange = (key) => {
        setUserState({ ...userState, [key]: userData[0][key] });
    };

    const handleConfirm = (confirm) => {
        if (confirm) {
            submit(eventRef.current, { method: 'post' });
        }
        setIsOpen(false);
    };

    return (
        <>
            <ConfirmWindow
                open={isOpen}
                onConfirm={handleConfirm}
                title="Tallennetaanko käyttäjän tiedot?"
                content={userData[0].name}
            />
            <Form
                method="post"
                onSubmit={(event) => {
                    event.preventDefault();
                    setIsOpen(true);
                    eventRef.current = event.currentTarget;
                }}
            >
                <h1 align="center">Muokkaa käyttäjää {userData[0].id}</h1>
                <Box align="center">
                    <Container maxWidth="md">
                        <Grid container spacing={4}>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    defaultValue={userData[0].name}
                                    label="Alkuperäinen nimi"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="name"
                                    label="Muokkaa nimeä"
                                    fullWidth
                                    focused={checkChange('name')}
                                    onChange={(event) => {
                                        handleChange('name', event);
                                    }}
                                    value={userState.name}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    sx={{ mt: '8px', ml: '1rem' }}
                                    onClick={() => {
                                        revertChange('name');
                                    }}
                                >
                                    Peruuta muutokset
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    defaultValue={userData[0].username}
                                    label="Alkuperäinen käyttäjänimi"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="username"
                                    label="Muokkaa käyttäjänimeä"
                                    fullWidth
                                    focused={checkChange('username')}
                                    onChange={(event) => {
                                        handleChange('username', event);
                                    }}
                                    value={userState.username}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    sx={{ mt: '8px', ml: '1rem' }}
                                    onClick={() => {
                                        revertChange('username');
                                    }}
                                >
                                    Peruuta muutokset
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    defaultValue={userData[0].phone_number}
                                    label="Alkuperäinen numero"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="phone_number"
                                    label="Muokkaa puhelinnumeroa"
                                    fullWidth
                                    focused={checkChange('phone_number')}
                                    onChange={(event) => {
                                        handleChange('phone_number', event);
                                    }}
                                    value={userState.phone_number}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    sx={{ mt: '8px', ml: '1rem' }}
                                    onClick={() => {
                                        revertChange('phone_number');
                                    }}
                                >
                                    Peruuta muutokset
                                </Button>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    defaultValue={userData[0].email}
                                    label="Alkuperäinen sähköposti"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="email"
                                    label="Muokkaa sähköpostia"
                                    fullWidth
                                    focused={checkChange('email')}
                                    onChange={(event) => {
                                        handleChange('email', event);
                                    }}
                                    value={userState.email}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    sx={{ mt: '8px', ml: '1rem' }}
                                    onClick={() => {
                                        revertChange('email');
                                    }}
                                >
                                    Peruuta muutokset
                                </Button>
                            </Grid>

                            <Grid item xs={8}>
                                <Box border="1px solid #CCC" borderRadius="4px">
                                    <Typography padding="0.5rem">Muokkaa käyttöoikeuksia</Typography>
                                    <Grid item xs={13} alignItems="start">
                                        {groups.map((group) => (
                                            <FormControlLabel
                                                name="groups"
                                                key={group.id}
                                                onChange={(event) => {
                                                    handleChange('groups', event, group);
                                                }}
                                                checked={userState.groups.includes(group.id)}
                                                control={<Checkbox />}
                                                label={group.name}
                                                value={group.id}
                                            />
                                        ))}
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    sx={{ mt: '2.6rem', ml: '1rem' }}
                                    onClick={() => {
                                        revertChange('groups');
                                    }}
                                >
                                    Peruuta muutokset
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {responseStatus?.type === 'update' && !responseStatus?.status && (
                    <AlertBox
                        text="Käyttäjän tallennus epäonnistui! Lataa sivu uudestaan."
                        status="error"
                        timer={3000}
                    />
                )}
                {responseStatus?.type === 'update' && responseStatus?.status && (
                    <AlertBox text="Käyttäjän tallennus onnistui!" status="success" timer={3000} />
                )}

                <h5 align="center">
                    <Button type="submit">Tallenna käyttäjän tiedot</Button>
                </h5>
            </Form>
        </>
    );
}

export default UserEdit;
