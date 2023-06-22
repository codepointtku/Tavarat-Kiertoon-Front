import { useState } from 'react';
import { Link, useSubmit, Form, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    Container,
    Button,
    FormControl,
    InputAdornment,
    IconButton,
    Stack,
    Typography,
    TextField,
} from '@mui/material';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Person2Icon from '@mui/icons-material/Person2';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import AlertBox from '../../AlertBox';
import MessageModal from '../../MessageModal';
import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

import type { userSignupAction } from '../../../Router/actions';

function ModalFooter() {
    return (
        <Typography textAlign="center" mt={2}>
            Tämän ikkunan voi nyt sulkea turvallisesti.
        </Typography>
    );
}

function UserForm() {
    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { isSubmitSuccessful, errors: formErrors },
    } = useForm({ mode: 'onTouched' });
    const submit = useSubmit();
    const responseStatus = useActionData() as Awaited<ReturnType<typeof userSignupAction>>;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = createHandleSubmit((data) => {
        const formData = { ...data };
        submit(formData, {
            method: 'post',
            action: '/rekisteroidy/kayttaja',
        });
    });

    return (
        <>
            {responseStatus?.type === 'create' && responseStatus?.status === false && (
                <AlertBox text="Tunnuksen luominen epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'create' && responseStatus?.status && (
                <AlertBox text="Rekisteröinti onnistui!" status="success" />
            )}

            {responseStatus?.type === 'create' && responseStatus?.status && (
                <MessageModal
                    title="Tunnuksesi on nyt luotu järjestelmään"
                    content="Tili on vielä aktivoitava kirjautuaksesi sisään."
                    subcontent="Lähetimme sähköpostiisi linkin, josta voit aktivoida tunnuksesi."
                    footer={<ModalFooter />}
                />
            )}

            <Container id="signupform-user-fields-wrapper" maxWidth="sm" component={Form} onSubmit={handleSubmit}>
                <Stack id="signupform-user-fields">
                    <FormControl variant="outlined" fullWidth required disabled={isSubmitSuccessful}>
                        <TextField
                            id="input-email"
                            type="text"
                            label="Sähköpostiosoite"
                            placeholder="sinä@turku.fi"
                            {...register('email', {
                                required: { value: true, message: 'Sähköpostiosoite on pakollinen' },
                                minLength: { value: 5, message: 'Sähköpostiosoitteen on oltava vähintään 5 merkkiä' },
                                pattern: {
                                    value: /.+@turku.fi$|.+@edu.turku.fi$/,
                                    message: 'Sähköpostin on oltava muotoa @turku.fi tai @edu.turku.fi',
                                },
                            })}
                            error={!!formErrors.email}
                            helperText={formErrors.email?.message?.toString() || ' '}
                            // Attributes applied to the input element.
                            inputProps={{ required: false }}
                            // Props applied to the Input element. It will be a FilledInput, OutlinedInput or Input component depending on the variant prop value.
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <Stack direction="row">
                        <FormControl
                            sx={{ mt: 1, mr: 1 }}
                            variant="outlined"
                            fullWidth
                            required
                            disabled={isSubmitSuccessful}
                        >
                            <TextField
                                id="input-firstname"
                                type="text"
                                label="Etunimi"
                                placeholder="Tilin omistajan etunimi"
                                {...register('firstname', {
                                    required: { value: true, message: 'Etunimi on pakollinen' },
                                    minLength: { value: 1, message: 'Etunimen oltava vähintään 1 merkki' },
                                })}
                                error={!!formErrors.firstname}
                                helperText={formErrors.firstname?.message?.toString() || ' '}
                                inputProps={{ required: false }}
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required disabled={isSubmitSuccessful}>
                            <TextField
                                id="outlined-adornment-lastname"
                                type="text"
                                label="Sukunimi"
                                placeholder="Tilin omistajan sukunimi"
                                {...register('lastname', {
                                    required: { value: true, message: 'Sukunimi on pakollinen' },
                                    minLength: { value: 1, message: 'Sukunimen on oltava vähintään 1 merkki' },
                                })}
                                error={!!formErrors.lastname}
                                helperText={formErrors.lastname?.message?.toString() || ' '}
                                inputProps={{ required: false }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Person2Icon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </Stack>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required disabled={isSubmitSuccessful}>
                        <TextField
                            id="input-phonenumber"
                            type="text"
                            label="Puhelinnumero"
                            placeholder="010 123 1234"
                            {...register('phonenumber', {
                                required: { value: true, message: 'Puhelinnumero on pakollinen' },
                                minLength: { value: 1, message: 'Puhelinnumeron on oltava vähintään 1 merkki' },
                                // pattern: {
                                //     value: /.+@turku.fi$|.+@edu.turku.fi$/,
                                //     message: 'Puhelinnumero muodossa 010 123 1234',
                                // },
                            })}
                            error={!!formErrors.phonenumber}
                            helperText={formErrors.phonenumber?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <PhoneIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>

                    <Stack direction="row">
                        <FormControl
                            sx={{ mt: 1, mr: 1 }}
                            variant="outlined"
                            fullWidth
                            required
                            disabled={isSubmitSuccessful}
                        >
                            <TextField
                                id="input-address"
                                type="text"
                                label="Osoite"
                                placeholder="Tavaran vastaanotto-osoite"
                                {...register('address', {
                                    required: { value: true, message: 'Osoite on pakollinen' },
                                    minLength: { value: 1, message: 'Osoitteen on oltava vähintään 1 merkki' },
                                })}
                                error={!!formErrors.address}
                                helperText={formErrors.address?.message?.toString() || ' '}
                                inputProps={{ required: false }}
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required disabled={isSubmitSuccessful}>
                            <TextField
                                id="input-zipcode"
                                type="text"
                                label="Postinumero"
                                placeholder="20100"
                                {...register('zipcode', {
                                    required: { value: true, message: 'Postinumero on pakollinen' },
                                    minLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                                })}
                                error={!!formErrors.zipcode}
                                helperText={formErrors.zipcode?.message?.toString() || ' '}
                                inputProps={{ required: false }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <HomeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </Stack>
                    <FormControl sx={{ mt: 1 }} variant="outlined" required disabled={isSubmitSuccessful}>
                        <TextField
                            id="input-town"
                            type="text"
                            label="Kaupunki"
                            placeholder="Turku"
                            {...register('town', {
                                required: { value: true, message: 'Kaupunki on pakollinen' },
                                minLength: { value: 1, message: 'Kaupungin on oltava vähintään 1 merkki' },
                            })}
                            error={!!formErrors.town}
                            helperText={formErrors.town?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required disabled={isSubmitSuccessful}>
                        <TextField
                            id="input-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Salasana"
                            placeholder="Kirjoita salasana"
                            {...register('password', {
                                required: { value: true, message: 'Salasana on pakollinen' },
                                minLength: { value: 2, message: 'Salasanan on oltava vähintään 2 merkkiä' },
                            })}
                            error={!!formErrors.password}
                            inputProps={{ required: false }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required disabled={isSubmitSuccessful}>
                        <TextField
                            id="input-passwordrepeat"
                            type={showPassword ? 'text' : 'password'}
                            label="Salasana uudelleen"
                            placeholder="Kirjoita salasana uudelleen"
                            {...register('passwordCheck', {
                                required: { value: true, message: 'Salasana on pakollinen' },
                                minLength: { value: 2, message: 'Salasanan on oltava vähintään 2 merkkiä' },
                                // validate: (value) => value === getValues('password') || 'Salasanat eivät täsmää',
                            })}
                            error={!!formErrors.passwordCheck}
                            helperText={formErrors.passwordCheck?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                        />
                    </FormControl>
                    <Button sx={{ mt: 3, mb: 3 }} fullWidth type="submit" disabled={isSubmitSuccessful}>
                        Rekisteröidy
                    </Button>
                    <Button
                        component={Link}
                        to="/ohjeet/tili/kayttaja"
                        sx={{ mb: 2 }}
                        variant="text"
                        endIcon={<HelpOutlineIcon />}
                    >
                        Ohjeet
                    </Button>
                </Stack>
            </Container>
        </>
    );
}

function UserSignupForm() {
    return (
        <Container maxWidth="md">
            <HeroHeader Icon={<VpnKeyIcon />} />
            <HeroText title="Luo uusi käyttäjätili" />
            <UserForm />
        </Container>
    );
}

export default UserSignupForm;
