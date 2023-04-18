import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';
import { Container, Box, Grid, Typography, TextField, Button, Alert } from '@mui/material';

function ResetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        const { new_password, new_password_again } = data;
        console.log(new_password, new_password_again);
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
                                    {...register('new_password', { required: true })}
                                    fullWidth
                                />
                            </Grid>
                            {errors.new_password && <Alert severity="error">Virheellinen syöte</Alert>}
                            <Grid item>
                                <TextField
                                    label="Uusi salasana uudestaan"
                                    {...register('new_password_again', { required: true })}
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
