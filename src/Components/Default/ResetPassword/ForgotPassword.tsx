import { useForm } from 'react-hook-form';
import { useSubmit, useActionData } from 'react-router-dom';

import { Typography, Box, Container, TextField, Button, Alert, Avatar, AlertTitle, Grid } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import BackButton from '../../BackButton';
import TypographyTitle from '../../TypographyTitle';

interface ResponseStatus {
    type: string;
    status: boolean;
}

function ForgotPassword() {
    const submit = useSubmit();
    const responseStatus = useActionData() as ResponseStatus;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        const { username } = data;
        submit({ username }, { method: 'post', action: 'unohtunutsalasana' });
    };

    return (
        <Container sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', p: 5 }}>
            <>
                <Grid container>
                    <Grid item xs={4}>
                        <BackButton />
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: 'secondary.dark',
                                width: 48,
                                height: 48,
                            }}
                        >
                            <KeyIcon fontSize="large" />
                        </Avatar>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
                <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <TypographyTitle text="Unohtunut salasana" />
                </Box>
            </>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                {responseStatus?.status ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight="fontWeightMediumBold" gutterBottom>
                            Salasanan palautuslinkki lähetetty sähköpostiin onnistuneesti!
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ width: 600 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography variant="h6" mb={2}>
                                Syötä käyttäjänimi
                            </Typography>
                            <TextField
                                label="Käyttäjänimi"
                                {...register('username', { required: true, minLength: 4, maxLength: 40 })}
                                fullWidth
                            />
                            {errors.username && (
                                <Alert severity="error" sx={{ mt: 1, maxWidth: 300 }}>
                                    <AlertTitle>Virheellinen syöte</AlertTitle>
                                </Alert>
                            )}
                            <Button type="submit" sx={{ mt: 2, fontWeight: 'fontWeightMediumBold' }}>
                                Lähetä salasanan palautuslinkki
                            </Button>
                        </form>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default ForgotPassword;

{
    /* <Grid direction="row" gap={2} alignItems="center" container>
                <Grid item>
                    <KeyIcon fontSize="large" />
                </Grid>
                <Grid item>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Unohtunut salasana
                    </Typography>
                </Grid>
            </Grid> */
}
