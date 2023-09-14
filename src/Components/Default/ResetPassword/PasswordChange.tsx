import { useForm } from 'react-hook-form';
import { useSubmit, useActionData, Form } from 'react-router-dom';

import { Typography, Box, Container, TextField, Button, Alert, AlertTitle, Stack } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

import type { resetEmailAction } from '../../../Router/actions';
import { Link } from 'react-router-dom';

function PasswordChange() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof resetEmailAction>>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = useSubmit();

    const onSubmit = (data: any) => {
        const { username } = data;
        submit({ username }, { method: 'post', action: '/salasananvaihto/' });
    };

    return (
        <>
            <Container maxWidth="md" sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', pt: 3, mb: 2 }}>
                <HeroHeader Icon={<KeyIcon />} hideInAdmin />
                <HeroText
                    title="Salasanan vaihto"
                    subtext2="Lähetämme syöttämääsi sähköpostiosoitteeseen linkin, josta voit suorittaa tiliin liitetyn sähköpostin vaihdon."
                />
                <Container maxWidth="md" sx={{ my: 3 }}>
                    {responseStatus?.status ? (
                        <Typography variant="h6" textAlign="center" gutterBottom>
                            Salasanan palautuslinkki on nyt lähetetty.
                        </Typography>
                    ) : (
                        <Stack component={Form} onSubmit={handleSubmit(onSubmit)} alignItems="center" spacing={3}>
                            <TextField
                                label="Sähköpostiosoite"
                                {...register('username', { required: true, minLength: 4, maxLength: 60 })}
                                fullWidth
                            />
                            {errors.username && (
                                <Alert severity="error" sx={{ mt: 1, maxWidth: 300 }}>
                                    <AlertTitle>Virheellinen syöte</AlertTitle>
                                </Alert>
                            )}

                            <Button id="submit-btn" type="submit" sx={{ mt: 2, fontWeight: 'fontWeightMediumBold' }}>
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
