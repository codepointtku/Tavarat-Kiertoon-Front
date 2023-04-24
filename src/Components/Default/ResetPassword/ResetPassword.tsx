import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit, useLocation, useActionData, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Grid,
    Typography,
    Button,
    Alert,
    TextField,
    Avatar,
    FormControl,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import TypographyTitle from '../../TypographyTitle';

interface ResponseStatus {
    type: string;
    status: Boolean;
}

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const submit = useSubmit();
    const navigate = useNavigate();
    const responseStatus = useActionData() as ResponseStatus;
    const {
        state: { uid, token },
    } = useLocation();

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
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Uusi salasana</InputLabel>
                            <OutlinedInput
                                {...register('new_password', {
                                    required: true,
                                    maxLength: 255,
                                })}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                label="Uusi salasana"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
                                            onMouseDown={(event) => event.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.new_password && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    Virheellinen syöte
                                </Alert>
                            )}
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-passwordrepeat">Uusi salasana uudelleen</InputLabel>
                            <OutlinedInput
                                {...register('new_password_again', {
                                    required: true,
                                    maxLength: 255,
                                    validate: (value, formValues) => value === formValues.new_password,
                                })}
                                id="outlined-adornment-passwordrepeat"
                                type={showPassword ? 'text' : 'password'}
                                label="Uusi salasana uudelleen"
                            />
                            {errors.new_password_again && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    Virheellinen syöte
                                </Alert>
                            )}
                        </FormControl>
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
