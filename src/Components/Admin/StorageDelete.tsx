import { useForm } from 'react-hook-form';
import { Form, useLoaderData, useActionData, useSubmit } from 'react-router-dom';

import { Box, Button, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import AlertBox from '../AlertBox';
import Tooltip from '../Tooltip';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { storageEditLoader } from '../../Router/loaders';
import type { storageDeleteAction } from '../../Router/actions';
import { Link } from 'react-router-dom';
import TypographyTitle from '../TypographyTitle';
import TypographyHeading from '../TypographyHeading';

function StorageDelete({ randomInt }: any) {
    const storageData = useLoaderData() as Awaited<ReturnType<typeof storageEditLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof storageDeleteAction>>;

    const {
        register,
        watch,
        handleSubmit: createHandleSubmit,

        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors, dirtyFields, isDirty },
    } = useForm({
        mode: 'all',
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data: any) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'post',
        });
    });

    console.log('storageDeletessä:', randomInt);
    console.log('storageDeletessä:', typeof randomInt);

    return (
        <>
            {/* fuck */}
            {responseStatus?.type === 'deletestorage' && !responseStatus?.status && (
                <AlertBox text="Varaston pysyvä poisto epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'deletestorage' && responseStatus?.status && (
                <AlertBox text="Varasto poistettu pysyvästi" status="success" />
            )}

            <Container maxWidth="md">
                <HeroHeader Icon={<DomainDisabledIcon />} hideInAdmin />
                <HeroText
                    title={`Poistettava varasto: ${storageData.name}`}
                    subtitle={`Varaston tunnistenumero: ${storageData.id}`}
                />

                <Box
                    id="warning-text-box"
                    sx={{
                        border: '1px solid red',
                        padding: '2rem',
                        marginTop: '2rem',
                    }}
                >
                    <Stack>
                        <Typography variant="h5" color="error" textAlign="center" gutterBottom>
                            Tämä toimenpide on pysyvä, eikä tietoja voi sen jälkeen palauttaa.
                        </Typography>
                        <Typography textAlign="center" gutterBottom>
                            Olekko aivan varma? Jos oot ni syötä oheiset numerot allaolevaan tekstikenttään.
                        </Typography>
                        <Typography textAlign="center">
                            Huomaathan että voit kyl kans laittaa varaston vain "pois käytöstä"-tilaan, oisko se parempi
                            veto kumminkin kysympä vaan?
                        </Typography>
                        <Button
                            id="return-editview-btn"
                            component={Link}
                            to={`/admin/varastot/${storageData.id}`}
                            sx={{ margin: '1rem 0 1rem 0' }}
                        >
                            Palaa tästä takaisin varaston tietojen ja käyttötilan muokkaus -näkymään
                        </Button>
                        <Typography textAlign="center" gutterBottom>
                            Noh jos oot ihan satavarma ni anna mennä vaa
                        </Typography>
                    </Stack>
                </Box>

                <Box
                    id="storage-delete-form"
                    component={Form}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    sx={{ marginTop: '2rem' }}
                >
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
                                    color={dirtyFields.validation_numberset ? 'warning' : 'primary'}
                                    fullWidth
                                />

                                <Stack id="submit-cancel-btns" direction="row">
                                    <Button
                                        id="submit-btn"
                                        type="submit"
                                        disabled={!isDirty || isSubmitting || isSubmitSuccessful}
                                        fullWidth
                                        color="error"
                                    >
                                        {`Poista: " ${storageData.name} " pysyvästi`}
                                    </Button>
                                </Stack>
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
