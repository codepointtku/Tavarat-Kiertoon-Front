/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Link, useSubmit, Form, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    Box,
    Container,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Avatar,
    Typography,
} from '@mui/material';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import BackButton from '../BackButton';
import AlertBox from '../AlertBox';

function Hero() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar
                sx={{
                    mt: 1,
                    bgcolor: 'secondary.main',
                    width: 64,
                    height: 64,
                }}
            >
                <VpnKeyIcon />
            </Avatar>
            <Typography mt={1} mb={2} variant="h5">
                Luo uusi käyttäjätili
            </Typography>
        </Box>
    );
}

function UserForm() {
    const { register, handleSubmit } = useForm();
    const submit = useSubmit();
    const responseStatus = useActionData();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (data) => {
        const formData = { ...data, joint_user: false };
        console.log(formData);
        submit(formData, {
            method: 'post',
            action: '/rekisteroidy/kayttaja',
        });
    };

    return (
        <>
            {responseStatus?.type === 'create' && !responseStatus?.status && (
                <>
                    <AlertBox text="Tunnuksen luominen epäonnistui" status="error" />
                    <br />
                </>
            )}
            {responseStatus?.type === 'create' && responseStatus?.status && (
                <>
                    <AlertBox text="Tunnuksen luominen onnistui" status="success" />
                    <br />
                </>
            )}
            <Container
                id="signupform-user-fields-wrapper"
                maxWidth="sm"
                component={Form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box
                    id="signupform-user-fields"
                    sx={{
                        paddingBottom: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <FormControl variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">Sähköpostiosoite</InputLabel>
                        <OutlinedInput
                            {...register('email')}
                            id="outlined-adornment-password"
                            type="text"
                            label="Sähköpostiosoite"
                            placeholder="sinä@turku.fi"
                            endAdornment={
                                <InputAdornment position="end">
                                    <MailOutlineIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">Salasana</InputLabel>
                        <OutlinedInput
                            {...register('password')}
                            id="outlined-adornment-password"
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
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">Salasana uudelleen</InputLabel>
                        <OutlinedInput
                            {...register('passwordCheck')}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Salasana uudelleen"
                            placeholder="****"
                        />
                    </FormControl>
                    <Button sx={{ mt: 3, mb: 3 }} fullWidth type="submit">
                        Rekisteröidy
                    </Button>
                    <Button
                        component={Link}
                        to="/ohjeet/tili/kayttaja"
                        sx={{ mb: 2 }}
                        size="small"
                        variant="outlined"
                        endIcon={<HelpOutlineIcon />}
                    >
                        Ohjeet
                    </Button>
                    <BackButton />
                </Box>
            </Container>
        </>
    );
}

function UserSignupForm() {
    return (
        <>
            <Hero />
            <UserForm />
        </>
    );
}

export default UserSignupForm;
