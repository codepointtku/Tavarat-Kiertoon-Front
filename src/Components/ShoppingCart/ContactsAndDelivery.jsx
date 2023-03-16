/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Grid, MenuItem, Box, Alert } from '@mui/material';

import CartButtons from './CartButtons';

function ContactsAndDelivery() {
    const [buttonTask, setButtonTask] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('Osoite 1');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const addresses = ['Osoite 1', 'Osoite 2', 'Osoite 3', 'Osoite 4'];
    const navigate = useNavigate();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        navigate(buttonTask === 'forward' ? '/ostoskori/vaihe3' : '/ostoskori');
    };
    const handleChange = (SelectChangeEvent) => {
        setSelectedAddress(SelectChangeEvent.target.value);
    };

    // const values = getValues(['firstName', 'lastName', 'email', 'phoneNumber', 'locationCode']);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main' }}>
                Tilaajan tiedot
            </Typography>
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
                        label="Toimitusosoitteet"
                        variant="outlined"
                        value={selectedAddress}
                        {...register('deliveryAddress', { required: true })}
                        onChange={handleChange}
                        select
                    >
                        {addresses.map((address) => (
                            <MenuItem value={address}>{address}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
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
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.light',
                }}
            >
                Toimituksessa voi kestää 1-2 viikkoa.
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
