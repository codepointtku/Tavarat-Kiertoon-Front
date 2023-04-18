import { useForm } from 'react-hook-form';
import { Typography, Box, Container, TextField } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

function ForgotPassword() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => console.log(data);

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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography variant="h6" mb={2}>
                                Syötä käyttäjänimi
                            </Typography>
                            <TextField label="Käyttäjänimi" {...register('username', { required: true })} fullWidth />
                        </form>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default ForgotPassword;
