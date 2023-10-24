import { useEffect, useState } from 'react';
import { Link, useSubmit, Form, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    Container,
    Button,
    FormControl,
    InputAdornment,
    IconButton,
    Typography,
    Stack,
    TextField,
} from '@mui/material';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
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

function LocationForm() {
    const {
        register,
        handleSubmit: createHandleSubmit,
        watch,
        setError,
        formState: { errors: formErrors },
    } = useForm({ mode: 'all' });
    const submit = useSubmit();

    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const responseStatus = useActionData() as Awaited<ReturnType<typeof userSignupAction>>;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = createHandleSubmit((data) => {
        const formData = { ...data };
        submit(formData, {
            method: 'post',
            action: '/rekisteroidy/toimipaikka',
        });
        setIsSubmitSuccessful(true);
    });
    useEffect(() => {
        if (responseStatus?.data) {
            setIsSubmitSuccessful(responseStatus?.status);

            if (responseStatus?.data?.username) {
                setError('username', { type: 'custom', message: 'Tämä tunnus on jo varattu' });
            }
        }
    }, [responseStatus]);
    return (
        <>
            {isSubmitSuccessful === false && responseStatus?.status === false && (
                <AlertBox text="Tunnuksen luominen epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'create' && responseStatus?.status && (
                <AlertBox text="Tunnuksen luominen onnistui" status="success" />
            )}

            {responseStatus?.type === 'create' && responseStatus?.status && (
                <MessageModal
                    title="Toimipaikkatili on nyt luotu järjestelmään"
                    content="Tili on vielä aktivoitava."
                    subcontent="Lähetimme vastuuhenkilön sähköpostiin linkin, josta voi suorittaa tilin aktivoinnin."
                    footer={<ModalFooter />}
                />
            )}

            <Container id="signupform-location-fields-wrapper" maxWidth="sm" component={Form} onSubmit={handleSubmit}>
                <Stack id="signupform-location-fields">
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="input-location-name"
                            type="text"
                            label="Toimipaikka"
                            placeholder="Käyttäjätunnus yhteiskäyttöön"
                            {...register('username', {
                                required: { value: true, message: 'Tunnus on pakollinen' },
                            })}
                            error={!!formErrors.username}
                            helperText={formErrors.username?.message?.toString() || ' '}
                            disabled={isSubmitSuccessful}
                            required
                            inputProps={{ required: false }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SupervisedUserCircleIcon />
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
                                placeholder="Tilin vastuuhenkilön etunimi"
                                {...register('firstname', {
                                    required: { value: true, message: 'Etunimi on pakollinen' },
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
                                id="input-lastname"
                                type="text"
                                label="Sukunimi"
                                placeholder="Tilin vastuuhenkilön sukunimi"
                                {...register('lastname', {
                                    required: { value: true, message: 'Sukunimi on pakollinen' },
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
                            id="input-email"
                            type="text"
                            label="Sähköpostiosoite"
                            placeholder="Vastuuhenkilön sähköpostiosoite"
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
                            disabled={isSubmitSuccessful}
                            required
                            inputProps={{ required: false }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="input-phonenumber"
                            type="text"
                            label="Puhelinnumero"
                            placeholder="010 1231234"
                            {...register('phonenumber', {
                                required: { value: true, message: 'Puhelinnumero on pakollinen' },
                                minLength: { value: 7, message: 'Puhelinnumeron on vähintään 7 merkkiä' },
                                maxLength: { value: 15, message: 'Puhelinnumero on enintään 15 merkkiä' },
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
                    <FormControl sx={{ mt: 1, mr: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="input-address"
                            type="text"
                            label="Osoite"
                            placeholder="Toimipaikan katuosoite"
                            {...register('address', {
                                required: { value: true, message: 'Osoite on pakollinen' },
                            })}
                            error={!!formErrors.address}
                            helperText={formErrors.address?.message?.toString() || ' '}
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
                    <Stack direction="row">
                        <FormControl sx={{ mt: 1, mr: 1 }} variant="outlined" fullWidth>
                            <TextField
                                id="input-zipcode"
                                type="text"
                                label="Postinumero"
                                placeholder="20100"
                                {...register('zipcode', {
                                    required: { value: true, message: 'Postinumero on pakollinen' },
                                    minLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                                    maxLength: { value: 5, message: 'Postinumero on 5 merkkiä' },
                                })}
                                error={!!formErrors.zipcode}
                                helperText={formErrors.zipcode?.message?.toString() || ' '}
                                disabled={isSubmitSuccessful}
                                required
                                inputProps={{ required: false }}
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                            <TextField
                                id="input-town"
                                type="text"
                                label="Kaupunki"
                                placeholder="Turku"
                                {...register('town', {
                                    required: { value: true, message: 'Kaupunki on pakollinen' },
                                })}
                                error={!!formErrors.town}
                                helperText={formErrors.town?.message?.toString() || ' '}
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
                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
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

                    <Button sx={{ mt: 1, mb: 3 }} fullWidth type="submit" disabled={isSubmitSuccessful}>
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
            <HeroHeader Icon={<VpnKeyIcon />} />
            <HeroText
                title="Luo uusi tili toimipaikalle"
                subtitle="Tili on tarkoitettu yhteiskäyttötiliksi toimipaikan henkilökunnan kesken."
                subtext="Anna sähköpostiosoitteeksi toimipaikan Tavarat Kiertoon-vastuuhenkilön osoite."
                subtext2="Tilille on mahdollista kirjautua käyttäjätunnuksella, tai sähköpostiosoitteella."
                footer={
                    <Button
                        component={Link}
                        to="/ohjeet/tili/toimipaikka"
                        size="small"
                        variant="outlined"
                        endIcon={<HelpOutlineIcon />}
                    >
                        Tarkemmat ohjeet
                    </Button>
                }
            />
            <LocationForm />
        </>
    );
}

export default LocationSignupForm;
