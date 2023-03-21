/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { Typography, TextField, Grid, MenuItem, Box, Alert } from '@mui/material';

import CartButtons from './CartButtons';

function ContactsAndDelivery() {
    const user = useLoaderData();
    const [buttonTask, setButtonTask] = useState('');
    const [selectedAddress, setSelectedAddress] = useState(user.address_list[0]?.address || '');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        navigate(buttonTask === 'forward' ? '/ostoskori/vaihe3' : '/ostoskori');
    };
    const handleChange = (SelectChangeEvent) => {
        setSelectedAddress(SelectChangeEvent.target.value);
    };
    const correctAddress = user.address_list?.filter((address) => address.address === selectedAddress);
    // const values = getValues(['firstName', 'lastName', 'email', 'phoneNumber', 'locationCode']);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    p: 5,
                    fontWeight: 'bold',
                    fontSize: '22px',
                    mt: 5,
                    mb: 5,
                    maxWidth: 800,
                    borderStyle: 'solid',
                    borderRadius: 5,
                    borderColor: 'primary.main',
                    backgroundColor: 'secondary.light',
                }}
            >
                <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Tilaajan yhteystiedot
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Typography variant="h6">Nimi: {user.name}</Typography>
                    <Typography variant="h6">Sähköposti: {user.email}</Typography>
                    <Typography variant="h6">Puh. numero: {user.phone_number}</Typography>
                </Box>
            </Box>
            <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main' }}>
                Vastaanottajan yhteystiedot
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField label="Etunimi" variant="outlined" {...register('firstName', { required: true })} />
                    {errors.firstName && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
                <Grid item>
                    <TextField label="Sukunimi" variant="outlined" {...register('lastName', { required: true })} />
                    {errors.lastName && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
                <Grid item>
                    <TextField
                        label="Sähköposti"
                        variant="outlined"
                        {...register('email', {
                            required: true,
                            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                        })}
                    />
                    {errors.email && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
                <Grid item>
                    <TextField
                        label="Puh. numero"
                        variant="outlined"
                        {...register('phoneNumber', { required: true, pattern: { value: /^[0-9]+$/ } })}
                    />
                    {errors.phoneNumber && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2, color: 'primary.main' }}>
                Toimitus
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField
                        label="Toimitusosoite"
                        variant="outlined"
                        value={selectedAddress}
                        {...register('deliveryAddress', { required: true })}
                        onChange={handleChange}
                        select
                    >
                        {user.address_list?.map((a) => (
                            <MenuItem value={a.address}>{a.address}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {selectedAddress && (
                    <>
                        <Grid item>
                            <TextField
                                label="Postinumero"
                                variant="outlined"
                                value={correctAddress[0]?.zip_code}
                                {...register('zipCode', { required: true })}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Kaupunki"
                                variant="outlined"
                                value={correctAddress[0]?.city}
                                {...register('city', { required: true })}
                            />
                        </Grid>
                    </>
                )}
                <Grid item>
                    <TextField
                        label="Toimitustapa"
                        variant="outlined"
                        {...register('deliveryMethod', { required: true })}
                    />
                    {errors.deliveryMethod && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
            </Grid>
            <Box
                sx={{
                    p: 5,
                    fontWeight: 'bold',
                    fontSize: '22px',
                    marginTop: 5,
                    borderStyle: 'solid',
                    borderWidth: 5,
                    borderColor: 'secondary.dark',
                    backgroundColor: 'primary.light',
                }}
            >
                Toimituksessa kestää keskimäärin 1-2 viikkoa.
            </Box>
            <CartButtons
                backUrl="/ostoskori"
                forwardUrl="/ostoskori/vaihe3"
                backText="Takaisin"
                forwardText="Seuraava"
                setButtonTask={setButtonTask}
            />
        </form>
    );
}

export default ContactsAndDelivery;
