import { useForm } from 'react-hook-form';
import { Form, useActionData, useSubmit } from 'react-router-dom';

import { Box, Button, Container, MenuItem, Stack, TextField } from '@mui/material';
import DomainAddIcon from '@mui/icons-material/DomainAdd';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { storageCreateAction } from '../../Router/actions';

function StorageCreate() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof storageCreateAction>>;

    const storageStates = ['Käytössä', 'Ei käytössä'];

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors, isDirty, dirtyFields },
    } = useForm();

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'post',
        });
    });

    return (
        <>
            {responseStatus?.type === 'createstorage' && !responseStatus?.status && (
                <AlertBox text="Varaston luominen epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'createstorage' && responseStatus?.status && (
                <AlertBox
                    text="Varasto luotu tietokantaan"
                    status="success"
                    timer={3000}
                    redirectUrl="/admin/varastot"
                />
            )}

            <Container maxWidth="md">
                <HeroHeader Icon={<DomainAddIcon />} hideInAdmin />
                <HeroText title="Uusi varasto" subtitle="Uuden varaston luominen tietokantaan" />
                <Box
                    id="storage-creation-form"
                    component={Form}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    sx={{ marginTop: '2rem' }}
                >
                    <Stack id="storage-creation-textfields-stacker">
                        <TextField
                            id="textfield-storage-name"
                            type="text"
                            label="Nimi"
                            placeholder="Varaston nimi"
                            {...register('name', {
                                required: { value: true, message: 'Varaston nimi on pakollinen' },
                                maxLength: {
                                    value: 50,
                                    message: 'Maksimipituus 50 merkkiä',
                                },
                            })}
                            // 'required: false' to disable browser error message
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.name}
                            helperText={formStateErrors.name?.message?.toString() || ' '}
                            color={dirtyFields.name && 'warning'}
                            fullWidth
                        />

                        <TextField
                            id="textfield-storage-address"
                            label="Katuosoite"
                            placeholder="Varaston sijainti"
                            {...register('address', {
                                required: { value: true, message: 'Varaston katuosoite on pakollinen' },
                                minLength: {
                                    value: 1,
                                    message: 'Syötä katuosoite',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Maksimipituus 50 merkkiä',
                                },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.address}
                            helperText={formStateErrors.address?.message?.toString() || ' '}
                            color={dirtyFields.address && 'warning'}
                            fullWidth
                        />

                        <Stack direction="row" gap={'1rem'}>
                            <TextField
                                id="textfield-storage-address"
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
                            <TextField
                                id="textfield-storage-address"
                                label="Kaupunki"
                                placeholder="Varaston sijainti"
                                {...register('city', {
                                    required: { value: true, message: 'Kaupunki on pakollinen' },
                                    minLength: {
                                        value: 1,
                                        message: 'Syötä kaupunki',
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'Maksimipituus 50 merkkiä',
                                    },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formStateErrors.city}
                                helperText={formStateErrors.city?.message?.toString() || ' '}
                                color={dirtyFields.city ? 'warning' : 'primary'}
                                fullWidth
                            />
                        </Stack>

                        <TextField
                            select
                            label="Käyttötila"
                            defaultValue="Ei käytössä"
                            {...register('in_use', {
                                required: { value: true, message: 'Valitse varaston tila' },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.in_use}
                            helperText={formStateErrors.in_use?.message?.toString() || ' '}
                            color={dirtyFields.in_use && 'warning'}
                            fullWidth
                        >
                            {storageStates.map((state) => (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Box id="submit-btn-container" sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                id="submit-btn"
                                type="submit"
                                disabled={!isDirty || isSubmitting || isSubmitSuccessful}
                                fullWidth
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'success.dark',
                                    },
                                }}
                            >
                                Lisää uusi varasto
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default StorageCreate;
