import { Link } from 'react-router-dom';

import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
    return (
        <Box id="footer-container" sx={{ backgroundColor: 'primary.main' }}>
            <Grid container justifyContent="space-around" alignItems="center" flexGrow="1" padding="1rem">
                <Grid item xs={12} md={6} lg={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Typography variant="subtitle2" gutterBottom>
                        Yhteystiedot
                    </Typography>
                    <MuiLink href="https://github.com/codepointtku/Tavarat-Kiertoon-Front" color="#663900">
                        <GitHubIcon />
                    </MuiLink>
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
                    xxxx
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
