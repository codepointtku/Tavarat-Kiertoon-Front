import { Link, useRouteLoaderData } from 'react-router-dom';

import { Box, Grid, Link as MuiLink, Stack, Typography } from '@mui/material';
import { type rootLoader } from '../../Router/loaders';
import logo from '../../Assets/LOGO2.png';

function Footer() {
    const { contacts } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;

    return (
        <Box id="footer-container" sx={{ backgroundColor: 'primary.main' }}>
            <Grid container justifyContent="space-around" alignItems="center" flexGrow="1" padding="1rem">
                <Grid item xs={12} md={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Stack direction="column" spacing={0.5}>
                        <Typography variant="subtitle1">Yhteystiedot:</Typography>
                        <MuiLink component={Link} to="/otayhteytta" color="white">
                            Ota Yhteyttä - lomake
                        </MuiLink>
                        {contacts[0] && (
                            <>
                                <Typography variant="body2">{contacts[0]?.address}</Typography>
                                <Typography variant="body2">{contacts[0]?.phone_number}</Typography>
                            </>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Link to="/">
                        <img src={logo} alt="Turku logo" style={{ width: 'auto', maxWidth: '12rem', height: 'auto' }} />
                    </Link>
                    <Typography gutterBottom>© 2023 Turun Kaupunki</Typography>
                </Grid>
                <Grid item xs={12} md={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Stack direction="column" spacing={0.5}>
                        <Typography variant="subtitle1" color="primary.contrastText">
                            Lisätietoa:
                        </Typography>
                        <MuiLink component={Link} to="/ohjeet" color="white">
                            Ohjeet
                        </MuiLink>
                        <MuiLink component={Link} to="/ohjeet/ukk" color="white">
                            Usein kysytyt kysymykset
                        </MuiLink>
                        <MuiLink component={Link} to="/taustatietoa" color="white">
                            Taustaa
                        </MuiLink>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
