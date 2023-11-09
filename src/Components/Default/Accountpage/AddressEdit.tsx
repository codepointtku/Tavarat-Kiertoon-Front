import { useState } from 'react';
import { Link, Form, useSubmit, useActionData, useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, TextField, Button, Stack, Container, Popover, Typography } from '@mui/material';

import BusinessIcon from '@mui/icons-material/Business';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import AlertBox from '../../AlertBox';

import type { userAddressEditAction } from '../../../Router/actions';
import type { addressEditLoader } from '../../../Router/loaders';

function AddressEdit() {
    const { addressData } = useLoaderData() as Awaited<ReturnType<typeof addressEditLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof userAddressEditAction>>;

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { isDirty, dirtyFields, isSubmitting, isSubmitSuccessful, errors: formStateErrors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            ...addressData,
        },
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(
            {
                address: data.address,
                zip_code: data.zip_code,
                city: data.city,
            },
            {
                method: 'put',
            }
        );
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);

    function handlePopOverOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    const handleAddressDelete = () => {
        submit(null, { method: 'delete' });
    };

    return (
        <>
            {responseStatus?.type === 'addressmodified' && responseStatus?.status && (
                <AlertBox
                    text="Osoitteen tietoja muokattu onnistuneesti. Uudelleenohjataan takaisin tilisivulle..."
                    status="success"
                    timer={3000}
                    redirectUrl="/tili"
                />
            )}

            {responseStatus?.type === 'addressneutral' && responseStatus?.status && (
                <AlertBox text="Osoitteen päivitys epäonnistui" status="warning" />
            )}

            <Container maxWidth="md" id="outer-container" sx={{ my: '1rem' }}>
                <HeroHeader Icon={<BusinessIcon />} hideInAdmin />
                <HeroText title="Osoitteen muokkaus" />

                <Box id="modif-address-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        label="Katuosoite"
                        placeholder="Tavaran vastaanotto-osoite"
                        {...register('address', {
                            required: { value: true, message: 'Osoite ei voi olla tyhjä' },
                            maxLength: { value: 80, message: 'Osoite on liian pitkä' },
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

                    <Stack direction="row" gap={2}>
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
                                required: { value: true, message: 'Postinumero on pakollinen' },
                                minLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                                maxLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                                pattern: { value: /^[0-9]+$/, message: 'Postinumero koostuu vain numeroista' },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.zip_code}
                            helperText={formStateErrors.zip_code?.message?.toString() || ' '}
                            color={dirtyFields.zip_code ? 'warning' : 'primary'}
                            fullWidth
                        />
                    </Stack>
                    <Stack id="action-btns-wrapper" gap={4}>
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
                                size="small"
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
                                    <Button size="small" variant="outlined" onClick={handleAddressDelete}>
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
        </>
    );
}

export default AddressEdit;
