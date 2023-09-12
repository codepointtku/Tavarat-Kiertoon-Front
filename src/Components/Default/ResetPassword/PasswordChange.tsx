import { useForm } from 'react-hook-form';
import { useSubmit, useActionData } from 'react-router-dom';

import { Typography, Box, Container, TextField, Button, Alert, Avatar, AlertTitle, Grid } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

import type { resetEmailAction } from '../../../Router/actions';
import TypographyHeading from '../../TypographyHeading';

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
        <Container sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem', py: 3, my: 2 }}>
            <HeroHeader Icon={<KeyIcon />} />
            <HeroText
                title="Salasanan vaihto"
                text="Moro moro. Lähetämme syöttämääsi sähkäriin linkin, josta voit suorittaa tiliin liitetyn sähköpostin vaihdon."
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                {responseStatus?.status ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight="fontWeightMediumBold" gutterBottom>
                            Salasanan palautuslinkki lähetetty sähköpostiin onnistuneesti!
                        </Typography>
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Käyttäjänimi"
                            placeholder="Syötä uusi sähköpostiosoite"
                            {...register('username', { required: true, minLength: 4, maxLength: 40 })}
                            fullWidth
                        />
                        {errors.username && (
                            <Alert severity="error" sx={{ mt: 1, maxWidth: 300 }}>
                                <AlertTitle>Virheellinen syöte</AlertTitle>
                            </Alert>
                        )}
                        <Button type="submit" sx={{ mt: 2, fontWeight: 'fontWeightMediumBold' }}>
                            Lähetä salasanan palautuslinkki
                        </Button>
                    </form>
                )}
            </Box>
        </Container>
    );
}

export default PasswordChange;
