import { useRouteLoaderData } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import OrderCard from './OrderCard';

function OrdersHistory() {
    const { userOrders } = useRouteLoaderData('profile');
    const finishedOrders = userOrders.filter((order) => order.status === 'Finished');
    const ordersHistoryCards = finishedOrders.map((order) => <OrderCard key={order.id} orderInfo={order} />);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" color="primary.main" align="center" sx={{ mb: 2 }}>
                Tilaushistoria
            </Typography>
            <Grid direction="row" gap={5} container>
                {ordersHistoryCards}
            </Grid>
        </Box>
    );
}

export default OrdersHistory;
