import { Link } from 'react-router-dom';

import { Box, Button, ButtonGroup } from '@mui/material';

function NavigationBar() {
    return (
        <Box
            id="navbar-container"
            aria-label="navigation bar"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mb: '0.4rem',
            }}
        >
            <Box id="navbuttons-wrapper" sx={{ borderBottom: '1px solid #009bd8' }}>
                <ButtonGroup
                    variant="text"
                    id="navbuttons"
                    aria-label="navigation link buttons"
                    sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    <Button component={Link} to="/">
                        Tuotteet
                    </Button>
                    <Button component={Link} to="/kategoriat">
                        Kategoriat
                    </Button>
                    <Button component={Link} to="/tiedotteet">
                        Tiedotteet
                    </Button>
                    <Button component={Link} to="/ohjeet">
                        Ohjeet
                    </Button>
                    <Button component={Link} to="/stats">
                        Tilastot
                    </Button>
                    <Button component={Link} to="/lihapullat">
                        Lihapullat
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
}

export default NavigationBar;
