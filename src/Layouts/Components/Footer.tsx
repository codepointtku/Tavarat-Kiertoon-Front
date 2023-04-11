import { Link, useRouteLoaderData } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import { Fragment } from 'react';
import type { rootLoader } from '../../Routes/loaders';

function Footer() {
    const { contacts } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
    // const url = `mailto:${data.email}`;
    return (
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Grid container justifyContent="space-around" alignItems="center" flexGrow="1" padding="1rem">
                <Grid item xs={12} md={6} lg={4} color="primary.contrastText" flexDirection="column" textAlign="center">
                    <Typography variant="subtitle2" gutterBottom>
                        Yhteystiedot
                    </Typography>

                    {contacts.map((contact) => (
                        <Fragment key={contact.id}>
                            <Typography>{contact.address}</Typography>
                            <Typography> {contact.phone_number} </Typography>
                        </Fragment>
                    ))}

                    <MuiLink href="https://github.com/codepointtku/Tavarat-Kiertoon-Front" color="#663900">
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
