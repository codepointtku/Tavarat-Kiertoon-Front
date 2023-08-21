import { Link, useRouteLoaderData } from 'react-router-dom';

// import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import { type rootLoader } from '../../Router/loaders';

function Footer() {
    const { contacts } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;

    return (
        <Box id="footer-container" sx={{ backgroundColor: 'primary.main' }}>
            <Grid container justifyContent="space-around" alignItems="center" flexGrow="1" padding="1rem">
                <Grid item xs={12} md={6} lg={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    © 2023 Turun Kaupunki
                </Grid>
                <Grid item xs={12} md={6} lg={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Typography variant="subtitle2" color="primary.contrastText">
                        Tietoa
                    </Typography>
                    <MuiLink component={Link} to="/ohjeet/ukk" sx={{ display: 'block' }}>
                        UKK
                    </MuiLink>
                    <MuiLink component={Link} to="/tiedotteet" sx={{ display: 'block' }}>
                        Tiedotteet
                    </MuiLink>
                    <MuiLink component={Link} to="/taustatietoa" sx={{ display: 'block' }}>
                        Taustaa
                    </MuiLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Typography variant="subtitle2" gutterBottom>
                        Yhteystiedot
                    </Typography>
                    <MuiLink component={Link} to="/otayhteytta" color="white">
                        Ota Yhteyttä - lomake
                    </MuiLink>
                    {contacts[0] && (
                        <>
                            <Typography variant="body2" gutterBottom>
                                {contacts[0]?.address}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {contacts[0]?.phone_number}
                            </Typography>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
