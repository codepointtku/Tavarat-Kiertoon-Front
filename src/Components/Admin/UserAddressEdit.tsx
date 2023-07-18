import { useState } from 'react';
import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { adminUserAddressEditAction } from '../../Router/actions';
import type { userEditLoader } from '../../Router/loaders';
import { Watch } from '@mui/icons-material';

function UserAddressEdit() {
    const loaderData = useLoaderData() as Awaited<ReturnType<typeof userEditLoader>>;
    const userInfo = loaderData![0];
    // console.log(userInfo);

    const actionData = useActionData() as Awaited<ReturnType<typeof adminUserAddressEditAction>>;

    const {
        register,
        handleSubmit: createHandleSubmit,
        // reset,
        watch,
        formState: { errors: formStateErrors, isDirty, dirtyFields },
    } = useForm({
        mode: 'all',
        // defaultValues: {
        //     id: null,
        //     address: null,
        //     zip_code: null,
        //     city: null,
        // },
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'put',
        });
    });

    return (
        <>
            {actionData?.type === 'addressupdate' && actionData?.status === false && (
                <AlertBox text="Osoitetietojen tallennus epäonnistui. Lataa sivu uudestaan." status="error" />
            )}
            {actionData?.type === 'addressupdate' && actionData?.status && (
                <AlertBox text="Osoitetiedot tallennettu onnistuneesti" status="success" />
            )}

            <Container maxWidth="xl">
                <HeroHeader Icon={<EditLocationAltIcon />} />
                <HeroText title={`Käyttäjän ${userInfo.email} osoitteiden pahoinpitely`} />

                <Stack
                    id="address-boxes"
                    direction="row"
                    spacing={2}
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{ margin: '1rem 0 2rem 0' }}
                >
                    {userInfo.address_list.map((item: any, index: number) => (
                        <Box className="address-box" key={index}>
                            <Typography>osote: {item.address}</Typography>
                            <Typography>kapunni: {item.city}</Typography>
                            <Typography>zipkode: {item.zip_code}</Typography>
                            <Typography>id: {item.id}</Typography>
                        </Box>
                    ))}
                </Stack>

                <Container maxWidth="md">
                    <Stack id="address-stack">
                        <Typography gutterBottom align="left">
                            Valitse muokattava osoite:
                        </Typography>

                        <Box id="address-select-wrapper">
                            <FormControl fullWidth error={!!formStateErrors.storage_to}>
                                <TextField
                                    select
                                    id="address-select"
                                    value={watch('aid')}
                                    required
                                    inputProps={{ required: false }}
                                    error={!!formStateErrors.address}
                                >
                                    {userInfo.address_list.map((address: any) => (
                                        <MenuItem key={address.id} value={address.id}>
                                            <ListItemText primary={address.address} />
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <FormHelperText>{formStateErrors.address ? 'Valitse osoite' : ' '}</FormHelperText>
                            </FormControl>
                        </Box>
                    </Stack>

                    <Box id="user-edit-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                        <Stack direction="row" gap={1} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2">Osoitteen tunnistenumero:</Typography>
                            <input value={watch('aid')} {...register('aid')} />
                        </Stack>

                        <TextField
                            type="text"
                            label="Osoite"
                            placeholder="Tavaran vastaanotto-osoite"
                            {...register('address', {
                                required: { value: true, message: 'Osoite ei voi olla tyhjä' },
                                maxLength: { value: 100, message: 'Osoite on liian pitkä' },
                                minLength: {
                                    value: 1,
                                    message: 'Tavaran vastaanotto-osoite on vaadittu',
                                },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.address}
                            helperText={formStateErrors.address?.message?.toString() || ' '}
                            color={dirtyFields.address && 'warning'}
                            fullWidth
                            sx={{ marginTop: '1rem' }}
                        />

                        <Stack direction="row" gap={1}>
                            <TextField
                                id="addresscity"
                                type="text"
                                label="Kaupunki"
                                placeholder="Kaupunki"
                                {...register('city', {
                                    required: {
                                        value: true,
                                        message: 'Kaupunki ei voi olla tyhjä',
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'Kaupungin nimi on liian pitkä',
                                    },
                                    minLength: {
                                        value: 1,
                                        message: 'Osoitteen kaupunki on vaadittu',
                                    },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formStateErrors.city}
                                helperText={formStateErrors.city?.message?.toString() || ' '}
                                color={dirtyFields.city && 'warning'}
                                fullWidth
                            />

                            <TextField
                                id="addresszipcode"
                                type="text"
                                label="Postinumero"
                                placeholder="Postinumero"
                                {...register('zip_code', {
                                    required: {
                                        value: true,
                                        message: 'Postinumero ei voi olla tyhjä',
                                    },
                                    maxLength: { value: 5, message: 'Postinumero on liian pitkä' },
                                    minLength: {
                                        value: 1,
                                        message: 'Osoitteen postinumero on vaadittu',
                                    },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formStateErrors.zip_code}
                                helperText={formStateErrors.zip_code?.message?.toString() || ' '}
                                color={dirtyFields.zip_code && 'warning'}
                                fullWidth
                            />
                        </Stack>
                        <Stack>
                            <Button
                                id="save-changes-btn"
                                type="submit"
                                sx={{
                                    margin: '2rem 0 1rem 0',
                                    '&:hover': {
                                        backgroundColor: 'success.dark',
                                    },
                                }}
                                disabled={!isDirty}
                            >
                                Hyväksy ja tallenna muutokset
                            </Button>
                            <Button id="cancel-btn" component={Link} to="/admin/kayttajat/" color="error">
                                Poistu tallentamatta
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Container>
        </>
    );
}

export default UserAddressEdit;
