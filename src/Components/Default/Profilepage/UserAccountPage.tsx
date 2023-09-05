import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Grid, Tabs, Tab, Typography, Box, Stack, Button, Container } from '@mui/material';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonPinIcon from '@mui/icons-material/PersonPin';

function UserAccountPage() {
    const url = window.location.href;
    const [value, setValue] = useState(initializeValue);

    function initializeValue() {
        switch (true) {
            case url.endsWith('profiili/'):
                return 'userInfo';
            case url.includes('aktiivisettilaukset'):
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
            maxWidth="lg"
            sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '0.5rem', padding: '1rem 0 0 0', mb: '2rem' }}
        >
            <Grid
                id="profile-page-header-grid-container"
                container
                alignItems="center"
                // sx={{
                //     // height: '2rem',
                //     // backgroundColor: 'primary.light',
                //     // borderRadius: '0.5rem 0.5rem 0 0',
                // }}
            >
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <PersonPinIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tabs value={value} onChange={handleSectionChange} centered>
                        <Tab component={Link} to="" value="userInfo" label="Käyttäjätiedot" />
                        <Tab
                            component={Link}
                            to="aktiivisettilaukset?tila=Aktiivinen&järjestys=Uusinensin"
                            value="activeOrders"
                            label="Aktiiviset tilaukset"
                        />
                        <Tab
                            component={Link}
                            to="tilaushistoria?tila=Toimitettu"
                            value="orderHistory"
                            label="Tilaushistoria"
                        />
                    </Tabs>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button variant="outlined">Kirjaudu ulos</Button>
                </Grid>
            </Grid>
            <Grid flexDirection="row">
                <Outlet />
            </Grid>
        </Container>
    );
}

export default UserAccountPage;
