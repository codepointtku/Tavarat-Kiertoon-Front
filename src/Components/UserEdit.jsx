import { TextField, Box, Button, Grid, Container, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
// import { useSubmit } from 'react-router-dom';

function UserEdit() {
    const userData = useLoaderData();
    const [userState, setUserState] = useState(userData[0]);
    const groups = userData[1];
    // const submit = useSubmit();

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

    const revertChange = (key) => {
        setUserState({ ...userState, [key]: userData[0][key] });
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

                        <Grid item xs={8}>
                            <Box border="1px solid #CCC" borderRadius="4px">
                                <Typography padding="0.5rem">Muokkaa käyttöoikeuksia</Typography>
                                <Grid item xs={13} alignItems="start">
                                    {groups.map((group) => (
                                        <FormControlLabel
                                            key={group.id}
                                            onChange={(event) => {
                                                handleChange('groups', event, group);
                                            }}
                                            checked={userState.groups.some((group_) => group_.id === group.id)}
                                            control={<Checkbox />}
                                            label={group.name}
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
            <h5 align="center">
                <Button
                    onClick={() => {
                        /*
                        submit(
                            {
                                type: 'put',
                                ...userState,
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
