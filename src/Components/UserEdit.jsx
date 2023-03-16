import { MenuItem, TextField, Box, Button, Grid, Container, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
// import { useSubmit } from 'react-router-dom';

function UserEdit() {
    const userData = useLoaderData();
    const [userState, setUserState] = useState(userData[0]);
    const groups = userData[1];
    // const submit = useSubmit();

    const roles = ['superkäyttäjä', 'admin', 'henkilökunta', 'ei käyttöoikeuksia'];

    const handleChange = (key, event, group) => {
        if (key === 'groups') {
            if (event.target.checked) {
                setUserState({ ...userState, [key]: userState.groups.concat(group) });
            } else {
                setUserState({ ...userState, [key]: userState.groups.filter((group_) => group_.id !== group.id) });
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
            setUserState({ ...userState, [key]: checkPermissions(userData[0]) });
        } else {
            setUserState({ ...userState, [key]: userData[0][key] });
        }
    };

    return (
        <>
            <h1 align="center">Muokkaa käyttäjää {userData[0].id}</h1>
            <Box align="center">
                <Container maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField disabled fullWidth defaultValue={userData[0].name} label="Alkuperäinen nimi" />
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
                                defaultValue={userData[0].phone_number}
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

                        <Grid item xs={4}>
                            <TextField
                                disabled
                                fullWidth
                                defaultValue={checkPermissions(userData[0])}
                                label="Alkuperäinen käyttöoikeus"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-select"
                                select
                                fullWidth
                                focused={
                                    userState.permission
                                        ? checkPermissions(userData[0]) !== userState.permission
                                        : false
                                }
                                label="Muokkaa käyttäjän oikeuksia"
                                onChange={(event) => {
                                    handleChange('permission', event);
                                }}
                                value={userState.permission ? userState.permission : checkPermissions(userData[0])}
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
                                sx={{ mt: '8px', ml: '1rem' }}
                                onClick={() => {
                                    revertChange('permission');
                                }}
                            >
                                Peruuta muutokset
                            </Button>
                        </Grid>
                        {groups.map((group) => (
                            <FormControlLabel
                                key={group.id}
                                onChange={(event) => {
                                    handleChange('groups', event, group);
                                }}
                                control={<Checkbox />}
                                label={group.name}
                            />
                        ))}
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
                        console.log(userState);
                    }}
                >
                    Tallenna käyttäjän tiedot
                </Button>
            </h5>
        </>
    );
}

export default UserEdit;
