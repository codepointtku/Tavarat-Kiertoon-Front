import { Link, Form, useSubmit, useActionData /*, useLoaderData */ } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, TextField, Button, Stack, Container, Popover, Typography } from '@mui/material';

import BusinessIcon from '@mui/icons-material/Business';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import AlertBox from '../../AlertBox';

import type { userAddressEditAction } from '../../../Router/actions';
import { useState } from 'react';
// import type { addressEditLoader } from '../../../Router/loaders';

function AddressEdit() {
    //
    // userApi will get nuked and rebuild to follow REST principles.
    // This component gets edited afterwards.

    // const loaderData = useLoaderData() as Awaited<ReturnType<typeof addressEditLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof userAddressEditAction>>;

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { isDirty, dirtyFields, isSubmitting, isSubmitSuccessful, errors: formStateErrors },
    } = useForm({
        mode: 'all',
        // defaultValues: {
        //     ...addressData,
        // },
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'put',
        });
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);

    function handlePopOverOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    return (
        <>
            {responseStatus?.status && (
                <AlertBox
                    text="Osoitteen tietoja muokattu onnistuneesti. Uudelleenohjataan takaisin..."
                    status="success"
                    timer={3000}
                    redirectUrl="/tili"
                />
            )}

            <Container maxWidth="lg">
                <HeroHeader Icon={<BusinessIcon />} />
                <HeroText title="Osoitteen muokkaus" />

                <Container maxWidth="md">
                    <Box id="modif-address-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                        <TextField
                            type="text"
                            label="Katuosoite"
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
                        <Stack id="action-btns-wrapper" gap="1rem">
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
                                Tallenna muutokset
                            </Button>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                                <Button
                                    id="del-btn"
                                    /* type="submit" */ size="small"
                                    color="error"
                                    endIcon={<DeleteForeverIcon />}
                                    onClick={handlePopOverOpen}
                                >
                                    Poista tämä osoite
                                </Button>

                                <Popover
                                    open={openPopover}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                    onClose={() => setAnchorEl(null)}
                                    sx={{ mt: 1 }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ p: '1rem' }}
                                        spacing="1rem"
                                    >
                                        <Typography variant="body2">Oletko varma?</Typography>
                                        <Button size="small" variant="outlined" onClick={() => console.log('kaboom')}>
                                            Kyllä
                                        </Button>
                                        <Button size="small" variant="outlined" onClick={() => setAnchorEl(null)}>
                                            Peruuta
                                        </Button>
                                    </Stack>
                                </Popover>
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Container>
        </>
    );
}

export default AddressEdit;
