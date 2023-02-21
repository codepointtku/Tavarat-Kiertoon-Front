import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { useSubmit } from 'react-router-dom';
import { TextField, Box, Button, MenuItem, Grid, Container } from '@mui/material';

function StorageEdit() {
    const storageData = useLoaderData();
    const [storageState, setStorageState] = useState(storageData);
    const submit = useSubmit();

    const handleChange = (key, event) => {
        if (key === 'in_use') {
            if (event.target.value === 'ei käytössä') {
                setStorageState({ ...storageState, [key]: false });
            } else {
                setStorageState({ ...storageState, [key]: true });
            }
        } else {
            setStorageState({ ...storageState, [key]: event.target.value });
        }
    };

    const checkChange = (key) => {
        if (storageData[key] === storageState[key]) {
            return false;
        }
        return true;
    };

    const revertChange = (key) => {
        setStorageState({ ...storageState, [key]: storageData[key] });
    };

    const choices = ['käytössä', 'ei käytössä'];

    return (
        <>
            <h1 align="center">Muokkaa Varastoa {storageState.id}</h1>
            <Box align="center">
                <Container maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField
                                disabled
                                fullWidth
                                defaultValue={storageData.address}
                                label="Alkuperäinen osoite"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                focused={checkChange('address')}
                                label="Muokkaa osoitetta"
                                value={storageState.address}
                                onChange={(event) => {
                                    handleChange('address', event);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                sx={{ mt: '8px', ml: '1rem' }}
                                onClick={() => {
                                    revertChange('address');
                                }}
                            >
                                Peruuta muutokset
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField disabled fullWidth defaultValue={storageData.name} label="Alkuperäinen nimi" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                focused={checkChange('name')}
                                label="Muokkaa nimeä"
                                value={storageState.name}
                                onChange={(event) => {
                                    handleChange('name', event);
                                }}
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
                                fullWidth
                                disabled
                                defaultValue={storageData.in_use ? 'käytössä' : 'ei käytössä'}
                                label="Alkuperäinen käyttötila"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="outlined-select"
                                select
                                focused={checkChange('in_use')}
                                label="Muokkaa käyttötilaa"
                                defaultValue=""
                                value={storageState.in_use ? 'käytössä' : 'ei käytössä'}
                                onChange={(event) => {
                                    handleChange('in_use', event);
                                }}
                            >
                                {choices.map((choice) => (
                                    <MenuItem key={choice} value={choice}>
                                        {choice}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                sx={{ mt: '8px', ml: '1rem' }}
                                onClick={() => {
                                    revertChange('in_use');
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
                        submit(
                            {
                                type: 'put',
                                ...storageState,
                            },
                            { method: 'post' }
                        );
                    }}
                >
                    Tallenna varaston tiedot
                </Button>
            </h5>
        </>
    );
}

export default StorageEdit;
