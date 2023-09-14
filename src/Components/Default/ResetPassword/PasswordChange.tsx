import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit, Link } from 'react-router-dom';

import { Typography, Container, TextField, Button, Stack, Link as MuiLink } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

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

function PasswordChange() {
    const [linkSent, setLinkSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm({
        mode: 'all',
    });

    const submit = useSubmit();

    const onSubmit = (data: any) => {
        const { username } = data;
        submit({ username }, { method: 'post', action: '/salasananvaihto/' });
        setLinkSent(true);
    };

    return (
        <>
            <Container maxWidth="md" sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', p: 3, mb: 2 }}>
                <HeroHeader Icon={<KeyIcon />} hideInAdmin />
                {!linkSent && (
                    <HeroText
                        title="Salasanan vaihto"
                        subtext2="Lähetämme syöttämääsi sähköpostiosoitteeseen linkin, josta voi suorittaa tilin salasanan vaihdon."
                    />
                )}
                <Container maxWidth="md">
                    {linkSent ? (
                        <HeroText
                            title="Salasanan vaihtolinkki on nyt lähetetty."
                            subtitle="Olet vielä sisäänkirjautuneena tilillesi nykyisellä salasanalla."
                            subtext=" Seuraa sähköpostista löytyvän linkin ohjeita tilin salasanan vaihtamiseksi."
                            footer={<MsgFooter />}
                        />
                    ) : (
                        <Stack component={Form} onSubmit={handleSubmit(onSubmit)} alignItems="center" spacing={1}>
                            <TextField
                                label="Sähköpostiosoite"
                                {...register('username', {
                                    required: { value: true, message: 'Syötä sähköpostiosoite' },
                                    //this pattern will match a string containing at least:
                                    // `@` symbol with any character before and after it,
                                    // + a dot `.` and any character after it
                                    pattern: { value: /.+@.+\..+/, message: 'Syötteen on oltava sähköpostiosoite' },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!errors.username}
                                helperText={errors.username?.message?.toString() || ' '}
                                color={isValid ? 'success' : 'primary'}
                                fullWidth
                            />
                            <Button id="submit-btn" type="submit" sx={{ mt: 2 }}>
                                Lähetä salasanan palautuslinkki
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

export default PasswordChange;
