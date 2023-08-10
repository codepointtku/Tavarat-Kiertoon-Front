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

import type { orderEditLoader } from '../../Router/loaders';

//

function AdminOrderDelete({ randomInt }: any) {
    // console.log('rInt:', randomInt, typeof randomInt);
    const orderData = useLoaderData() as Awaited<ReturnType<typeof orderEditLoader>>;

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
                <HeroText title={`Poistettava tilaus: #${orderData.id}`} />

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
                            <Stack direction="row" gap={1} alignItems="center">
                                <DeleteForeverIcon color="error" />
                                <Typography variant="subtitle2" textAlign="center">
                                    Poistaa tilauksen omat tiedot
                                </Typography>
                            </Stack>
                            <Stack direction="row" gap={1} alignItems="center">
                                <CheckCircleOutlineIcon color="success" />
                                <Typography variant="subtitle2" textAlign="center" gutterBottom>
                                    Tuotteet ja tuotteiden omat tiedot säilyvät ennallaan.
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack id="infograph-return-btn stack" gap={1}>
                            <Stack direction="row" gap={1} alignItems="center">
                                <InfoOutlinedIcon color="info" />
                                <Typography variant="body2" textAlign="center">
                                    Tilauksen voi asettaa "Odottaa"-tilaan. Tällöin tieto tilaukseen liitetyistä
                                    tuotteista säilyy tietokannassa ennallaan.
                                </Typography>
                            </Stack>
                            <Button
                                id="return-editview-btn"
                                component={Link}
                                to={`/admin/tilaukset/${orderData.id}`}
                                sx={{ margin: '1rem 0 0 0' }}
                            >
                                Palaa tästä takaisin tilauksen tietojen ja tilan muokkaus-näkymään
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

                <Box
                    id="order-delete-form"
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
                            <Stack id="order-delete-textfield-stacker" alignItems="center" gap={1}>
                                <Typography id="validation-numberset-typography-render" variant="h6">
                                    {randomInt}
                                </Typography>

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
                                    {`Poista tilaus numero: " ${orderData.id} " pysyvästi`}
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
                                to="/admin/tilaukset/"
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

export default AdminOrderDelete;
