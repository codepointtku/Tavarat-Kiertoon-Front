import { Link } from 'react-router-dom';
import { Box, Grid, Link as MuiLink } from '@mui/material';

import logo from '../../Assets/Turku_vaaka_300ppi_viiva_white.png';

function Header() {
    return (
        <header>
            <Box id="header-container" sx={{ backgroundColor: 'primary.main', padding: '1rem' }}>
                <Grid container flexDirection="row">
                    <Grid item xs={2}>
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Turku logo"
                                style={{ width: 'auto', maxWidth: '9rem', height: 'auto' }}
                            />
                        </Link>
                    </Grid>

                    <Grid item xs={10}>
                        <Box sx={{ display: 'flex', minHeight: '100%', alignItems: 'center', pl: '2rem' }}>
                            <MuiLink
                                component={Link}
                                to={'/'}
                                underline="none"
                                variant="h4"
                                color="primary.contrastText"
                                sx={{ cursor: 'pointer' }}
                            >
                                Tavarat Kiertoon
                            </MuiLink>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </header>
    );
}

export default Header;
