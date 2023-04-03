import { Link } from 'react-router-dom';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { Box, Button, ButtonGroup } from '@mui/material';

function BikeLinkBar() {
    return (
        <Box id="navbuttons-wrapper" sx={{ borderBottom: '1px solid #009bd8' }}>
            <ButtonGroup
                variant="text"
                id="navbuttons"
                aria-label="navigation link buttons"
                sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
                <Button component={Link} to="pyorat">
                    <PedalBikeIcon> Pyörät </PedalBikeIcon>
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
        </Box>
    );
}

export default BikeNavigationBar;
