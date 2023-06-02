import { useLoaderData } from 'react-router-dom';

import { Grid } from '@mui/material';

import ProfileInfo from './ProfileInfo';
import OrdersActive from './OrdersActive';
import OrdersHistory from './OrdersHistory';

function UserProfilePage() {
    const { userInfo, userOrders } = useLoaderData();

    return (
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
    );
}

export default UserProfilePage;
