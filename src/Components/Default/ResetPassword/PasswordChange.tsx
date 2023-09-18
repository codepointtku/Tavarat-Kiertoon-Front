import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit, Link, useActionData } from 'react-router-dom';

import AuthContext from '../../../Context/AuthContext';

import { Typography, Container, TextField, Button, Stack, Link as MuiLink } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import AlertBox from '../../AlertBox';

import type { resetEmailAction } from '../../../Router/actions';

const SuperLink = MuiLink as typeof MuiLink | typeof Link;

function MsgFooter() {
    return (
        <Typography>
            <SuperLink component={Link} to={'/kirjaudu'}>
                Kirjaudu
            </SuperLink>{' '}
            tai{' '}
            <SuperLink component={Link} to="/">
                siirry etusivulle
            </SuperLink>
        </Typography>
    );
}

function PasswordChange() {
    const { auth } = useContext(AuthContext);
    const responseData = useActionData() as Awaited<ReturnType<typeof resetEmailAction>>;

    const {
        register,
        handleSubmit,
        formState: { isValid, errors, isSubmitSuccessful },
    } = useForm({
        mode: 'all',
    });

    const submit = useSubmit();

    const onSubmit = (data: any) => {
        const { username } = data;
        submit({ username }, { method: 'post', action: '/salasananvaihto/' });
    };

    return (
        <>
            {responseData?.status === false && <AlertBox text="Jokin meni pieleen" status="warning" />}

            <Container maxWidth="md" sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', p: 3, mb: 2 }}>
                <HeroHeader Icon={<KeyIcon />} hideInAdmin />
                {!isSubmitSuccessful && (
                    <HeroText
                        title="Salasanan vaihto"
                        subtext2="Lähetämme tiliin liitettyyn sähköpostiin linkin, josta voi suorittaa tilin salasanan vaihdon."
                    />
                )}
                <Container maxWidth="md">
                    {isSubmitSuccessful ? (
                        <HeroText
                            title="Salasanan vaihtolinkki on nyt lähetetty."
                            subtext2="Seuraa sähköpostista löytyvän linkin ohjeita tilin salasanan vaihtamiseksi."
                            footer={<MsgFooter />}
                        />
                    ) : (
                        <Stack component={Form} onSubmit={handleSubmit(onSubmit)} alignItems="center" spacing={1}>
                            <TextField
                                label="Käyttäjänimi"
                                {...register('username', {
                                    required: { value: true, message: 'Syötä tilin käyttäjänimi' },
                                    //this pattern will match a string containing at least:
                                    // `@` symbol with any character before and after it,
                                    // + a dot `.` and any character after it
                                    // pattern: { value: /.+@.+\..+/, message: 'Syötteen on oltava sähköpostiosoite' },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!errors.username}
                                helperText={errors.username?.message?.toString() || ' '}
                                color={isValid ? 'success' : 'primary'}
                                fullWidth
                            />
                            <Button id="submit-btn" type="submit" disabled={!isValid}>
                                Lähetä linkki
                            </Button>
                        </Stack>
                    )}
                    {auth.username && (
                        <Button
                            id="back-btn"
                            variant="outlined"
                            size="small"
                            component={Link}
                            to="/tili"
                            sx={{ mt: 2 }}
                        >
                            Takaisin
                        </Button>
                    )}
                </Container>
            </Container>
        </>
    );
}

export default PasswordChange;
