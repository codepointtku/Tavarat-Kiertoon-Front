import { useForm } from 'react-hook-form';
import { useSubmit, useParams } from 'react-router-dom';
import { Container, Box, Grid, Typography, OutlinedInput, Button, Alert, TextField } from '@mui/material';

// interface Params {
//     uid: string | undefined;
//     token: string | undefined;
// }

function ResetPassword() {
    const submit = useSubmit();
    const { uid, token } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(uid, token);
        const { new_password, new_password_again } = data;
        uid &&
            token &&
            submit({ new_password, new_password_again, uid, token }, { method: 'post', action: 'salasanapalautettu' });
    };

    return (
        <Container>
            <Box sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, padding: 5, mt: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Salasanan palautus
                </Typography>
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
            </Box>
        </Container>
    );
}

export default ResetPassword;
