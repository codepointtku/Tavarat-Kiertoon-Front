import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Grid, Tabs, Tab, Button, Container } from '@mui/material';

import PersonPinIcon from '@mui/icons-material/PersonPin';

function UserAccountPage() {
    const url = window.location.href;
    const [value, setValue] = useState(initializeValue);

    function initializeValue() {
        switch (true) {
            case url.endsWith('tili'):
                return 'userInfo';
            case url.includes('tilaukset'):
                return 'activeOrders';
            case url.includes('tilaushistoria'):
                return 'orderHistory';
            default:
                return 'userInfo';
        }
    }

    function handleSectionChange(event: React.SyntheticEvent<Element, Event>, newSection: string) {
        setValue(newSection);
    }

    return (
        <Container
            id="acc-page-main-wrapper"
            maxWidth="lg"
            sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '0.5rem', padding: '1rem 0 1rem 0', mb: '2rem' }}
        >
            <Grid id="acc-page-header" container alignItems="center">
                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <PersonPinIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tabs value={value} onChange={handleSectionChange} centered>
                        <Tab component={Link} to="" value="userInfo" label="Käyttäjätiedot" />
                        <Tab component={Link} to="tilaukset" value="activeOrders" label="Aktiiviset tilaukset" />
                        <Tab component={Link} to="tilaushistoria" value="orderHistory" label="Tilaushistoria" />
                    </Tabs>
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button id="logout-btn" variant="outlined">
                        Kirjaudu ulos
                    </Button>
                </Grid>
            </Grid>
            <div id="router-outlet-container">
                <Outlet />
            </div>
        </Container>
    );
}

export default UserAccountPage;
