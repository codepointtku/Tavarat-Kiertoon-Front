/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { Typography, TextField, Grid } from '@mui/material';

import CartButtons from './CartButtons';

function ContactsAndDelivery() {
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            locationCode: '',
            deliveryAddress: '',
            deliveryMethod: '',
        },
    });

    const onSubmit = (data) => console.log(data);
    // console.log(errors);
    console.log(formState);

    // const values = getValues(['firstName', 'lastName', 'email', 'phoneNumber', 'locationCode']);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main' }}>
                Yhteystiedot
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField label="Etunimi" variant="outlined" {...register('firstName')} />
                </Grid>
                <Grid item>
                    <TextField label="Sukunimi" variant="outlined" {...register('lastName')} />
                </Grid>
                <Grid item>
                    <TextField label="Sähköposti" variant="outlined" {...register('email')} />
                </Grid>
                <Grid item>
                    <TextField label="Puh. numero" variant="outlined" {...register('phoneNumber')} />
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2, color: 'primary.main' }}>
                Toimitus
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField label="Toimitusosoite" variant="outlined" {...register('deliveryAddress')} />
                </Grid>
                <Grid item>
                    <TextField label="Toimitustapa" variant="outlined" {...register('deliveryMethod')} />
                </Grid>
            </Grid>
            <button type="submit">SUBMIT</button>
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
