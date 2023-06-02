import { Grid, Box, TextField, Typography, Button } from '@mui/material';

function ProfileInfo({ userInfo }) {
    // console.log('ollaan ProfileInfolla', userInfo);

    const address = userInfo.address_list.map((item) => item.address);

    return (
        <Box>
            <Typography variant="h5" color="primary.main" align="center" sx={{ mb: 2 }}>
                Käyttäjäprofiilin tiedot
            </Typography>
            {/* <TypographyHeading text="Käyttäjäprofiilin tiedot" /> */}
            <Grid container flexDirection="row" justifyContent="space-around">
                <Grid container flexDirection="column" sx={{ width: 'auto' }} gap={2}>
                    <Grid justifyContent="space-between" container>
                        <Typography>
                            <b>Käyttäjänimi:</b> {userInfo.username}
                        </Typography>
                        <Button sx={{ ml: 2 }}>Muokkaa</Button>
                    </Grid>
                    <Grid justifyContent="space-between" container>
                        <Typography>
                            <b>Etunimi:</b> {userInfo.first_name}
                        </Typography>
                        <Button sx={{ ml: 2 }}>Muokkaa</Button>
                    </Grid>
                    <Grid justifyContent="space-between" container>
                        <Typography>
                            <b>Sukunimi:</b> {userInfo.last_name}
                        </Typography>
                        <Button sx={{ ml: 2 }}>Muokkaa</Button>
                    </Grid>
                </Grid>
                <Grid container flexDirection="column" sx={{ width: 'auto' }} gap={2}>
                    <Grid justifyContent="space-between" container>
                        <Typography>
                            <b>Puhelin numero: </b>
                            {userInfo.phone_number}
                        </Typography>
                        <Button sx={{ ml: 2 }}>Muokkaa</Button>
                    </Grid>
                    <Grid justifyContent="space-between" container>
                        <Typography>
                            <b>Osoite:</b> {address}
                        </Typography>
                        <Button sx={{ ml: 2 }}>Muokkaa</Button>
                    </Grid>
                    <Grid justifyContent="space-between" container>
                        <Typography>
                            <b>Sähköposti:</b> {userInfo.email}
                        </Typography>
                        <Button sx={{ ml: 2 }}>Muokkaa</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProfileInfo;
