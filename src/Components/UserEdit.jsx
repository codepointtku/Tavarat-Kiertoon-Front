import { MenuItem, TextField, Box, Button, Grid, Container } from '@mui/material';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
// import { useSubmit } from 'react-router-dom';

function UserEdit() {
    const userData = useLoaderData();
    const [userState, setUserState] = useState(userData);
    // const submit = useSubmit();

    const roles = ['superkäyttäjä', 'admin', 'henkilökunta', 'ei käyttöoikeuksia'];

    const handleChange = (key, event) => {
        setUserState({ ...userState, [key]: event.target.value });
    };

    const checkChange = (key) => {
        if (userState[key] === userData[key]) {
            return false;
        }
        return true;
    };

    const checkPermissions = (user) => {
        if (user.is_superuser === true) {
            return 'superkäyttäjä';
        }
        if (user.is_admin === true) {
            return 'admin';
        }
        if (user.is_staff === true) {
            return 'henkilökunta';
        }
        return 'ei käyttöoikeuksia';
    };

    const revertChange = (key) => {
        if (key === 'permission') {
            setUserState({ ...userState, [key]: checkPermissions(key) });
        } else {
            setUserState({ ...userState, [key]: userData[key] });
        }
    };

    const applyPermissions = (event) => {
        if (event.target.value === 'superkäyttäjä') {
            setUserState({ ...userState, is_superuser: true });
            handleChange('permission', event);
        } else if (event.target.value === 'admin') {
            setUserState({ ...userState, is_superuser: false, is_admin: true });
            handleChange('permission', event);
        } else if (event.target.value === 'henkilökunta') {
            setUserState({ ...userState, is_superuser: false, is_admin: false, is_staff: true });
            handleChange('permission', event);
        } else {
            setUserState({ ...userState, is_superuser: false, is_admin: false, is_staff: false });
            handleChange('permission', event);
        }
    };

    return (
        <>
            <h1 align="center">Muokkaa käyttäjää {userData.id}</h1>
            <Box align="center">
                <Container maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField disabled fullWidth defaultValue={userData.name} label="Alkuperäinen nimi" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
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
                                defaultValue={userData.phone_number}
                                label="Alkuperäinen numero"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
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
                                defaultValue={userData.email}
                                label="Alkuperäinen sähköposti"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
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
                                onClick={() => {
                                    revertChange('email');
                                }}
                            >
                                Peruuta muutokset
                            </Button>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                disabled
                                fullWidth
                                defaultValue={checkPermissions(userData)}
                                label="Alkuperäinen käyttöoikeus"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-select"
                                select
                                fullWidth
                                focused={
                                    userState.permission ? checkPermissions(userData) !== userState.permission : false
                                }
                                label="Muokkaa käyttäjän oikeuksia"
                                onChange={(event) => {
                                    applyPermissions(event);
                                }}
                                value={userState.permission ? userState.permission : checkPermissions(userData)}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                onClick={() => {
                                    revertChange('permission');
                                }}
                            >
                                Peruuta muutokset
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <h5 align="center">
                <Button
                    onClick={() => {
                        /*
                        submit(
                            {
                                type: 'put',
                                ...userData,
                            },
                            { method: 'post' }
                        );
                        */
                        console.log(userData);
                    }}
                >
                    Tallenna käyttäjän tiedot
                </Button>
            </h5>
        </>
    );
}

export default UserEdit;
