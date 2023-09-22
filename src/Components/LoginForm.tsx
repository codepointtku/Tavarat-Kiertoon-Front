/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { Link, useFetcher, useLocation } from 'react-router-dom';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

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

import AlertBox from './AlertBox';
import AuthContext from '../Context/AuthContext';
import Welcome from './Default/AppBar/Welcome';

interface FormValues {
    email: string;
    password: string;
}

interface Props {
    redirectUrl?: string | number;
    setCurrentOpenDrawer?: (value: string) => void;
}

// component used in login page and drawer

function LoginForm({ redirectUrl, setCurrentOpenDrawer }: Props) {
    const { register, handleSubmit } = useForm<FormValues>();
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    const fetcher = useFetcher();
    // fetcher.data works like useActionData, can be used instead when fetcher is used
    const responseStatus = fetcher.data;
    console.log('responseStatus loginformissa', responseStatus);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    // onSubmit with action would always redirect to the action url, so we need to use fetcher in components where redirection is not wanted.
    // fetcher.submit will not redirect, but uses the action in the url route
    const onLoginSubmit: SubmitHandler<FieldValues> = async (formData) => {
        fetcher.submit(formData, {
            method: 'post',
            action: '/',
        });
    };

    const onLogoutSubmit = () => {
        fetcher.submit(null, {
            method: 'post',
            action: '/',
        });
        sessionStorage.clear();
    };

    return (
        <>
            {responseStatus?.type === 'logout' && responseStatus?.status && (
                <AlertBox text="Uloskirjautuminen onnistui, tervetuloa uudelleen!" status="success" timer={5000} />
            )}
            {auth.username ? (
                <>
                    {responseStatus?.type === 'login' && responseStatus?.status && (
                        <AlertBox
                            text="Sisäänkirjautuminen onnistui"
                            status="success"
                            timer={1200}
                            redirectUrl={redirectUrl as string}
                        />
                    )}
                    <>
                        <Container maxWidth="xs" component={fetcher.Form} onSubmit={handleSubmit(onLogoutSubmit)}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h4" align="center" color="primary.main" sx={{ mt: 5 }}>
                                    Tervetuloa {auth.username}!
                                </Typography>
                                <Button
                                    sx={{ mt: 3, backgroundColor: 'primary.dark' }}
                                    onClick={() => setCurrentOpenDrawer && setCurrentOpenDrawer('')}
                                    component={Link}
                                    to="/profiili"
                                    fullWidth
                                >
                                    Käyttäjätili
                                </Button>

                                <Button sx={{ mt: 3, mb: 5 }} type="submit" fullWidth>
                                    Kirjaudu ulos
                                </Button>
                            </Box>
                        </Container>
                    </>
                </>
            ) : (
                <>
                    {responseStatus?.type === 'login' && !responseStatus?.status && (
                        <AlertBox text="Sisäänkirjautuminen epäonnistui" status="error" timer={10000} />
                    )}

                    <Container maxWidth="xs" component={fetcher.Form} onSubmit={handleSubmit(onLoginSubmit)}>
                        <Box
                            sx={{
                                marginTop: 2,
                                marginBottom: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            {/* TODO add from prop to navigation from signup pages  */}
                            {location.state?.from.includes('rekisteroidy') ? (
                                <Typography>
                                    Kun olet käynyt sähköpostissa aktivoimassa tilisi, voit kirjautua tässä
                                </Typography>
                            ) : (
                                <Typography variant="h5">Kirjaudu sisään</Typography>
                            )}

                            <Box>
                                <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth required>
                                    <InputLabel htmlFor="user-email-field">Käyttäjätunnus</InputLabel>
                                    <OutlinedInput
                                        {...register('email')}
                                        id="user-email-field"
                                        type="text"
                                        label="Sähköpostiosoite"
                                    />
                                </FormControl>

                                <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                                    <InputLabel htmlFor="user-password-field">Salasana</InputLabel>
                                    <OutlinedInput
                                        {...register('password')}
                                        id="user-password-field"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Salasana"
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
                            {/* Make "forgot password" -link more visible after failed login */}
                            {responseStatus?.type === 'login' && !responseStatus?.status ? (
                                <Button
                                    sx={{
                                        mt: 2,
                                        backgroundColor: 'error.main',
                                    }}
                                    component={Link}
                                    to="salasananvaihto"
                                    onClick={() => setCurrentOpenDrawer && setCurrentOpenDrawer('')}
                                >
                                    Unohtunut salasana?
                                </Button>
                            ) : (
                                <MuiLink
                                    variant="body2"
                                    component={Link}
                                    to="salasananvaihto"
                                    sx={{
                                        display: 'block',
                                        mt: 4,
                                    }}
                                    onClick={() => setCurrentOpenDrawer && setCurrentOpenDrawer('')}
                                >
                                    Unohtunut salasana?
                                </MuiLink>
                            )}

                            <Button
                                sx={{ mt: 2 }}
                                variant="outlined"
                                component={Link}
                                to="rekisteroidy"
                                onClick={() => setCurrentOpenDrawer && setCurrentOpenDrawer('')}
                            >
                                Luo uusi tunnus
                            </Button>
                        </Box>
                    </Container>
                </>
            )}
        </>
    );
}

export default LoginForm;
