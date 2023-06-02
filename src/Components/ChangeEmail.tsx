import { useForm } from 'react-hook-form';
import { useSubmit, useActionData, Link } from 'react-router-dom';

import {
    Container,
    Box,
    Grid,
    Typography,
    Button,
    Avatar,
    FormControl,
    OutlinedInput,
    InputLabel,
    Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TypographyTitle from './TypographyTitle';
import AlertBox from './AlertBox';

function ChangeEmail() {
    const submit = useSubmit();
    const responseStatus = useActionData() as { type: string; status: boolean };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const onSubmit = (data: any) => {
        const { newEmail } = data;
        submit({ newEmail }, { method: 'post', action: '/sahkopostinvaihto/' });
    };

    return (
        <Container sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', p: 5 }}>
            {responseStatus?.status && (
                <AlertBox
                    text="Sähköpostiosoitteen vaihdon vahvistuslinkki on lähetetty uuteen sähköpostiisi"
                    status="success"
                />
            )}
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.dark',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <EmailIcon fontSize="large" />
                    </Avatar>
                </Box>
                <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <TypographyTitle text="Sähköpostiosoitteen vaihto" />
                </Box>
            </>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid direction="column" width={500} gap={2} container>
                        <Grid item>
                            <Typography variant="h6">Syötä uusi sähköposti</Typography>
                        </Grid>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-input-change-email">Uusi sähköposti</InputLabel>
                            <OutlinedInput
                                {...register('newEmail', {
                                    required: true,
                                    maxLength: 255,
                                    pattern: /.+@turku.fi$|.+@edu.turku.fi$/,
                                })}
                                color={errors.newEmail ? 'error' : 'primary'}
                                id="outlined-input-change-email"
                                label="Uusi sähköposti"
                            />
                            {errors.newEmail && errors.newEmail.type === 'required' && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    Tämä kenttä on täytettävä
                                </Alert>
                            )}
                            {errors.newEmail && errors.newEmail.type === 'maxLength' && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    Sähköpostisi on liian pitkä
                                </Alert>
                            )}
                            {errors.newEmail && errors.newEmail.type === 'pattern' && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    Sähköpostisi täytyy loppua turku.fi tai edu.turku.fi
                                </Alert>
                            )}
                        </FormControl>
                        <Grid item>
                            {responseStatus?.status ? (
                                <Button component={Link} to="/" sx={{ fontWeight: 'fontWeightMediumBold' }}>
                                    Palaa etusivulle
                                </Button>
                            ) : (
                                <Button type="submit" sx={{ fontWeight: 'fontWeightMediumBold' }}>
                                    Vaihda sähköposti
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default ChangeEmail;
