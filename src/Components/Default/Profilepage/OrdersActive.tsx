import { useRouteLoaderData } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';

import OrderCard from './OrderCard';
import type { userInfoLoader } from '../../../Router/loaders';

function ProfileInfo() {
    const { userOrders } = useRouteLoaderData('profile') as Awaited<ReturnType<typeof userInfoLoader>>;
    const activeOrders = userOrders.filter((order) => order.status !== 'Finished');
    const activeOrdersCards = activeOrders.map((order) => <OrderCard key={order.id} orderInfo={order} />);

    console.log(userOrders);
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" color="primary.main" align="center" sx={{ mb: 2 }}>
                Aktiiviset tilaukset
            </Typography>
            <Grid container direction="row" gap={5} sx={{ p: 2 }}>
                {activeOrdersCards}
            </Grid>
        </Box>
    );
}

export default ProfileInfo;
