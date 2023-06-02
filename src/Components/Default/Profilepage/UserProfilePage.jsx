import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Grid, Tabs, Tab, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import ProfileInfo from './ProfileInfo';
import OrdersActive from './OrdersActive';
import OrdersHistory from './OrdersHistory';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function UserProfilePage() {
    const [value, setValue] = useState('userInfo');
    const { userInfo, userOrders } = useLoaderData();

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
            <TabContext value={value}>
                <Tabs value={value} onChange={handleSectionChange} centered>
                    <Tab value="userInfo" label="Käyttäjätiedot" />
                    <Tab value="userOrders" label="Tilaustiedot" />
                </Tabs>
                <Grid container flexDirection="row" justifyContent="space-around" sx={{ border: '1px solid blue' }}>
                    <TabPanel value="userInfo">
                        <Grid item>
                            <ProfileInfo userInfo={userInfo} />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="userOrders">
                        <Grid flexDirection="column" sx={{ border: '1px solid green' }}>
                            <Grid item>
                                <OrdersActive userOrders={userOrders} />
                            </Grid>

                            <Grid item>
                                <OrdersHistory userOrdersHistory={userOrders} />
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Grid>
            </TabContext>
        </>
    );
}

export default UserProfilePage;
