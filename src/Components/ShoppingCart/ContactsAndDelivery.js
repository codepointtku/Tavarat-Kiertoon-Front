/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { Typography, TextField, Grid } from '@mui/material';

import CartButtons from './CartButtons';

function ContactsAndDelivery() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    console.log(errors);

    return (
        <form onSubmit={handleSubmit()}>
            <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main' }}>
                Yhteystiedot
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField label="Etunimi" variant="outlined">
                        <input {...register('firstName')} />
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Sukunimi" variant="outlined">
                        <input {...register('lastName')} />
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Sähköposti" variant="outlined">
                        <input {...register('email')} />
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Puh. numero" variant="outlined">
                        <input {...register('phoneNumber')} />
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Toimipaikkakoodi" variant="outlined">
                        <input {...register('locationCode')} />
                    </TextField>
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2, color: 'primary.main' }}>
                Toimitus
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField label="Toimitusosoite" variant="outlined">
                        <input {...register('deliveryAddress')} />
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Toimitustapa" variant="outlined">
                        <input {...register('deliveryMethod')} />
                    </TextField>
                </Grid>
            </Grid>
            <CartButtons
                backUrl="/ostoskori"
                forwardUrl="/ostoskori/vaihe3"
                backText="Takaisin"
                forwardText="Seuraava"
            />
        </form>
    );
}

export default ContactsAndDelivery;
