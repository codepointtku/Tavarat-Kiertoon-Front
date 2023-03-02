import { Link } from 'react-router-dom';

import { Box, Button, ButtonGroup } from '@mui/material';

function NavigationBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mb: '0.4rem',
                borderBottom: '1px solid #009bd8',
            }}
        >
            <ButtonGroup variant="text" aria-label="navigation link buttons">
                <Button component={Link} to="/">
                    Tuotteet
                </Button>
                <Button component={Link} to="/">
                    Kategoriat
                </Button>
                <Button component={Link} to="/">
                    Tiedotteet
                </Button>
                <Button component={Link} to="/">
                    Ohjeet
                </Button>
                <Button component={Link} to="/">
                    Tilastot
                </Button>
                <Button component={Link} to="/">
                    Lihapullat
                </Button>
            </ButtonGroup>
        </Box>
    );
}

export default NavigationBar;
