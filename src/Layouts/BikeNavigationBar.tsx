import { Link } from 'react-router-dom';

import { Box, Button, ButtonGroup } from '@mui/material';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

function BikeLinkBar() {
    return (
        <Box id="bikes-navbuttons-wrapper" sx={{ borderBottom: '1px solid #009bd8' }}>
            <ButtonGroup
                variant="text"
                id="navbuttons"
                aria-label="navigation link buttons"
                sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
                <Button component={Link} to="">
                    <PedalBikeIcon />
                </Button>
                <Button component={Link} to="pyoramallit">
                    Pyörämallit
                </Button>
                <Button component={Link} to="pyoratilaukset">
                    Pyörätilaukset
                </Button>
                <Button component={Link} to="pyorapaketit">
                    Pyöräpaketit
                </Button>
            </ButtonGroup>
        </Box>
    );
}

function BikeNavigationBar() {
    return (
        <Box
            id="bikes-navbar-container"
            aria-label="navigation bar"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mb: '1rem',
            }}
        >
            <BikeLinkBar />
        </Box>
    );
}

export default BikeNavigationBar;
