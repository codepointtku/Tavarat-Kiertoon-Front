import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Header from './Components/Header';
import Footer from './Components/Footer';

// admin Layout

function Admin({ children }) {
    return (
        <>
            <Header />
            <ButtonAppBar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

Admin.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Admin;

// mock admin app bar for testing purposes, this shall be deleted
function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Adminin työkalupalkki-esimerkki
                    </Typography>
                    <Button color="inherit">Luo juttuja</Button>
                    <Button color="inherit">Editoi juttuja</Button>
                    <Button>sudo rm -rf</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
