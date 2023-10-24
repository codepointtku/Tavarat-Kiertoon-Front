import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Grid, Tabs, Tab, Container } from '@mui/material';

import PersonPinIcon from '@mui/icons-material/PersonPin';
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; // book
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; // spying glass
import ImageSearch from '@mui/icons-material/ImageSearch';

function UserAccountPage() {
    let { pathname } = useLocation();
    const [value, setValue] = useState(initializeValue);

    function initializeValue() {
        switch (true) {
            case pathname.endsWith('tili'):
                return 'userInfo';
            case pathname.includes('tilaukset'):
                return 'activeOrders';
            case pathname.includes('tilaushistoria'):
                return 'orderHistory';
            case pathname.includes('hakuvahti'):
                return 'searchWatch';
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
                    {value === 'searchWatch' && <ImageSearch sx={{ fontSize: 48, color: 'primary.main' }} />}
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
                        <Tab component={Link} to="hakuvahti" value="searchWatch" label="Hakuvahti" />
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
