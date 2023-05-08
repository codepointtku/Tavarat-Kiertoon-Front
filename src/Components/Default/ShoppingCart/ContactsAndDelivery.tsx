/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { Typography, TextField, Grid, MenuItem, Box, Alert, OutlinedInput, Button } from '@mui/material';

import CartButtons from './CartButtons';
import Update from './Update';
import type { shoppingProcessLoader } from '../../../Router/loaders';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

export interface CartFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    deliveryAddress: string;
    zipcode: string;
    city: string;
    deliveryMethod: string;
    orderInfo?: string;
}

function ContactsAndDelivery() {
    const user = useRouteLoaderData('shoppingCart') as Awaited<ReturnType<typeof shoppingProcessLoader>>;
    const [selectedAddress, setSelectedAddress] = useState(user.address_list[0]?.address || '');
    const [selectedMethod, setSelectedMethod] = useState('shipping');
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const { actions } = useStateMachine({ Update });

    const navigate = useNavigate();
    const onSubmit = (data: CartFormData) => {
        alert(JSON.stringify(data));
        actions.Update(data);
        navigate('/ostoskori/vaihe3');
    };
    const correctAddress = user.address_list?.filter(
        (address: { address: string }) => address.address === selectedAddress
    );
    const fullname = user.name.split(' ');

    function handleClick() {
        setValue('firstName', fullname[0]);
        setValue('lastName', fullname[1]);
        setValue('email', user.email);
        setValue('phoneNumber', user.phone_number);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues> & CartFormData)}>
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
                    <Button onClick={() => handleClick()}>Täytä tiedot samoina</Button>
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main' }}>
                Vastaanottajan yhteystiedot
            </Typography>
            {/* fix shrink */}
            <Grid container spacing={4}>
                <Grid item>
                    <TextField
                        label="Etunimi"
                        placeholder="Etunimi"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register('firstName', {
                            required: true,
                            maxLength: 255,
                        })}
                    />
                    {errors.firstName && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
                <Grid item>
                    <TextField
                        label="Sukunimi"
                        placeholder="Sukunimi"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register('lastName', { required: true, maxLength: 255 })}
                    />
                    {errors.lastName && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
                <Grid item>
                    <TextField
                        label="Sähköposti"
                        placeholder="Sähköposti"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register('email', {
                            required: true,
                            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                            maxLength: 255,
                        })}
                    />
                    {errors.email && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
                <Grid item>
                    <TextField
                        label="Puh. numero"
                        placeholder="Puh. numero"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register('phoneNumber', {
                            required: true,
                            pattern: /^[0-9]+$/,
                            maxLength: 255,
                        })}
                    />
                    {errors.phoneNumber && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2, color: 'primary.main' }}>
                Toimitus
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={2.5}>
                    <TextField
                        label="Toimitusosoite"
                        variant="outlined"
                        value={selectedAddress}
                        {...register('deliveryAddress', { required: true })}
                        onChange={(SelectChangeEvent) => {
                            setSelectedAddress(SelectChangeEvent.target.value);
                        }}
                        fullWidth
                        select
                    >
                        {user.address_list?.map((a: { address: string; id: number }) => (
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
                <Grid item xs={2.5}>
                    <TextField
                        {...register('deliveryMethod', { required: true })}
                        label="Toimitustapa"
                        variant="outlined"
                        value={selectedMethod}
                        onChange={(SelectChangeEvent) => {
                            setSelectedMethod(SelectChangeEvent.target.value);
                        }}
                        fullWidth
                        select
                    >
                        <MenuItem value="shipping">Kuljetus</MenuItem>
                        <MenuItem value="pickup">Nouto</MenuItem>
                    </TextField>
                    {errors.deliveryMethod && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                </Grid>
                {selectedMethod === 'pickup' && (
                    <Grid item>
                        <TextField
                            type="datetime-local"
                            label="Noutoaika"
                            variant="outlined"
                            placeholder="Noutoaika"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                )}
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
