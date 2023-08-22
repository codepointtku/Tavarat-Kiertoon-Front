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

import type { userEditLoader } from '../../Router/loaders';
import Tooltip from '../Tooltip';

//

function UserDelete({ randomInt }: any) {
    // console.log('rInt:', randomInt, typeof randomInt);
    const { userInfo } = useLoaderData() as Awaited<ReturnType<typeof userEditLoader>>;

    console.log(userInfo);

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
            <Container maxWidth="lg">
                <HeroHeader Icon={<DomainDisabledIcon />} hideInAdmin />
                <HeroText
                    title={`Poistettava käyttäjä: ${userInfo.email} / #${userInfo.id}`}
                    subtitle={`Käyttäjänimi: ${userInfo.username}`}
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
                            <Stack direction="row" gap={1} alignItems="center">
                                <DeleteForeverIcon color="error" />
                                <Typography variant="subtitle2" textAlign="center">
                                    Poistaa käyttäjän omat tiedot, kuten osoitetiedot, sekä tilaushistorian.
                                </Typography>
                            </Stack>
                            <Stack direction="row" gap={1} alignItems="center">
                                <CheckCircleOutlineIcon color="success" />
                                <Typography variant="subtitle2" textAlign="center" gutterBottom>
                                    Tilaukset säilyvät ennallaan. Tieto tilauksen tekijästä poistuu.
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack gap={1}>
                            <Stack direction="row" gap={1} alignItems="center">
                                <InfoOutlinedIcon color="info" />
                                <Typography variant="body2" textAlign="center">
                                    Käyttäjän voi asettaa inaktiiviseksi ottamalla kaikki käyttöoikeudet pois. Tällöin
                                    käyttäjään sidotut tiedot säilyvät tietokannassa ennallaan.
                                </Typography>
                            </Stack>

                            <Button
                                id="return-editview-btn"
                                component={Link}
                                to={`/admin/kayttajat/${userInfo.id}`}
                                sx={{ margin: '1rem 0 0 0' }}
                            >
                                Palaa tästä takaisin käyttäjän tietojen ja käyttöoikeuksien muokkaus-näkymään
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
                                    {`Poista käyttäjä ${userInfo.email} pysyvästi`}
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} />
                    </Grid>

                    <Grid container>
                        <Grid item xs={4}>
                            <Tooltip title="Takaisin käyttäjät-listaukseen">
                                <Button
                                    id="cancel-btn"
                                    size="small"
                                    component={Link}
                                    to="/admin/kayttajat/"
                                    startIcon={<ArrowBackIcon />}
                                    sx={{ margin: '4rem 0 1rem 0' }}
                                >
                                    Palaa takaisin tallentamatta
                                </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={8} />
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default UserDelete;
