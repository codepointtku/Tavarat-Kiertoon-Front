import { useForm } from 'react-hook-form';
import { useSubmit, useActionData } from 'react-router-dom';
import { Typography, Box, Container, TextField, Button, Alert, AlertTitle } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

interface ResponseStatus {
    type: 'string';
    status: Boolean;
}

function ForgotPassword() {
    const submit = useSubmit();
    const responseStatus = useActionData() as ResponseStatus;
    console.log(responseStatus);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        const { username } = data;
        submit({ username }, { method: 'post', action: 'unohtuikosalasana' });
    };

    return (
        <Container>
            <Box
                sx={{
                    border: 3,
                    borderStyle: 'solid',
                    borderRadius: 3,
                    padding: 5,
                    mt: 5,
                }}
            >
                <KeyIcon fontSize="large" />
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', ml: 2 }}>
                    Unohtunut salasana
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Box sx={{ width: 600 }}>
                        {responseStatus?.status ? (
                            <Typography variant="h5">Salasanan palautuslinkki lähetetty onnistuneesti!</Typography>
                        ) : (
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
                                        <AlertTitle>Tämä syöte ei kelpaa.</AlertTitle>
                                    </Alert>
                                )}
                                <Button type="submit" sx={{ mt: 2, fontWeight: 'fontWeightMediumBold' }}>
                                    Lähetä salasanan palautuslinkki
                                </Button>
                            </form>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default ForgotPassword;
