import { useState } from 'react';
import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit } from 'react-router-dom';
import { TextField, Box, Button, MenuItem, Grid, Container } from '@mui/material';
import AlertBox from '../AlertBox';
import ConfirmWindow from './ConfirmWindow';

function StorageEdit() {
    const storageData = useLoaderData();
    const [storageState, setStorageState] = useState(storageData);
    const submit = useSubmit();
    const responseStatus = useActionData();
    const [isOpen, setIsOpen] = useState(false);

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

    const handleConfirm = (confirm) => {
        if (confirm) {
            submit(
                {
                    type: 'put',
                    ...storageState,
                },
                { method: 'post' }
            );
        }
        setIsOpen(false);
    };

    return (
        <>
            <ConfirmWindow
                open={isOpen}
                onConfirm={handleConfirm}
                title="Tallennetaanko varaston tiedot?"
                content={`Varasto ${storageData.id}`}
            />
            <Form
                method="post"
                onSubmit={(event) => {
                    event.preventDefault();
                    setIsOpen(true);
                }}
            >
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
                                <TextField
                                    disabled
                                    fullWidth
                                    defaultValue={storageData.name}
                                    label="Alkuperäinen nimi"
                                />
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

                {responseStatus?.type === 'update' && !responseStatus?.status && (
                    <AlertBox
                        text="Varaston tallennus epäonnistui! Lataa sivu uudestaan."
                        status="error"
                        timer={3000}
                    />
                )}
                {responseStatus?.type === 'update' && responseStatus?.status && (
                    <AlertBox text="Varaston tallennus onnistui" status="success" timer={3000} />
                )}

                <h5 align="center">
                    <Button type="submit">Tallenna varaston tiedot</Button>
                </h5>
            </Form>
        </>
    );
}

export default StorageEdit;
