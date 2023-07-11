import { useForm } from 'react-hook-form';
import { Form, useLoaderData, useSubmit, Link } from 'react-router-dom';

import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { storageEditLoader } from '../../Router/loaders';

//

function StorageDelete({ randomInt }: any) {
    const storageData = useLoaderData() as Awaited<ReturnType<typeof storageEditLoader>>;

    const storageInfo = storageData.storageInfo;
    const storageHasAvailableProducts = storageData.hasProducts.count;

    console.log('product count in this storage:', storageHasAvailableProducts);

    // console.log('rInt:', randomInt, typeof randomInt);

    const {
        register,
        watch,
        handleSubmit: createHandleSubmit,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors, isValid },
    } = useForm({
        mode: 'all',
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data: any) => {
        submit(data, {
            method: 'delete',
        });
    });

    return (
        <>
            <Container maxWidth="md">
                <HeroHeader Icon={<DomainDisabledIcon />} hideInAdmin />
                <HeroText
                    title={`Poistettava varasto: ${storageInfo.name}`}
                    subtitle={`Varaston tunnistenumero: ${storageInfo.id}`}
                />

                <Box
                    id="warning-text-box"
                    sx={{
                        border: '1px dashed red',
                        padding: '2rem',
                        marginTop: '2rem',
                    }}
                >
                    <Stack id="warning-elements-column-stack" gap={3}>
                        <Typography variant="h5" color="error" textAlign="center" gutterBottom>
                            Tämä toimenpide on pysyvä, eikä tietoja voi sen jälkeen palauttaa.
                        </Typography>
                        <Stack id="warning-typographies-stack" gap={1}>
                            <Stack direction="row" gap={1}>
                                <DeleteForeverIcon color="error" />
                                <Typography variant="subtitle2" textAlign="center">
                                    Poistaa varaston omat tiedot (tunniste, nimi, tila, osoite), sekä tiedon varastoon
                                    liitetyistä tuotteista.
                                </Typography>
                            </Stack>
                            <Stack direction="row" gap={1}>
                                <CheckCircleOutlineIcon color="success" />
                                <Typography variant="subtitle2" textAlign="center" gutterBottom>
                                    Tuotteet ja tuotteiden omat tiedot säilyvät ennallaan.
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack id="infograph-return-btn stack" gap={1}>
                            <Stack direction="row" gap={1}>
                                <InfoOutlinedIcon color="info" />
                                <Typography variant="body2" textAlign="center">
                                    Varaston voi asettaa "pois käytöstä"-tilaan. Tällöin tieto varastoon liitetyistä
                                    tuotteista säilyy tietokannassa ennallaan.
                                </Typography>
                            </Stack>
                            <Button id="return-editview-btn" component={Link} to={`/admin/varastot/${storageInfo.id}`}>
                                Palaa tästä takaisin varaston tietojen ja käyttötilan muokkaus -näkymään
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

                <Box
                    id="storage-delete-form"
                    component={Form}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    sx={{ marginTop: '2rem' }}
                >
                    <Typography textAlign="center" gutterBottom>
                        Syötä alla oleva varmistenumero poiston suorittamiseksi.
                    </Typography>
                    <Grid container>
                        <Grid item xs={3} />
                        <Grid item xs={6}>
                            <Stack id="storage-delete-textfield-stacker" alignItems="center" gap={1}>
                                <Typography variant="h6">{randomInt}</Typography>

                                <TextField
                                    id="textfield-validation-numberset"
                                    type="text"
                                    placeholder="Syötä varmiste"
                                    {...register('validation_numberset', {
                                        required: { value: true, message: 'Varmistava lukusarja on pakollinen' },
                                        minLength: {
                                            value: 2,
                                            message: 'Kirjoita lukusarja',
                                        },
                                        maxLength: {
                                            value: 6,
                                            message: 'Lukusarja on 6 numeroa',
                                        },
                                        validate: () => {
                                            if (watch('validation_numberset') !== randomInt) {
                                                return 'Lukusarjat eivät täsmää';
                                            }
                                        },
                                    })}
                                    inputProps={{ required: false }}
                                    required
                                    error={!!formStateErrors.validation_numberset}
                                    helperText={formStateErrors.validation_numberset?.message?.toString() || ' '}
                                    color={isValid ? 'success' : 'warning'}
                                    fullWidth
                                />

                                <Button
                                    id="submit-btn"
                                    type="submit"
                                    disabled={!isValid || isSubmitting || isSubmitSuccessful}
                                    fullWidth
                                    color="error"
                                >
                                    {`Poista: " ${storageInfo.name} " pysyvästi`}
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} />
                    </Grid>

                    <Grid container>
                        <Grid item xs={4}>
                            <Button
                                id="cancel-btn"
                                size="small"
                                component={Link}
                                to="/admin/varastot/"
                                startIcon={<ArrowBackIcon />}
                                sx={{ margin: '4rem 0 1rem 0' }}
                            >
                                Palaa takaisin tallentamatta
                            </Button>
                        </Grid>
                        <Grid item xs={8} />
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default StorageDelete;
