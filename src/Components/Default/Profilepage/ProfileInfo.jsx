import { useForm } from 'react-hook-form';
import { Form, Link, useSubmit } from 'react-router-dom';
import { Grid, TextField, Typography, Button } from '@mui/material';

function ProfileInfo({ userInfo }) {
    // console.log('ollaan ProfileInfolla', userInfo);
    const submit = useSubmit();
    const address = userInfo.address_list.map((item) => item.address);
    console.log(address);

    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        defaultValues: {
            username: userInfo.username,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            phone_number: userInfo.phone_number,
            userAddresses: address[0],
            email: userInfo.email,
        },
    });

    const onSubmit = (data) => {
        submit(data, { method: 'put', action: '/profiili' });
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
                        <TextField {...register('first_name')} label="Etunimi" placeholder="Etunimi" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('last_name')} label="Sukunimi" placeholder="Sukunimi" />
                    </Grid>
                </Grid>
                <Grid container flexDirection="column" sx={{ width: 'auto' }} gap={2}>
                    <Grid item>
                        <TextField {...register('phone_number')} label="Puhelin numero" placeholder="Puhelin numero" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('userAddresses')} label="Osoite" placeholder="Osoite" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('email')} label="Sähköposti" placeholder="Sähköposti" disabled />
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
