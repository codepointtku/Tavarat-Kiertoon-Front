import { useLoaderData } from 'react-router-dom';

import { Grid, Tabs, Tab, Typography } from '@mui/material';

import ProfileInfo from './ProfileInfo';
import OrdersActive from './OrdersActive';
import OrdersHistory from './OrdersHistory';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TypographyHeading from '../../TypographyHeading';

function UserProfilePage() {
    const { userInfo, userOrders } = useLoaderData();

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
            <Tabs centered>
                <Tab label="Käyttäjätiedot" />
                <Tab label="Tilaustiedot" />
            </Tabs>
            <Grid container flexDirection="row" justifyContent="space-around" sx={{ border: '1px solid blue' }}>
                <Grid item>
                    <ProfileInfo userInfo={userInfo} />
                </Grid>

                <Grid flexDirection="column" sx={{ border: '1px solid green' }}>
                    <Grid item>
                        <OrdersActive userOrders={userOrders} />
                    </Grid>

                    <Grid item>
                        <OrdersHistory userOrdersHistory={userOrders} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default UserProfilePage;
