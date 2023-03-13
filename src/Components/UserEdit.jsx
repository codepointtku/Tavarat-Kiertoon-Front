import { MenuItem, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
// import { useSubmit } from 'react-router-dom';

function UserEdit() {
    const loader = useLoaderData();
    const [userData, setUserData] = useState(loader);
    // const submit = useSubmit();

    const roles = ['superkäyttäjä', 'admin', 'henkilökunta', 'ei käyttöoikeuksia'];

    const handleChange = (key, event) => {
        setUserData({ ...userData, [key]: event.target.value });
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

    const applyPermissions = (event) => {
        if (event.target.value === 'superkäyttäjä') {
            setUserData({ ...userData, is_superuser: true, is_admin: true, is_staff: true });
        } else if (event.target.value === 'admin') {
            setUserData({ ...userData, is_superuser: false, is_admin: true, is_staff: true });
        } else if (event.target.value === 'henkilökunta') {
            setUserData({ ...userData, is_superuser: false, is_admin: false, is_staff: true });
        } else {
            setUserData({ ...userData, is_superuser: false, is_admin: false, is_staff: false });
        }
    };

    return (
        <>
            <h1 align="center">Muokkaa käyttäjää {userData.id}</h1>
            <Box align="center">
                <div>
                    <h5>
                        <TextField disabled defaultValue={userData.name} label="Alkuperäinen nimi" />
                        <TextField
                            label="Muokkaa nimeä"
                            onChange={(event) => {
                                handleChange('name', event);
                            }}
                            defaultValue={userData.name}
                        />
                    </h5>
                </div>
                <div>
                    <h5>
                        <TextField disabled defaultValue={userData.phone_number} label="Alkuperäinen numero" />
                        <TextField
                            label="Muokkaa puhelinnumeroa"
                            onChange={(event) => {
                                handleChange('phone_number', event);
                            }}
                            defaultValue={userData.phone_number}
                        />
                    </h5>
                </div>
                <div>
                    <h5>
                        <TextField disabled defaultValue={userData.email} label="Alkuperäinen sähköposti" />
                        <TextField
                            label="Muokkaa sähköpostia"
                            onChange={(event) => {
                                handleChange('email', event);
                            }}
                            defaultValue={userData.email}
                        />
                    </h5>
                </div>
                <div>
                    <h5>
                        <TextField
                            disabled
                            defaultValue={checkPermissions(userData)}
                            label="Alkuperäinen käyttöoikeus"
                        />
                        <TextField
                            id="outlined-select"
                            select
                            label="Muokkaa käyttäjän oikeuksia"
                            onChange={(event) => {
                                applyPermissions(event);
                            }}
                            sx={{ width: '27%' }}
                            value={checkPermissions(userData)}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </TextField>
                    </h5>
                </div>
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
