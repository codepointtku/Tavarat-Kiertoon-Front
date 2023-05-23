import { useEffect } from 'react';
import { Link, useActionData } from 'react-router-dom';

import { Box, Button, ButtonGroup } from '@mui/material';

import HasRole from '../../Utils/HasRole';

import type { frontPageActions } from '../../Router/actions';

function LinkBar() {
    return (
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

function AuthedLinkBar() {
    return (
        <Box id="authed-navbuttons-wrapper" sx={{ marginLeft: '1rem' }}>
            <ButtonGroup
                variant="outlined"
                id="authed-navbuttons"
                aria-label="authed navigation link buttons"
                sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
                <HasRole role={'admin_group' || 'storage_group'}>
                    <Button component={Link} to="/varasto">
                        Varaston hallintanäkymä
                    </Button>
                </HasRole>
                <HasRole role="admin_group">
                    <Button component={Link} to="/admin">
                        Sivuston hallintanäkymä
                    </Button>
                </HasRole>
            </ButtonGroup>
        </Box>
    );
}

function NavigationBar() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof frontPageActions>>;

    useEffect(() => {}, [responseStatus]);

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
            <LinkBar />
            <HasRole role={'admin_group' || 'storage_group'}>
                <AuthedLinkBar />
            </HasRole>
        </Box>
    );
}

export default NavigationBar;
