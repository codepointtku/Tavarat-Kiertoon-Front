import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit, useLocation, useActionData, useNavigate } from 'react-router-dom';
import { Container, Box, Grid, Typography, Button, Alert, TextField, Avatar } from '@mui/material';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import TypographyTitle from '../../TypographyTitle';

interface ResponseStatus {
    type: string;
    status: Boolean;
}

function ResetPassword() {
    const submit = useSubmit();
    const navigate = useNavigate();
    const responseStatus = useActionData() as ResponseStatus;
    const {
        state: { uid, token },
    } = useLocation();

    console.log(uid, token);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        const { new_password, new_password_again } = data;
        uid &&
            token &&
            submit({ new_password, new_password_again, uid, token }, { method: 'post', action: 'salasananpalautus' });
    };

    useEffect(() => {
        responseStatus?.status && navigate('palautusonnistui');
        responseStatus?.type === 'outdatedtoken' && navigate('/');
    }, [responseStatus]);

    return (
        <Container sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', p: 5 }}>
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.dark',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <LockResetRoundedIcon fontSize="large" />
                    </Avatar>
                </Box>
                <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <TypographyTitle text="Salasanan palauttaminen" />
                </Box>
            </>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid direction="column" width={500} gap={2} container>
                        <Grid item>
                            <Typography variant="h6">Syötä uusi salasana</Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Uusi salasana"
                                type="password"
                                {...register('new_password', { required: true, maxLength: 255 })}
                                fullWidth
                            />
                        </Grid>
                        {errors.new_password && <Alert severity="error">Virheellinen syöte</Alert>}
                        <Grid item>
                            <TextField
                                label="Uusi salasana uudestaan"
                                type="password"
                                {...register('new_password_again', {
                                    required: true,
                                    maxLength: 255,
                                    validate: (value, formValues) => value === formValues.new_password,
                                })}
                                fullWidth
                            />
                        </Grid>
                        {errors.new_password_again && <Alert severity="error">Virheellinen syöte</Alert>}
                        <Grid item>
                            <Button type="submit" sx={{ fontWeight: 'fontWeightMediumBold' }}>
                                Palauta salasana
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default ResetPassword;

{
    /* <Box sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, padding: 5, mt: 5 }}>
<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
    Salasanan palautus
</Typography> */
}
