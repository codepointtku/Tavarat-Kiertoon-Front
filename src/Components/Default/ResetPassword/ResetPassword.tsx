import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit, useLocation, Form } from 'react-router-dom';

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
    InputAdornment,
    InputLabel,
    IconButton,
    Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import TypographyTitle from '../../TypographyTitle';
import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        state: { uid, token },
    } = useLocation();

    const submit = useSubmit();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        const { new_password, new_password_again } = data;
        uid &&
            token &&
            submit(
                { new_password, new_password_again, uid, token },
                { method: 'post', action: '/salasananpalautus/salasanapalautettu/' }
            );
    };

    return (
        <Container sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', p: 3, mb: 2 }}>
            <HeroHeader Icon={<LockResetRoundedIcon />} hideInAdmin />
            <HeroText title="Salasanan vaihtaminen" />
            <Container maxWidth="sm">
                <Stack component={Form} onSubmit={handleSubmit(onSubmit)} gap={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Uusi salasana</InputLabel>
                        <OutlinedInput
                            {...register('new_password', {
                                required: true,
                                minLength: { value: 16, message: 'Salasanan on oltava vähintään 16 merkkiä' },
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
                            <>
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    Salasanan on oltava vähintään 16 merkkiä
                                </Alert>
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    Virheellinen syöte
                                </Alert>
                            </>
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
                    <Button type="submit">Vaihda salasana</Button>
                </Stack>
            </Container>
        </Container>
    );
}

export default ResetPassword;
