/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { Typography, TextField, Grid, MenuItem, Box } from '@mui/material';

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

    const addresses = ['Osoite 1', 'Osoite 2', 'Osoite 3', 'Osoite 4'];
    // const handleChange = (SelectChangeEvent) => {
    //     setSelectedAddress(SelectChangeEvent.target.value);
    // };
    // const navigate = useNavigate();
    // function onSubmit(data) {
    //     const onSubmit = (data) => {
    //         navigate(forwardUrl);
    //         return data;
    //     };
    // }
    // console.log(errors);
    const onSubmit = (data) => alert(JSON.stringify(data));
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
                    <TextField
                        label="Toimitusosoitteet"
                        variant="outlined"
                        value="Osoite 1"
                        {...register('deliveryAddress')}
                        select
                    >
                        {addresses.map((address) => (
                            <MenuItem value={address}>{address}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Toimitustapa" variant="outlined" {...register('deliveryMethod')} />
                </Grid>
            </Grid>
            <Box
                sx={{
                    p: 5,
                    fontWeight: 'bold',
                    fontSize: '22px',
                    marginTop: 5,
                    borderStyle: 'solid',
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.light',
                }}
            >
                Toimituksessa voi kestää 1-2 viikkoa.
            </Box>
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
