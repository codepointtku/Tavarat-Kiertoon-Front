import { Link } from 'react-router-dom';

import { Box, Button, ButtonGroup } from '@mui/material';

// import HasRole from '../../Utils/HasRole';

function LinkBar() {
    return (
        <Box id="navbuttons-wrapper" sx={{ borderBottom: '1px solid #009bd8' }}>
            <ButtonGroup
                variant="text"
                aria-label="navigation link buttons"
                sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
                <Button component={Link} to="/">
                    Tuotteet
                </Button>
                <Button component={Link} to="/tiedotteet">
                    Tiedotteet
                </Button>
                <Button component={Link} to="/ohjeet">
                    Ohjeet
                </Button>
                <Button component={Link} to="/taustatietoa">
                    Taustaa
                </Button>
                <Button component={Link} to="/otayhteytta">
                    Ota yhteyttä
                </Button>
            </ButtonGroup>
        </Box>
    );
}

function NavigationBar() {
    return (
        <Box
            id="navbar-container"
            aria-label="navigation bar"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: '1rem',
            }}
        >
            <LinkBar />
        </Box>
    );
}

export default NavigationBar;

{
    /* <HasRole role={'storage_group'}>
                <Button component={Link} to="/varasto" variant="outlined">
                    Varastonäkymä
                </Button>
            </HasRole>
            <HasRole role={'bicycle_group'}>
                <Button component={Link} to="/pyorat/pyoravarasto" variant="outlined">
                    Pyörävarasto
                </Button>
            </HasRole>
            <HasRole role="admin_group">
                <Button component={Link} to="/admin">
                    Ylläpito
                </Button>
            </HasRole> */
}
