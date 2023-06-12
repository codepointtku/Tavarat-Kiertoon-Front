import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Grid, Tabs, Tab, Typography } from '@mui/material';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function UserProfilePage() {
    const [value, setValue] = useState('userInfo');

    function handleSectionChange(event, newSection) {
        setValue(newSection);
    }

    return (
        <>
            <Grid
                container
                flexDirection="row"
                gap={2}
                sx={{ height: '4rem', backgroundColor: 'primary.main', borderRadius: '0.5rem 0.5rem 0 0', p: 2 }}
            >
                <AccountCircleOutlinedIcon sx={{ fontSize: 36, color: '#fff' }} />
                <Typography variant="h5" color="background.default">
                    Käyttäjäprofiili
                </Typography>
            </Grid>
            <Tabs value={value} onChange={handleSectionChange} centered>
                <Tab component={Link} to="" value="userInfo" label="Käyttäjätiedot" />
                <Tab component={Link} to="aktiivisettilaukset" value="activeOrders" label="Aktiiviset tilaukset" />
                <Tab component={Link} to="tilaushistoria" value="orderHistory" label="Tilaushistoria" />
            </Tabs>
            <Grid flexDirection="row" sx={{ border: '1px solid blue' }}>
                <Outlet />
            </Grid>
        </>
    );
}

export default UserProfilePage;
