import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { Typography, TextField, Grid, MenuItem, Box, Alert, OutlinedInput, Button, Stack } from '@mui/material';

import CartButtons from './CartButtons';
import Update from './Update';

import type { shoppingProcessLoader } from '../../../Router/loaders';
import type { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

import TypographyTitle from '../../TypographyTitle';
import TypographyHeading from '../../TypographyHeading';

export interface CartFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    deliveryAddress: string;
    zipcode: string;
    city: string;
    deliveryRequired: string;
    orderInfo?: string;
}

function ContactsAndDelivery() {
    const user = useRouteLoaderData('shoppingCart') as Awaited<ReturnType<typeof shoppingProcessLoader>>;
    const [selectedAddress, setSelectedAddress] = useState(user.address_list[0]?.address || '');
    const [selectedMethod, setSelectedMethod] = useState('true');
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const { actions } = useStateMachine({ Update });

    const navigate = useNavigate();
    const onSubmit = (data: CartFormData) => {
        console.log(data);
        actions.Update(data);
        navigate('/ostoskori/vaihe3');
    };
    const correctAddress = user.address_list?.filter(
        (address: { address: string }) => address.address === selectedAddress
    );

    function handleClick() {
        setValue('firstName', user.first_name);
        setValue('lastName', user.last_name);
        setValue('email', user.email);
        setValue('phoneNumber', user.phone_number);
    }

    useEffect(() => {
        setValue('zipcode', correctAddress[0]?.zip_code);
        setValue('city', correctAddress[0]?.city);
    }, [selectedAddress]);

    return (
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues> & CartFormData)}>
            <Box
                sx={{
                    p: '2rem',
                    mt: '-2rem',
                    mb: '2rem',
                    border: '1px solid #bfe6f6',
                    borderRadius: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Stack>
                    <TypographyTitle text="Tilaajan yhteystiedot" />
                    <Stack direction="row" mt="1rem" gap={2}>
                        <Box>
                            <Typography variant="h6" sx={{ mr: '1rem' }}>
                                Etunimi:
                            </Typography>
                            <Typography variant="h6" sx={{ mr: '1rem' }}>
                                Sukunimi:
                            </Typography>
                        </Box>

                        <Box>
                            <Typography>{user.first_name}</Typography>
                            <Typography> {user.last_name}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6">Sähköposti: </Typography>
                            <Typography variant="h6">Puh. numero: </Typography>
                        </Box>
                        <Box>
                            <Typography>{user.email}</Typography>
                            <Typography>{user.phone_number}</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    p: '2rem',
                    mb: '2rem',
                    border: '1px solid #bfe6f6',
                    borderRadius: '1rem',
                }}
            >
                <TypographyTitle text="Vastaanottajan yhteystiedot" />
                <Grid container margin="2rem 0 2rem 0">
                    <Grid item xs={4}>
                        <TypographyHeading text="Vastaanottaja sama kuin tilaaja?" />
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => handleClick()}>Täytä tiedot samoina</Button>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>

                <Grid id="receiver-input-fields-grid-container" container spacing={2} mb="2rem">
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
                            label="Puhelinnumero"
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

                {/* //// */}

                <TypographyHeading text="Toimitusosoitetiedot" />
                <Grid id="delivery-fields-grid-container" container margin="2rem 0 1rem 0">
                    <Grid item mr="1rem">
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
                            <Grid item mr="1rem">
                                <TextField
                                    label="Postinumero"
                                    variant="outlined"
                                    value={correctAddress[0]?.zip_code}
                                    {...register('zipcode', { required: true })}
                                />
                            </Grid>
                            <Grid item mr="1rem">
                                <TextField
                                    label="Kaupunki"
                                    variant="outlined"
                                    value={correctAddress[0]?.city}
                                    {...register('city', { required: true })}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={2} mr="1rem">
                        <TextField
                            {...register('deliveryRequired', { required: true })}
                            label="Toimitustapa"
                            variant="outlined"
                            value={selectedMethod}
                            onChange={(SelectChangeEvent) => {
                                setSelectedMethod(SelectChangeEvent.target.value);
                            }}
                            fullWidth
                            select
                        >
                            <MenuItem value="true">Kuljetus</MenuItem>
                            <MenuItem value="false">Nouto</MenuItem>
                        </TextField>
                        {errors.deliveryRequired && <Alert severity="error">Tämä syöte ei kelpaa.</Alert>}
                    </Grid>
                    {selectedMethod === 'false' && (
                        <Grid item>
                            <TextField
                                {...register('fetchDate')}
                                type="date"
                                label="Noutoaika"
                                variant="outlined"
                                placeholder="Noutoaika"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>
            {/* ////// */}
            <TypographyTitle text="Lisätietoja / Viesti" />

            <OutlinedInput
                {...register('orderInfo', {
                    maxLength: 255,
                })}
                placeholder="Lisätietoa toimituksesta..."
                fullWidth
                multiline
                rows={5}
                sx={{ marginTop: '2rem' }}
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
                }}
            >
                Toimituksessa kestää keskimäärin 1-2 viikkoa.
            </Box>

            <CartButtons backText="Takaisin" forwardText="Seuraava" />
        </form>
    );
}

export default ContactsAndDelivery;
