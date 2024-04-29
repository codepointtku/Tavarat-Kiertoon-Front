import { useForm } from 'react-hook-form';
import { useSubmit, useActionData, Link, Form, useNavigation } from 'react-router-dom';

import { Container, Typography, Button, TextField, Stack, Link as MuiLink } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

import AlertBox from './AlertBox';
import HeroHeader from './HeroHeader';
import HeroText from './HeroText';

const SuperLink = MuiLink as typeof MuiLink | typeof Link;

function MsgFooter() {
    return (
        <Typography>
            <SuperLink component={Link} to={'/tili'}>
                Palaa takaisin tilisivulle
            </SuperLink>{' '}
            tai{' '}
            <SuperLink component={Link} to="/">
                siirry etusivulle
            </SuperLink>
        </Typography>
    );
}

function ChangeEmail() {
    const submit = useSubmit();
    const responseStatus = useActionData() as { type: string; status: boolean };

    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isValid, isSubmitting },
    } = useForm({ mode: 'all' });

    const onSubmit = (data: any) => {
        const { newEmail } = data;
        submit({ newEmail }, { method: 'post', action: '/sahkopostinvaihto/' });
    };

    return (
        <>
            {responseStatus?.status === false && <AlertBox text="Jokin meni pieleen" status="warning" />}

            <Container maxWidth="md" sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', p: 5 }}>
                <HeroHeader Icon={<EmailIcon />} hideInAdmin />
                {!isSubmitSuccessful && (
                    <HeroText
                        title="Sähköpostiosoitteen vaihto"
                        subtext2="Lähetämme syöttämääsi sähköpostiosoitteeseen linkin, josta voi suorittaa tilin sähköpostiosoitteen vaihdon."
                    />
                )}
                <Container maxWidth="md">
                    {isSubmitSuccessful ? (
                        <HeroText
                            title="Sähköpostin vaihtolinkki on nyt lähetetty."
                            subtitle="Olet vielä sisäänkirjautuneena tilillesi nykyisellä sähköpostiosoitteella."
                            subtext=" Seuraa linkin ohjeita tilin sähköpostiosoitteen vaihtamiseksi."
                            footer={<MsgFooter />}
                        />
                    ) : (
                        <Stack component={Form} onSubmit={handleSubmit(onSubmit)} alignItems="center" spacing={1}>
                            <TextField
                                label="Sähköposti"
                                {...register('newEmail', {
                                    required: { value: true, message: 'Syötä sähköpostiosoite' },
                                    pattern: {
                                        value: /.+@turku.fi$|.+@edu.turku.fi$/,
                                        message: 'Osoitteen on oltava muotoa @turku.fi tai @edu.turku.fi',
                                    },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!errors.newEmail}
                                helperText={errors.newEmail?.message?.toString() || ' '}
                                color={isValid ? 'success' : 'primary'}
                                fullWidth
                            />

                            <Button type="submit" disabled={isLoading || isSubmitting || isSubmitSuccessful}>
                                Lähetä linkki
                            </Button>
                        </Stack>
                    )}
                    <Button id="back-btn" variant="outlined" size="small" component={Link} to="/tili" sx={{ mt: 2 }}>
                        Takaisin
                    </Button>
                </Container>
            </Container>
        </>
    );
}

export default ChangeEmail;
