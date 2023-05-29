import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';

import {
    Container,
    Box,
    Grid,
    Typography,
    Button,
    Alert,
    Avatar,
    FormControl,
    OutlinedInput,
    InputLabel,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TypographyTitle from './TypographyTitle';

function ChangeEmail() {
    const submit = useSubmit();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        const { newEmail } = data;
        submit({ newEmail }, { method: 'post', action: '/sahkopostinvaihto/' });
    };

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
                            <InputLabel htmlFor="outlined-adornment-new-email">Uusi sähköposti</InputLabel>
                            <OutlinedInput
                                {...register('newEmail', {
                                    required: true,
                                    maxLength: 255,
                                })}
                                id="outlined-adornment-new-email"
                                label="Uusi sähköposti"
                            />
                            {errors.new_email && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    Virheellinen syöte
                                </Alert>
                            )}
                        </FormControl>
                        <Grid item>
                            <Button type="submit" sx={{ fontWeight: 'fontWeightMediumBold' }}>
                                Vaihda sähköposti
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default ChangeEmail;
