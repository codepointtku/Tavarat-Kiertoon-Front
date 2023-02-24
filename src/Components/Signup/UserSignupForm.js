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
import Person2Icon from '@mui/icons-material/Person2';
import PhoneIcon from '@mui/icons-material/Phone';
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
        const formData = { ...data, jointuser: false };
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
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-email">Sähköpostiosoite</InputLabel>
                        <OutlinedInput
                            {...register('email')}
                            id="outlined-adornment-email"
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
                        <InputLabel htmlFor="outlined-adornment-firstname">Etunimi</InputLabel>
                        <OutlinedInput
                            {...register('firstname')}
                            id="outlined-adornment-firstname"
                            type="text"
                            label="Etunimi"
                            placeholder="Tonipal"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Person2Icon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-lastname">Sukunimi</InputLabel>
                        <OutlinedInput
                            {...register('lastname')}
                            id="outlined-adornment-lastname"
                            type="text"
                            label="Sukunimi"
                            placeholder="Kahville"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Person2Icon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-phonenumber">Puhelinnumero</InputLabel>
                        <OutlinedInput
                            {...register('phonenumber')}
                            id="outlined-adornment-phonenumber"
                            type="text"
                            label="Puhelinnumero"
                            placeholder="010 111 1111"
                            endAdornment={
                                <InputAdornment position="end">
                                    <PhoneIcon />
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
                        <InputLabel htmlFor="outlined-adornment-passwordrepeat">Salasana uudelleen</InputLabel>
                        <OutlinedInput
                            {...register('passwordCheck')}
                            id="outlined-adornment-passwordrepeat"
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
