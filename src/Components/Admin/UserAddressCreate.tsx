import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Box, Button, Container, Stack, TextField } from '@mui/material';

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { adminUserAddressCreateAction } from '../../Router/actions';
import type { userAddressCreateLoader } from '../../Router/loaders';

function UserAddressCreate() {
    const loaderData = useLoaderData() as Awaited<ReturnType<typeof userAddressCreateLoader>>;
    const actionData = useActionData() as Awaited<ReturnType<typeof adminUserAddressCreateAction>>;

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { errors: formStateErrors, isDirty, dirtyFields, isSubmitting, isSubmitSuccessful },
    } = useForm({
        mode: 'all',
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
            {actionData?.type === 'addresscreate' && actionData?.status === false && (
                <AlertBox text="Osoitteen lisäys epäonnistui" status="error" />
            )}

            {actionData?.type === 'addresscreate' && actionData?.status && (
                <AlertBox
                    text="Uusi osoite lisätty onnistuneesti"
                    status="success"
                    timer={3000}
                    redirectUrl={`/admin/kayttajat/${loaderData.userData.id}`}
                />
            )}

            <Container maxWidth="xl">
                <HeroHeader Icon={<AddLocationAltIcon />} hideInAdmin />
                <HeroText title={`Uusi osoite käyttäjälle ${loaderData.userData.email}`} />

                <Container maxWidth="md">
                    <Box id="add-address-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
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
                                    pattern: {
                                        value: /^[a-zA-ZåÅäÄöÖ]+$|^[a-zA-ZåÅäÄöÖ]+-[a-zA-ZåÅäÄöÖ]+$/,
                                        message: 'Kenttä voi sisältää vain aakkosia',
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
                            >
                                Tallenna osoite
                            </Button>
                            <Button
                                id="back-btn"
                                variant="text"
                                component={Link}
                                to={`/admin/kayttajat/${loaderData.userData.id}`}
                            >
                                Takaisin
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Container>
        </>
    );
}

export default UserAddressCreate;
