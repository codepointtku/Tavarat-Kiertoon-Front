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
    Grid,
    Stack,
} from '@mui/material';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Person2Icon from '@mui/icons-material/Person2';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import BackButton from '../../BackButton';
import AlertBox from '../../AlertBox';
import TypographyTitle from '../../TypographyTitle';

import type { userSignupAction } from '../../../Router/actions';

function HeroText() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '1rem',
            }}
        >
            <Typography variant="subtitle2" paragraph>
                Tili on tarkoitettu yhteiskäyttötiliksi toimipaikan henkilökunnan kesken.
            </Typography>
            <Typography variant="body2" paragraph>
                Anna sähköpostiosoitteeksi toimipaikan Tavarat Kiertoon-vastuuhenkilön osoite.
            </Typography>
            <Typography variant="body2" paragraph>
                Tilille on mahdollista kirjautua käyttäjätunnuksella, tai sähköpostiosoitteella.
            </Typography>
            <Button
                component={Link}
                to="/ohjeet/tili/toimipaikka"
                size="small"
                variant="outlined"
                endIcon={<HelpOutlineIcon />}
            >
                Tarkemmat ohjeet
            </Button>
        </Box>
    );
}

function Hero() {
    return (
        <>
            <Grid container className="back-btn-avatar-wrapper">
                <Grid item xs={4}>
                    <BackButton />
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.dark',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <VpnKeyIcon />
                    </Avatar>
                </Grid>
                <Grid item xs={4} />
            </Grid>
            <Box sx={{ mt: 2, mb: 2 }}>
                <TypographyTitle text="Luo uusi tili toimipaikalle" />
                <HeroText />
            </Box>
        </>
    );
}

function LocationForm() {
    const { register, handleSubmit: createHandleSubmit } = useForm();
    const submit = useSubmit();
    const responseStatus = useActionData() as Awaited<ReturnType<typeof userSignupAction>>;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = createHandleSubmit((data) => {
        const formData = { ...data };
        submit(formData, {
            method: 'post',
            action: '/rekisteroidy/toimipaikka',
        });
    });

    return (
        <>
            {responseStatus?.type === 'create' && !responseStatus?.status && (
                <>
                    <AlertBox text="Tunnuksen luominen epäonnistui" status="error" />
                </>
            )}
            {responseStatus?.type === 'create' && responseStatus?.status && (
                <>
                    <AlertBox text="Tunnuksen luominen onnistui" status="success" />
                </>
            )}
            <Container id="signupform-location-fields-wrapper" maxWidth="sm" component={Form} onSubmit={handleSubmit}>
                <Stack id="signupform-location-fields">
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-location">Käyttäjätunnus</InputLabel>
                        <OutlinedInput
                            {...register('username')}
                            id="outlined-adornment-location"
                            type="text"
                            label="Toimipaikka"
                            placeholder="Käyttäjätunnus yhteiskäyttöön"
                            endAdornment={
                                <InputAdornment position="end">
                                    <SupervisedUserCircleIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Stack direction="row">
                        <FormControl sx={{ mt: 1, mr: 1 }} variant="outlined" fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-firstname">Etunimi</InputLabel>
                            <OutlinedInput
                                {...register('firstname')}
                                id="outlined-adornment-firstname"
                                type="text"
                                label="Etunimi"
                                placeholder="Tilin vastuuhenkilön etunimi"
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-lastname">Sukunimi</InputLabel>
                            <OutlinedInput
                                {...register('lastname')}
                                id="outlined-adornment-lastname"
                                type="text"
                                label="Sukunimi"
                                placeholder="Tilin vastuuhenkilön sukunimi"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Person2Icon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Stack>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-email">Sähköpostiosoite</InputLabel>
                        <OutlinedInput
                            {...register('email')}
                            id="outlined-adornment-email"
                            type="text"
                            label="Sähköpostiosoite"
                            placeholder="Vastuuhenkilön sähköpostiosoite"
                            endAdornment={
                                <InputAdornment position="end">
                                    <MailOutlineIcon />
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
                    <FormControl sx={{ mt: 1, mr: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-address">Osoite</InputLabel>
                        <OutlinedInput
                            {...register('address')}
                            id="outlined-adornment-address"
                            type="text"
                            label="Osoite"
                            placeholder="Toimipaikan katuosoite"
                            endAdornment={
                                <InputAdornment position="end">
                                    <HomeIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Stack direction="row">
                        <FormControl sx={{ mt: 1, mr: 1 }} variant="outlined" fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-zipcode">Postinumero</InputLabel>
                            <OutlinedInput
                                {...register('zipcode')}
                                id="outlined-adornment-zipcode"
                                type="text"
                                label="Postinumero"
                                placeholder="20100"
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-town">Kaupunki</InputLabel>
                            <OutlinedInput
                                {...register('town')}
                                id="outlined-adornment-town"
                                type="text"
                                label="Kaupunki"
                                placeholder="Turku"
                            />
                        </FormControl>
                    </Stack>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">Salasana</InputLabel>
                        <OutlinedInput
                            {...register('password')}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Salasana"
                            placeholder="Salasanan on oltava vähintään 45 merkkiä pitkä"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
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
                            placeholder="********"
                        />
                    </FormControl>

                    <Button sx={{ mt: 3, mb: 3 }} fullWidth type="submit">
                        Rekisteröidy
                    </Button>
                </Stack>
            </Container>
        </>
    );
}

function LocationSignupForm() {
    return (
        <>
            <Hero />
            <LocationForm />
        </>
    );
}

export default LocationSignupForm;
