import { Link, useRouteLoaderData } from 'react-router-dom';

import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
    const data = useRouteLoaderData('root');
    // const url = `mailto:${data.email}`;
    return (
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Grid container justifyContent="space-around" alignItems="center" flexGrow="1" padding="1rem">
                <Grid item xs={12} md={6} lg={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Typography variant="subtitle2" gutterBottom>
                        Yhteystiedot
                    </Typography>
                    <Typography>{data?.phoneNumber}</Typography>
                    <Typography>{data?.address}</Typography>
                    <MuiLink href="https://github.com/codepointtku/Tavarat-Kiertoon-Front">
                        <GitHubIcon />
                    </MuiLink>
                </Grid>

                <Grid item xs={12} md={6} lg={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Typography variant="subtitle2" color="primary.contrastText">
                        Tietoa
                    </Typography>
                    <MuiLink component={Link} to="/faq" sx={{ display: 'block' }}>
                        UKK
                    </MuiLink>
                    <MuiLink component={Link} to="/tiedotteet" sx={{ display: 'block' }}>
                        Tiedotteet
                    </MuiLink>
                    <MuiLink component={Link} to="/backgroundinfo" sx={{ display: 'block' }}>
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
