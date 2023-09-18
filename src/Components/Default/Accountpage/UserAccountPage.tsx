import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Grid, Tabs, Tab, Container } from '@mui/material';

import PersonPinIcon from '@mui/icons-material/PersonPin';
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; // book
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; // spying glass

function UserAccountPage() {
    const url = window.location.href;
    const [value, setValue] = useState(initializeValue);

    console.log(value);

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
        setValue(newSection); // this throws "Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>."
    }

    return (
        <Container
            id="acc-page-main-wrapper"
            maxWidth="lg"
            sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '0.5rem', padding: '1rem 0 1rem 0', mb: '2rem' }}
        >
            <Grid id="acc-page-header" container alignItems="center">
                <Grid
                    id="icon-container"
                    item
                    xs={1}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {/* a terrible if, i'm sorry, it is what it is. i'll maybe refactor this in the future if someone gives me > 200 euros */}
                    {value === 'userInfo' && <PersonPinIcon sx={{ fontSize: 48, color: 'primary.main' }} />}
                    {value === 'activeOrders' && <AutoStoriesIcon sx={{ fontSize: 48, color: 'primary.main' }} />}
                    {value === 'orderHistory' && <ManageSearchIcon sx={{ fontSize: 48, color: 'primary.main' }} />}
                </Grid>
                <Grid
                    id="tabs-container"
                    item
                    xs={10}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Tabs value={value} onChange={handleSectionChange} centered>
                        <Tab component={Link} to="" value="userInfo" label="Käyttäjätiedot" />
                        <Tab component={Link} to="tilaukset" value="activeOrders" label="Aktiiviset tilaukset" />
                        <Tab component={Link} to="tilaushistoria" value="orderHistory" label="Tilaushistoria" />
                    </Tabs>
                </Grid>
                <Grid id="spacer" item xs={1} />
            </Grid>
            <div id="router-outlet-container">
                <Outlet />
            </div>
        </Container>
    );
}

export default UserAccountPage;
