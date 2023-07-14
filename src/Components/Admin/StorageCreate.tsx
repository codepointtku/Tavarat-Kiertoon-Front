import { useForm } from 'react-hook-form';
import { Form, useActionData, useSubmit } from 'react-router-dom';

import { Box, Button, Container, Grid, IconButton, MenuItem, Stack, TextField } from '@mui/material';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import RefreshIcon from '@mui/icons-material/Refresh';

import AlertBox from '../AlertBox';
import Tooltip from '../Tooltip';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { storageCreateAction } from '../../Router/actions';

function StorageCreate() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof storageCreateAction>>;

    const storageStates = ['Käytössä', 'Ei käytössä'];

    const {
        register,
        handleSubmit: createHandleSubmit,
        reset,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors, isDirty, dirtyFields },
    } = useForm();

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'post',
        });
    });

    const formReset = () => {
        reset();
    };

    return (
        <>
            {responseStatus?.type === 'createstorage' && !responseStatus?.status && (
                <AlertBox text="Varaston luominen epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'createstorage' && responseStatus?.status && (
                <AlertBox text="Varasto luotu" status="success" timer={3000} redirectUrl="/admin/varastot" />
            )}

            <Container maxWidth="lg">
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
                            // Needs to be 'required: false' to disable browser error message
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.name}
                            helperText={formStateErrors.name?.message?.toString() || ' '}
                            color={dirtyFields.name && 'warning'}
                            fullWidth
                        />

                        <TextField
                            id="textfield-storage-address"
                            label="Osoite"
                            placeholder="Varaston sijainti"
                            {...register('address', {
                                required: { value: true, message: 'Varaston katuosoite on pakollinen' },
                                minLength: {
                                    value: 1,
                                    message: 'Kirjoita edes jotain',
                                },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.address}
                            helperText={formStateErrors.address?.message?.toString() || ' '}
                            color={dirtyFields.address && 'warning'}
                            fullWidth
                        />

                        <TextField
                            select
                            label="Käyttötila"
                            defaultValue="Ei käytössä"
                            {...register('in_use', {
                                required: { value: true, message: 'Valitse varaston tila' },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.state}
                            helperText={formStateErrors.state?.message?.toString() || ' '}
                            color={dirtyFields.state && 'warning'}
                            fullWidth
                        >
                            {storageStates.map((state) => (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Grid container id="submit-reset-btns">
                            <Grid item xs={11}>
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
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Tooltip title="Tyhjennä lomake">
                                    <IconButton id="reset-form-btn" onClick={() => formReset()}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default StorageCreate;
