// import { useState } from 'react';

import { Avatar, Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import GiteIcon from '@mui/icons-material/Gite';
import Person2Icon from '@mui/icons-material/Person2';

function SignUpHero() {
    return (
        <Container
            sx={{
                mt: 2,
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'lightblue',
            }}
        >
            <Avatar
                sx={{
                    mt: 3,
                    mb: 3,
                    bgcolor: 'secondary.main',
                    width: 64,
                    height: 64,
                }}
            >
                <AppRegistrationIcon />
            </Avatar>

            <Typography variant="h4" gutterBottom>
                Tervetuloa rekisteröitymään!
            </Typography>
            <Typography variant="overline" gutterBottom>
                Ennen kuin jatkamme, on käytävä syömässä. Sekä luettava tärkeä ohje.
            </Typography>
            <Typography variant="subtitle2" mb={3}>
                Tavarat Kiertoon järjestelmään on mahdollista luoda henkilökohtainen-, tai toimipaikka-kohtainen tili.
            </Typography>

            <Paper
                sx={{
                    padding: '2rem',
                    mb: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'lightblue',
                }}
            >
                <Typography variant="subtitle1" mb={2}>
                    <Link href="http://yeah.fi" color="secondary.dark">
                        Käyttäjä-
                    </Link>
                    tili on tarkoitettu henkilökohtaiseksi hankinta-tiliksi.
                </Typography>
                <Typography variant="subtitle1">
                    <Link href="http://yeah.fi" color="secondary.dark">
                        Toimipaikka-
                    </Link>
                    tili on tarkoitettu yksikön työntekijöille yhteiseksi
                    <Link href="http://yeah.fi" color="secondary.dark">
                        _Tavarat Kiertoon_
                    </Link>
                    hankinta-tiliksi.
                </Typography>
            </Paper>

            <Typography variant="body1" mb={3}>
                Ole hyvä ja valitse käyttötarkoitukseesi sopivampi tilimuoto.
            </Typography>

            <Box
                id="signup-btns-wrapper"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // backgroundColor: 'blue',
                }}
            >
                <Box
                    id="signup-choice-btns-center"
                    sx={{
                        mb: '2rem',
                        display: 'flex',
                        flexDirection: 'row',
                        // justifyContent: 'flex-end',
                        // backgroundColor: 'lightblue',
                    }}
                >
                    <Button startIcon={<Person2Icon />} sx={{ marginRight: '2rem' }}>
                        Käyttäjä
                    </Button>
                    <Button startIcon={<GiteIcon />}>Toimipaikka</Button>
                </Box>
                <Button sx={{ mb: 3 }} size="small" variant="outlined" endIcon={<HelpOutlineIcon />}>
                    Lisää tietoa
                </Button>
            </Box>
        </Container>
    );
}

function SignupLandingPage() {
    return (
        <Paper mb={2}>
            <Container maxWidth="lg">
                <SignUpHero />
            </Container>
        </Paper>
    );
}

export default SignupLandingPage;
