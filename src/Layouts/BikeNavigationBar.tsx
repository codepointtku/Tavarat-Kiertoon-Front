import { Link } from 'react-router-dom';

import { Box, Button, ButtonGroup } from '@mui/material';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ListIcon from '@mui/icons-material/List';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ViewListIcon from '@mui/icons-material/ViewList';
import HomeIcon from '@mui/icons-material/Home';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
// import PedalBikeIcon from '@mui/icons-material/PedalBike';
// import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import StorageIcon from '@mui/icons-material/Storage';

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
                    <HomeIcon sx={{ marginRight: '5px' }} />
                    Etusivu
                </Button>
                <Button component={Link} to="pyoralista">
                    <DirectionsBikeIcon sx={{ marginRight: '5px' }} />
                    Kaikki pyörät
                </Button>
                <Button component={Link} to="pyoramallit">
                    <PedalBikeIcon sx={{ marginRight: '5px' }} />
                    Pyörämallit
                </Button>
                <Button component={Link} to="pyorapaketit">
                    <BikeScooterIcon sx={{ marginRight: '5px' }} />
                    Pyöräpaketit
                </Button>
                <Button component={Link} to="perakarryt">
                    <RvHookupIcon sx={{ marginRight: '5px' }} />
                    Peräkärryt
                </Button>
                <Button component={Link} to="pyoratilaukset">
                    <ScheduleIcon sx={{ marginRight: '5px' }} />
                    Pyörätilaukset
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
