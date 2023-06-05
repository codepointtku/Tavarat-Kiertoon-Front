import { useForm } from 'react-hook-form';
import { Form, Link } from 'react-router-dom';
import { Grid, TextField, Typography, Button } from '@mui/material';

function ProfileInfo({ userInfo }) {
    // console.log('ollaan ProfileInfolla', userInfo);
    const address = userInfo.address_list.map((item) => item.address);

    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        defaultValues: {
            username: userInfo.username,
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            phoneNumber: userInfo.phone_number,
            userAddresses: address,
            userEmail: userInfo.email,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Grid container component={Form} onSubmit={handleSubmit(onSubmit)} justifyContent="center">
            <Typography variant="h5" color="primary.main" align="center" sx={{ mb: 2 }}>
                Käyttäjäprofiilin tiedot
            </Typography>
            <Grid container id="user-info-container" flexDirection="row" justifyContent="space-evenly" sx={{ mb: 5 }}>
                <Grid container flexDirection="column" sx={{ width: 'auto' }} gap={2}>
                    <Grid item>
                        <TextField {...register('username')} label="Käyttäjänimi" placeholder="Käyttäjänimi" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('firstName')} label="Etunimi" placeholder="Etunimi" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('lastName')} label="Sukunimi" placeholder="Sukunimi" />
                    </Grid>
                </Grid>
                <Grid container flexDirection="column" sx={{ width: 'auto' }} gap={2}>
                    <Grid item>
                        <TextField {...register('phoneNumber')} label="Puhelin numero" placeholder="Puhelin numero" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('userAddresses')} label="Osoite" placeholder="Osoite" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('userEmail')} label="Sähköposti" placeholder="Sähköposti" disabled />
                        <Button component={Link} to="/sahkopostinvaihto" sx={{ ml: 2, p: 2 }}>
                            Vaihda sähköpostiosoite
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {isDirty && (
                <Button sx={{ width: 200, p: 2 }} type="submit">
                    Vahvista muutokset
                </Button>
            )}
        </Grid>
    );
}

export default ProfileInfo;
