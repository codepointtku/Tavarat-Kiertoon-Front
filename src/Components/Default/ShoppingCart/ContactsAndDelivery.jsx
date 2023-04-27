/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { Typography, TextField, Grid, MenuItem, Box, Alert, OutlinedInput, Button } from '@mui/material';

import CartButtons from './CartButtons';
import Update from './Update';
import AutoFilled from './AutoFilled';

function ContactsAndDelivery() {
    const user = useRouteLoaderData('shoppingCart');
    const [selectedAddress, setSelectedAddress] = useState(user.address_list[0]?.address || '');
    const [selectedMethod, setSelectedMethod] = useState('shipping');
    const [isSamePerson, setIsSamePerson] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { actions } = useStateMachine({ Update });
    const fullname = user.name.split(' ');
    // console.log('update state: ', state, 'update actions: ', actions);

    const navigate = useNavigate();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        actions.Update(data);
        navigate('/ostoskori/vaihe3');
    };
    const handleChange = (SelectChangeEvent) => {
        setSelectedAddress(SelectChangeEvent.target.value);
    };
    const correctAddress = user.address_list?.filter((address) => address.address === selectedAddress);
    console.log(isSamePerson);

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
            <Grid gap={2} sx={{ mb: 2 }} container>
                <Grid item>
                    <Typography variant="h6">Vastaanottaja sama kuin tilaaja?</Typography>
                </Grid>
                <Grid item>
                    <Button onClick={() => setIsSamePerson((value) => !value)}>Täytä tiedot samoina</Button>
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main' }}>
                Vastaanottajan yhteystiedot
            </Typography>
            {!isSamePerson ? (
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
            ) : (
                <AutoFilled user={user} actions={actions} />
            )}
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
                            <MenuItem value={a.address} key={a.id}>
                                {a.address}
                            </MenuItem>
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
                                {...register('zipcode', { required: true })}
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
                        {...register('deliveryMethod', { required: true })}
                        label="Toimitustapa"
                        variant="outlined"
                        value={selectedMethod}
                        onChange={(SelectChangeEvent) => {
                            setSelectedMethod(SelectChangeEvent.target.value);
                        }}
                        select
                    >
                        <MenuItem value="shipping">Kuljetus</MenuItem>
                        <MenuItem value="pickup">Nouto</MenuItem>
                    </TextField>
                    {errors.deliveryMethod && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ mt: 5, mb: 2, color: 'primary.main' }}>
                Lisätietoa
            </Typography>
            <OutlinedInput
                {...register('orderInfo', {
                    maxLength: 255,
                })}
                placeholder="Lisätietoa toimituksesta..."
                sx={{ width: 400 }}
                multiline
                rows={5}
            />
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
            <CartButtons backText="Takaisin" forwardText="Seuraava" />
        </form>
    );
}

export default ContactsAndDelivery;
