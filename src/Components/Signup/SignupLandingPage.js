import { Link } from 'react-router-dom';

import { Avatar, Grid, Button, Card, CardActionArea, Container, Paper, Typography, Box } from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import GiteIcon from '@mui/icons-material/Gite';
import Person2Icon from '@mui/icons-material/Person2';

function SignUpCards() {
    const iconHover = {
        '&:hover .MuiAvatar-root': {
            backgroundColor: 'secondary.dark',
        },
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} marginBottom={6}>
                <Card sx={[iconHover, { minWidth: 220, padding: 0 }]}>
                    <CardActionArea component={Link} to="/signup/user">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    bgcolor: 'secondary.main',
                                    width: 64,
                                    height: 64,
                                }}
                            >
                                <Person2Icon fontSize="large" />
                            </Avatar>

                            <Typography color="secondary.dark" variant="subtitle1" mb={2}>
                                Käyttäjätili
                            </Typography>
                            <Typography variant="subtitle1" mb={1}>
                                on tarkoitettu henkilökohtaiseksi
                            </Typography>
                            <Typography variant="subtitle1" mb={2}>
                                hankinta-tiliksi.
                            </Typography>
                        </Box>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={6} marginBottom={6}>
                <Card sx={[iconHover, { minWidth: 220, padding: 0 }]}>
                    <CardActionArea component={Link} to="/signup/location">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    bgcolor: 'secondary.main',
                                    width: 64,
                                    height: 64,
                                }}
                            >
                                <GiteIcon fontSize="large" />
                            </Avatar>

                            <Typography color="secondary.dark" variant="subtitle1" mb={2}>
                                Toimipaikkatili
                            </Typography>
                            <Typography variant="subtitle1" mb={1}>
                                on tarkoitettu yksikön työntekijöille
                            </Typography>
                            <Typography variant="subtitle1" mb={2}>
                                yhteiseksi hankinta-tiliksi.
                            </Typography>
                        </Box>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
}

function HeroText() {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Tervetuloa rekisteröitymään!
            </Typography>
            <Typography variant="subtitle2" mb={1}>
                Tavarat Kiertoon järjestelmään on mahdollista luoda henkilökohtainen-, tai toimipaikka-kohtainen tili.
            </Typography>

            <Typography variant="body1" mb={1}>
                Ole hyvä ja valitse käyttötarkoitukseesi sopivampi tilimuoto.
            </Typography>
            <Button
                component={Link}
                to="/ohjeet/tili"
                sx={{ mt: 1, mb: 1 }}
                size="small"
                variant="outlined"
                endIcon={<HelpOutlineIcon />}
            >
                Lisää tietoa
            </Button>
        </>
    );
}

function SignUpHero() {
    return (
        <Box
            sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Avatar
                sx={{
                    mt: 2,
                    mb: 2,
                    bgcolor: 'secondary.dark',
                    width: 64,
                    height: 64,
                }}
            >
                <AppRegistrationIcon />
            </Avatar>
            <HeroText />
        </Box>
    );
}

function SignupLandingPage() {
    return (
        <Paper sx={{ marginTop: 1, marginBottom: 1 }}>
            <Container maxWidth="md">
                <SignUpHero />
                <SignUpCards />
            </Container>
        </Paper>
    );
}

export default SignupLandingPage;
