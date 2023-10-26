import { useActionData } from 'react-router';
import { Form, useSubmit, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Box, Button, Container, Stack, TextField } from '@mui/material';

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AlertBox from '../../AlertBox';
import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

import type { userAddressCreateAction } from '../../../Router/actions';

function AddressCreate() {
    const actionData = useActionData() as Awaited<ReturnType<typeof userAddressCreateAction>>;

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
            method: 'post',
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
                    redirectUrl={'/tili'}
                />
            )}

            <Container maxWidth="md" sx={{ my: '1rem' }}>
                <HeroHeader Icon={<AddLocationAltIcon />} hideInAdmin />
                <HeroText title="Uusi osoite" />

                <Box id="add-address-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        label="Katuosoite"
                        placeholder="Tavaran vastaanotto-osoite"
                        {...register('address', {
                            required: { value: true, message: 'Osoite ei voi olla tyhjä' },
                            maxLength: { value: 100, message: 'Osoite on liian pitkä' },
                        })}
                        inputProps={{ required: false }}
                        required
                        error={!!formStateErrors.address}
                        helperText={formStateErrors.address?.message?.toString() || ' '}
                        color={dirtyFields.address ? 'warning' : 'primary'}
                        fullWidth
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
                                required: { value: true, message: 'Postinumero on pakollinen' },
                                minLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                                maxLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.zip_code}
                            helperText={formStateErrors.zip_code?.message?.toString() || ' '}
                            color={dirtyFields.zip_code ? 'warning' : 'primary'}
                            fullWidth
                        />
                    </Stack>
                    <Stack gap="1rem">
                        <Button
                            id="save-changes-btn"
                            type="submit"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'success.dark',
                                },
                            }}
                            disabled={!isDirty || isSubmitting || isSubmitSuccessful}
                            fullWidth
                        >
                            Tallenna osoite
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Button
                                id="back-btn"
                                size="small"
                                variant="outlined"
                                component={Link}
                                to={'/tili'}
                                startIcon={<ArrowBackIcon />}
                            >
                                Peruuta
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default AddressCreate;
