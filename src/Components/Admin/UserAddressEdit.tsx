import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import {
    Box,
    Button,
    Container,
    // FormControl,
    // FormHelperText,
    // ListItemText,
    // MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { adminUserAddressEditAction } from '../../Router/actions';
import type { userAddressEditLoader } from '../../Router/loaders';

function UserAddressEdit() {
    const loaderData = useLoaderData() as Awaited<ReturnType<typeof userAddressEditLoader>>;

    const actionData = useActionData() as Awaited<ReturnType<typeof adminUserAddressEditAction>>;

    const {
        register,
        handleSubmit: createHandleSubmit,
        // reset,
        formState: { errors: formStateErrors, isDirty, dirtyFields, isValid, isSubmitting, isSubmitSuccessful },
    } = useForm({
        mode: 'all',
        defaultValues: {
            id: String(loaderData.addressData.id),
            address: loaderData.addressData.address,
            zip_code: loaderData.addressData.zip_code,
            city: loaderData.addressData.city,
            user: String(loaderData.userData.id),
        },
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
                <AlertBox text="Osoitetietojen tallennus epäonnistui" status="error" />
            )}
            {actionData?.type === 'addressupdate' && actionData?.status && (
                <AlertBox
                    text="Osoitetiedot tallennettu onnistuneesti. Uudelleenohjataan..."
                    status="success"
                    timer={3000}
                    redirectUrl={`/admin/kayttajat/${loaderData.userData.id}`}
                />
            )}

            <Container maxWidth="xl">
                <HeroHeader Icon={<EditLocationAltIcon />} />
                <HeroText title={`Käyttäjän ${loaderData.userData.email} osoitteen muokkaus`} />

                <Container maxWidth="md">
                    <Box id="user-edit-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                        <Typography variant="body2">Osoitteen tunnistenumero: {loaderData.addressData.id}</Typography>

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
                            color={dirtyFields.address ? 'warning' : 'primary'}
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
                                color={dirtyFields.city ? 'warning' : 'primary'}
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
                                        value: 5,
                                        message: 'Osoitteen postinumero on vaadittu',
                                    },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formStateErrors.zip_code}
                                helperText={formStateErrors.zip_code?.message?.toString() || ' '}
                                color={dirtyFields.zip_code ? 'warning' : 'primary'}
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
                                disabled={!isDirty || isSubmitting || isSubmitSuccessful}
                                color={isValid ? 'success' : 'primary'}
                            >
                                Hyväksy ja tallenna muutokset
                            </Button>
                            <Button
                                id="cancel-btn"
                                component={Link}
                                to={`/admin/kayttajat/${loaderData.userData.id}`}
                                variant="outlined"
                                color="error"
                            >
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
