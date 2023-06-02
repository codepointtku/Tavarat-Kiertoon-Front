import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Grid, Box, TextField, Typography, Button } from '@mui/material';

function ProfileInfo({ userInfo }) {
    // console.log('ollaan ProfileInfolla', userInfo);
    const address = userInfo.address_list.map((item) => item.address);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: userInfo.username,
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            phoneNumber: userInfo.phone_number,
            userAddresses: address,
            userEmail: userInfo.email,
        },
    });

    return (
        <Box>
            <Typography variant="h5" color="primary.main" align="center" sx={{ mb: 2 }}>
                Käyttäjäprofiilin tiedot
            </Typography>
            <Grid container flexDirection="row" justifyContent="space-around">
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
        </Box>
    );
}

export default ProfileInfo;
