import { useEffect, useState } from 'react';
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
        <Stack id="modal-footer-stack" alignItems="center">
            <Typography textAlign="center" mt={2}>
                Tämän ikkunan voi nyt turvallisesti sulkea.
            </Typography>
            <Button component={Link} to="/kirjaudu" fullWidth sx={{ mt: '1rem' }}>
                Kirjaudu sisään täältä
            </Button>
        </Stack>
    );
}

function UserForm() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof userSignupAction>>;

    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit: createHandleSubmit,
        watch,
        setError,
        formState: { errors: formErrors },
    } = useForm({ mode: 'onTouched' });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        const formData = { ...data };

        submit(formData, {
            method: 'post',
            action: '/rekisteroidy/kayttaja',
        });
        setIsSubmitSuccessful(true);
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        if (responseStatus?.data) {
            setIsSubmitSuccessful(responseStatus?.status);

            if (responseStatus?.data?.username) {
                setError('email', { type: 'custom', message: 'Tämä tunnus on varattu' });
            }
        }
    }, [responseStatus]);

    return (
        <>
            {isSubmitSuccessful === false && responseStatus?.status === false && (
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
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="input-email"
                            type="text"
                            label="Sähköpostiosoite"
                            placeholder="etunimi.sukunimi@turku.fi"
                            {...register('email', {
                                required: { value: true, message: 'Sähköpostiosoite on pakollinen' },
                                minLength: { value: 5, message: 'Sähköpostiosoitteen on oltava vähintään 5 merkkiä' },
                                maxLength: { value: 50, message: 'Maksimipituus' },
                                pattern: {
                                    value: /.+@turku.fi$|.+@edu.turku.fi$/,
                                    message: 'Sähköpostin on oltava muotoa @turku.fi tai @edu.turku.fi',
                                },
                            })}
                            error={!!formErrors.email}
                            helperText={formErrors.email?.message?.toString() || ' '}
                            disabled={isSubmitSuccessful}
                            required
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
                        <FormControl sx={{ mt: 1, mr: 1 }} variant="outlined" fullWidth>
                            <TextField
                                id="input-firstname"
                                type="text"
                                label="Etunimi"
                                placeholder="Tilin omistajan etunimi"
                                {...register('firstname', {
                                    required: { value: true, message: 'Etunimi on pakollinen' },
                                    maxLength: { value: 50, message: 'Maksimipituus' },
                                })}
                                error={!!formErrors.firstname}
                                helperText={formErrors.firstname?.message?.toString() || ' '}
                                disabled={isSubmitSuccessful}
                                required
                                inputProps={{ required: false }}
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                            <TextField
                                id="outlined-adornment-lastname"
                                type="text"
                                label="Sukunimi"
                                placeholder="Tilin omistajan sukunimi"
                                {...register('lastname', {
                                    required: { value: true, message: 'Sukunimi on pakollinen' },
                                    maxLength: { value: 50, message: 'Maksimipituus' },
                                })}
                                error={!!formErrors.lastname}
                                helperText={formErrors.lastname?.message?.toString() || ' '}
                                disabled={isSubmitSuccessful}
                                required
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
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="input-phonenumber"
                            type="text"
                            label="Puhelinnumero"
                            placeholder="Sisältäen vain numeroita"
                            {...register('phonenumber', {
                                required: { value: true, message: 'Puhelinnumero on pakollinen' },
                                minLength: { value: 7, message: 'Vähintään 7 merkkiä' },
                                maxLength: { value: 15, message: 'Enintään 15 merkkiä' },
                                pattern: { value: /^[0-9]+$/, message: 'Sisällön tulee koostua vain numeroista' },
                            })}
                            error={!!formErrors.phonenumber}
                            helperText={formErrors.phonenumber?.message?.toString() || ' '}
                            disabled={isSubmitSuccessful}
                            required
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
                        <FormControl sx={{ mt: 1, mr: 1 }} variant="outlined" fullWidth>
                            <TextField
                                id="input-address"
                                type="text"
                                label="Osoite"
                                placeholder="Tavaran vastaanotto-osoite"
                                {...register('address', {
                                    required: { value: true, message: 'Osoite on pakollinen' },
                                    maxLength: { value: 50, message: 'Maksimipituus' },
                                })}
                                error={!!formErrors.address}
                                helperText={formErrors.address?.message?.toString() || ' '}
                                disabled={isSubmitSuccessful}
                                required
                                inputProps={{ required: false }}
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                            <TextField
                                id="input-zipcode"
                                type="text"
                                label="Postinumero"
                                placeholder="20100"
                                {...register('zipcode', {
                                    required: { value: true, message: 'Postinumero on pakollinen' },
                                    minLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                                    maxLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                                    pattern: { value: /^[0-9]+$/, message: 'Postinumero koostuu vain numeroista' },
                                })}
                                error={!!formErrors.zipcode}
                                helperText={formErrors.zipcode?.message?.toString() || ' '}
                                disabled={isSubmitSuccessful}
                                required
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
                    <FormControl sx={{ mt: 1 }} variant="outlined">
                        <TextField
                            id="input-town"
                            type="text"
                            label="Kaupunki"
                            placeholder="Turku"
                            {...register('town', {
                                required: { value: true, message: 'Kaupunki on pakollinen' },
                                maxLength: { value: 50, message: 'Maksimipituus' },
                            })}
                            error={!!formErrors.town}
                            helperText={formErrors.town?.message?.toString() || ' '}
                            disabled={isSubmitSuccessful}
                            required
                            inputProps={{ required: false }}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="input-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Salasana"
                            placeholder="Kirjoita salasana"
                            {...register('password', {
                                required: { value: true, message: 'Salasana on pakollinen' },
                                minLength: { value: 2, message: 'Salasanan on oltava vähintään 2 merkkiä' },
                                maxLength: { value: 50, message: 'Maksimipituus' },
                            })}
                            error={!!formErrors.password}
                            helperText={formErrors.password?.message?.toString() || ' '}
                            disabled={isSubmitSuccessful}
                            required
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
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="input-passwordrepeat"
                            type={showPassword ? 'text' : 'password'}
                            label="Salasana uudelleen"
                            placeholder="Kirjoita salasana uudelleen"
                            {...register('passwordCheck', {
                                required: { value: true, message: 'Salasana on pakollinen' },
                                minLength: { value: 2, message: 'Salasanan on oltava vähintään 2 merkkiä' },
                                maxLength: { value: 50, message: 'Maksimipituus' },
                                validate: (val: string) => {
                                    if (watch('password') !== val) {
                                        return 'Salasanat eivät täsmää';
                                    }
                                },
                            })}
                            error={!!formErrors.passwordCheck}
                            helperText={formErrors.passwordCheck?.message?.toString() || ' '}
                            disabled={isSubmitSuccessful}
                            required
                            inputProps={{ required: false }}
                        />
                    </FormControl>
                    <Button sx={{ mt: 1, mb: 2 }} fullWidth type="submit" disabled={isSubmitSuccessful}>
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
