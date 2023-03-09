/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Link, useSubmit, Form, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    Avatar,
    Box,
    Button,
    Container,
    Checkbox,
    FormControlLabel,
    IconButton,
    Typography,
    Link as MuiLink,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

import AlertBox from '../../AlertBox';
import Tooltip from '../../Tooltip';

function LoginForm({ setCurrentOpenDrawer }) {
    const { register, handleSubmit } = useForm();
    const submit = useSubmit();
    const responseStatus = useActionData();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (data) => {
        const formData = { ...data };
        submit(formData, {
            method: 'post',
            action: '/',
        });
    };

    const handleClickCloseDrawer = () => {
        setCurrentOpenDrawer('');
    };

    const CloseDrawerButton = () => {
        function handleClick() {
            setCurrentOpenDrawer('');
        }

        const buttonHover = {
            '&:hover .MuiAvatar-root': {
                backgroundColor: 'primary.dark',
            },
        };

        return (
            <Tooltip title="Sulje">
                <IconButton
                    onClick={handleClick}
                    sx={[
                        buttonHover,
                        {
                            p: '0',
                            marginTop: '1rem',
                        },
                    ]}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <CloseIcon />
                    </Avatar>
                </IconButton>
            </Tooltip>
        );
    };

    return (
        <>
            {responseStatus?.type === 'login' && !responseStatus?.status && (
                <AlertBox text="Sisäänkirjautuminen epäonnistui" status="error" timer={3000} />
            )}
            {responseStatus?.type === 'login' && responseStatus?.status && (
                <AlertBox text="Sisäänkirjautuminen onnistui" status="success" timer={3000} />
            )}

            <Container maxWidth="xs" component={Form} onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">Kirjaudu sisään</Typography>

                    <Box>
                        <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth required>
                            <InputLabel htmlFor="user-email-field">Käyttäjätunnus</InputLabel>
                            <OutlinedInput
                                {...register('email')}
                                id="user-email-field"
                                type="text"
                                label="Sähköpostiosoite"
                                placeholder="sinä@turku.fi"
                            />
                        </FormControl>

                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                            <InputLabel htmlFor="user-password-field">Salasana</InputLabel>
                            <OutlinedInput
                                {...register('password')}
                                id="user-password-field"
                                type={showPassword ? 'text' : 'password'}
                                label="Salasana"
                                placeholder="****"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControlLabel
                            sx={{ mt: 1 }}
                            control={<Checkbox value="remember" color="primary" />}
                            label="Muista minut"
                        />
                        <Button sx={{ mt: 1 }} fullWidth type="submit">
                            Sisään
                        </Button>
                    </Box>
                    <MuiLink variant="body2" component={Link} to="/doesnotexist/" sx={{ display: 'block', mt: 4 }}>
                        Unohtunut salasana?
                    </MuiLink>

                    <Button
                        sx={{ mt: 2 }}
                        variant="outlined"
                        component={Link}
                        to="/rekisteroidy"
                        onClick={handleClickCloseDrawer}
                    >
                        Luo uusi tunnus
                    </Button>
                    <CloseDrawerButton />
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;
