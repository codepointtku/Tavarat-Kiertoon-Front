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

import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Person2Icon from '@mui/icons-material/Person2';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import BackButton from '../BackButton';
import AlertBox from '../AlertBox';

function HeroText() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography mt={1} mb={2} variant="h4" gutterBottom>
                Luo uusi tili toimipaikalle
            </Typography>
            <Typography variant="body1" paragraph>
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
                sx={{ mb: 3 }}
                size="small"
                variant="outlined"
                endIcon={<HelpOutlineIcon />}
            >
                Lisää ohjeita
            </Button>
        </Box>
    );
}

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
            <HeroText />
        </Box>
    );
}

function LocationForm() {
    const { register, handleSubmit } = useForm();
    const submit = useSubmit();
    const responseStatus = useActionData();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (data) => {
        const formData = { ...data, jointuser: true };
        submit(formData, {
            method: 'post',
            action: '/rekisteroidy/toimipaikka',
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
                id="signupform-location-fields-wrapper"
                maxWidth="md"
                component={Form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box
                    id="signupform-location-fields"
                    sx={{
                        paddingBottom: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
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
                                    <SmokingRoomsIcon />
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
                        <InputLabel htmlFor="outlined-adornment-contactperson">Vastuuhenkilö</InputLabel>
                        <OutlinedInput
                            {...register('contactperson')}
                            id="outlined-adornment-contactperson"
                            type="text"
                            label="Vastuuhenkilö"
                            placeholder="Tilin vastuuhenkilön nimi"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Person2Icon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>

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
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-address">Osoite</InputLabel>
                        <OutlinedInput
                            {...register('address')}
                            id="outlined-adornment-address"
                            type="text"
                            label="Osoite"
                            placeholder="Kahvikuja 5 as. 666"
                            endAdornment={
                                <InputAdornment position="end">
                                    <HomeIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-zipcode">Postinumero</InputLabel>
                        <OutlinedInput
                            {...register('zipcode')}
                            id="outlined-adornment-zipcode"
                            type="text"
                            label="Postinumero"
                            placeholder="20100"
                            endAdornment={
                                <InputAdornment position="end">
                                    <HomeIcon />
                                </InputAdornment>
                            }
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
                            endAdornment={
                                <InputAdornment position="end">
                                    <HomeIcon />
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
                    <BackButton />
                </Box>
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
