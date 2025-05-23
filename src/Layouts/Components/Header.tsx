import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';

import logo from '../../Assets/Turku_vaaka_300ppi_viiva_white.png';

function Header() {
    return (
        <header>
            <Box id="header-container" sx={{ backgroundColor: 'primary.main', padding: '1rem' }}>
                <Grid container flexDirection="row" spacing={2}>
                    <Grid item>
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Turku logo"
                                style={{ width: 'auto', maxWidth: '9rem', height: 'auto' }}
                            />
                        </Link>
                    </Grid>

                    <Grid item>
                        <Box sx={{ display: 'flex', minHeight: '100%', alignItems: 'center' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Typography variant="h4" color="primary.contrastText">
                                    Tavarat Kiertoon
                                </Typography>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </header>
    );
}

export default Header;
