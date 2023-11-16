import { useForm } from 'react-hook-form';
import { Form, useLoaderData, useActionData, useSubmit } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Box, Button, Container, Grid, IconButton, MenuItem, Stack, TextField } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputIcon from '@mui/icons-material/Input';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import AlertBox from '../AlertBox';
import Tooltip from '../Tooltip';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { storageEditLoader } from '../../Router/loaders';
import type { storageEditAction } from '../../Router/actions';

function StorageEdit() {
    const storageData = useLoaderData() as Awaited<ReturnType<typeof storageEditLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof storageEditAction>>;

    const storageInfo = storageData.storageInfo;
    const storageAvailableProductsCount = storageData.hasProducts.count;

    const {
        register,
        handleSubmit: createHandleSubmit,
        reset,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors, dirtyFields, isDirty },
    } = useForm({
        mode: 'all',
        defaultValues: {
            ...storageInfo,
        },
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data: any) => {
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
            {responseStatus?.type === 'updatestorage' && !responseStatus?.status && (
                <AlertBox text="Varaston tietojen päivitys epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'updatestorage' && responseStatus?.status && (
                <AlertBox
                    text="Varaston tiedot päivitetty."
                    status="success"
                    timer={3000}
                    redirectUrl="/admin/varastot"
                />
            )}

            <Container maxWidth="md">
                <HeroHeader Icon={<DomainIcon />} hideInAdmin />
                <HeroText
                    title={`Muokattava varasto: ${storageInfo.name}`}
                    subtitle={`Varaston tunnistenumero: ${storageInfo.id}`}
                    subtext={`Tuotemäärä: ${storageAvailableProductsCount}`}
                />
                <Box
                    id="storage-edit-form"
                    component={Form}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    sx={{ marginTop: '1rem' }}
                >
                    <Stack id="storage-edit-textfields-stacker">
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
                            color={dirtyFields.name ? 'warning' : 'primary'}
                            fullWidth
                        />

                        <TextField
                            id="textfield-storage-address"
                            label="Katuosoite"
                            placeholder="Varaston katuosoite"
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
                            color={dirtyFields.address ? 'warning' : 'primary'}
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
                        </Stack>

                        <TextField
                            select
                            label="Käyttötila"
                            {...register('in_use', {
                                required: { value: true, message: 'Valitse varaston tila' },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.in_use}
                            helperText={formStateErrors.in_use?.message?.toString() || ' '}
                            color={dirtyFields.in_use ? 'warning' : 'primary'}
                            fullWidth
                            defaultValue={storageInfo.in_use ? 1 : 0}
                        >
                            <MenuItem value="1">Käytössä</MenuItem>
                            <MenuItem value="0">Ei käytössä</MenuItem>
                        </TextField>

                        <Stack id="submit-reset-btns" direction="row" gap={2}>
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
                                Tallenna tiedot
                            </Button>
                            <Tooltip title="Palauta alkutilaan">
                                <IconButton id="reset-form-btn" onClick={() => formReset()}>
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>

                        <Grid container>
                            <Grid item xs={4}>
                                <Tooltip title="Takaisin varastot-listaukseen">
                                    <Button
                                        id="cancel-btn"
                                        size="small"
                                        component={Link}
                                        to="/admin/varastot/"
                                        startIcon={<ArrowBackIcon />}
                                        sx={{ margin: '4rem 0 1rem 0' }}
                                    >
                                        Poistu tallentamatta
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Tooltip title="Siirry tuotteiden siirtonäkymään">
                                    <Button
                                        id="productstransfer-process-btn"
                                        size="small"
                                        variant="outlined"
                                        component={Link}
                                        to={`/admin/varastot/${storageInfo.id}/siirto`}
                                        endIcon={<InputIcon />}
                                        sx={{ margin: '4rem 0 1rem 0' }}
                                    >
                                        Tuotteiden siirto
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Tooltip title="Siirry poistamaan varasto järjestelmästä">
                                    <Button
                                        id="initialize-deletion-process-btn"
                                        size="small"
                                        color="error"
                                        component={Link}
                                        to={`/admin/varastot/${storageInfo.id}/poista`}
                                        endIcon={<DeleteForeverIcon />}
                                        sx={{ margin: '4rem 0 1rem 0' }}
                                    >
                                        Varaston poistonäkymä
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default StorageEdit;
