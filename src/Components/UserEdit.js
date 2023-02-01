import { MenuItem, TextField, Box } from '@mui/material';
import { useState } from 'react';
import { useLoaderData } from 'react-router';

function UserEdit() {
    const loader = useLoaderData();
    const [userData, setUserData] = useState(loader);
    console.log(userData);

    const roles = ['kahvinkeittäjä', 'varasto', 'admin'];

    const handleChange = (key, event) => {
        setUserData({ ...userData, [key]: event.target.value });
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
                        <TextField disabled defaultValue={userData.phone} label="Alkuperäinen numero" />
                        <TextField
                            label="Muokkaa puhelinnumeroa"
                            onChange={(event) => {
                                handleChange('phone', event);
                            }}
                            defaultValue={userData.phone}
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
                        <TextField disabled defaultValue={userData.roles} label="Alkuperäinen käyttöoikeus" />
                        <TextField
                            id="outlined-select"
                            select
                            label="Muokkaa käyttäjän oikeuksia"
                            onChange={(event) => {
                                handleChange('roles', event);
                            }}
                            sx={{ width: '19%' }}
                            defaultValue={userData.roles}
                        >
                            {roles.map((role) => (
                                <MenuItem value={role}>{role}</MenuItem>
                            ))}
                        </TextField>
                    </h5>
                </div>
            </Box>
        </>
    );
}

export default UserEdit;
