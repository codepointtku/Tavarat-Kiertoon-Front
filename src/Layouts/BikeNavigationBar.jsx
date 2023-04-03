import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { Box, Button, ButtonGroup } from '@mui/material';

import AuthContext from '../Context/AuthContext';

function BikeLinkBar() {
    return (
        <Box id="navbuttons-wrapper" sx={{ borderBottom: '1px solid #009bd8' }}>
            <ButtonGroup
                variant="text"
                id="navbuttons"
                aria-label="navigation link buttons"
                sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
                <Button component={Link} to="/pyorat">
                    Pyörät
                </Button>
                <Button component={Link} to="/pyoratilaukset">
                    Pyörätilaukset
                </Button>
                <Button component={Link} to="/pyorapaketit">
                    Pyöräpaketit
                </Button>
            </ButtonGroup>
        </Box>
    );
}

function BikeNavigationBar() {
    const { auth } = useContext(AuthContext);

    return (
        <Box
            id="navbar-container"
            aria-label="navigation bar"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mb: '1rem',
            }}
        >
            <BikeLinkBar />
            {auth.storage && <BikeLinkBar />}
        </Box>
    );
}

export default BikeNavigationBar;
