import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { Typography, TextField, Grid, MenuItem, Box, OutlinedInput, Button, Stack } from '@mui/material';

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
    } = useForm({ mode: 'onTouched' });
    const { actions } = useStateMachine({ Update });

    const navigate = useNavigate();
    const onSubmit = (data: CartFormData) => {
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
                                required: 'Tämä kenttä on täytettävä',
                                maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Sukunimi"
                            placeholder="Sukunimi"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('lastName', {
                                required: 'Tämä kenttä on täytettävä',
                                maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Sähköposti"
                            placeholder="Sähköposti"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('email', {
                                required: 'Tämä kenttä on täytettävä',
                                pattern: {
                                    value: /.+@turku.fi$|.+@edu.turku.fi$/,
                                    message: 'Sähköpostin täytyy loppua edu.turku.fi tai turku.fi',
                                },
                                maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Puhelinnumero"
                            placeholder="Puh. numero"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('phoneNumber', {
                                required: 'Tämä kenttä on täytettävä',
                                pattern: { value: /^[0-9]+$/, message: 'Sisällön täytyy koostua vain numeroista' },
                                maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                            })}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        />
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
                            {...register('deliveryAddress', {
                                required: 'Tämä kenttä on täytettävä',
                                maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                            })}
                            onChange={(SelectChangeEvent) => {
                                setSelectedAddress(SelectChangeEvent.target.value);
                            }}
                            inputProps={{ required: false }}
                            error={!!errors.deliveryAddress}
                            helperText={errors.deliveryAddress?.message?.toString() || ' '}
                            fullWidth
                            select
                            required
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
                                    {...register('zipcode', { required: 'Tämä kenttä on täytettävä' })}
                                    inputProps={{ required: false }}
                                    required
                                />
                            </Grid>
                            <Grid item mr="1rem">
                                <TextField
                                    label="Kaupunki"
                                    variant="outlined"
                                    value={correctAddress[0]?.city}
                                    {...register('city', { required: 'Tämä kenttä on täytettävä' })}
                                    inputProps={{ required: false }}
                                    required
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={2} mr="1rem">
                        <TextField
                            {...register('deliveryRequired', { required: 'Tämä kenttä on täytettävä' })}
                            label="Toimitustapa"
                            variant="outlined"
                            value={selectedMethod}
                            onChange={(SelectChangeEvent) => {
                                setSelectedMethod(SelectChangeEvent.target.value);
                            }}
                            fullWidth
                            select
                            error={!!errors.deliveryRequired}
                            helperText={errors.deliveryRequired?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        >
                            <MenuItem value="true">Kuljetus</MenuItem>
                            <MenuItem value="false">Nouto</MenuItem>
                        </TextField>
                    </Grid>
                    {selectedMethod === 'false' && (
                        <Grid item>
                            <TextField
                                {...register('fetchDate')}
                                type="date"
                                label="Noutoaika"
                                variant="outlined"
                                placeholder="Noutoaika"
                                inputProps={{ required: false }}
                                InputLabelProps={{ shrink: true }}
                                helperText="Noutoajat ma-pe 9-16"
                                required
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>
            {/* ////// */}
            <TypographyTitle text="Lisätietoja / Viesti" />

            <TextField
                {...register('orderInfo')}
                placeholder="Lisätietoa toimituksesta..."
                fullWidth
                multiline
                helperText="Lisätietoon voi kirjoittaa esim. ovikoodin tai muut esteet tilauksen kuljetukselle."
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
