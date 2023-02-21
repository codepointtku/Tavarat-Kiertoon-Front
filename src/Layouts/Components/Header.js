// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
// import AuthContext from '../../Context/AuthContext';
import logo from '../../Assets/Turku_vaaka_300ppi_viiva_white.png';
// import TestButtons from '../../Components/TestButtons';

// const { auth, setAuth } = useContext(AuthContext);

function Header() {
    return (
        <header>
            <Box sx={{ backgroundColor: 'primary.main', padding: '1rem' }}>
                <Grid container flexDirection="row">
                    <Grid item xs={12} md={2}>
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Turku logo ja teksti valkoinen"
                                style={{ width: 'auto', maxWidth: '100%', height: 'auto' }}
                            />
                        </Link>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Box sx={{ display: 'flex', minHeight: '100%', alignItems: 'center', pl: '2rem' }}>
                            <Typography variant="h4" color="primary.contrastText">
                                Tavarat Kiertoon
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* <TestButtons /> */}
            </Box>
        </header>
    );
}

export default Header;
