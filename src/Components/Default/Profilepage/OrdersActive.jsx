import { Box, Grid, Typography } from '@mui/material';

import OrderCard from './OrderCard';

function ProfileInfo({ userOrders }) {
    const activeOrders = userOrders.filter((order) => order.status !== 'Finished');
    const activeOrdersCards = activeOrders.map((order) => <OrderCard orderInfo={order} />);

    return (
        <Box sx={{ border: '1px solid red', p: 2 }}>
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
