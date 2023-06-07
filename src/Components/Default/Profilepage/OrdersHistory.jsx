import { Box, Grid } from '@mui/material';
import TypographyHeading from '../../TypographyHeading';
import OrderCard from './OrderCard';

function OrdersHistory({ userOrdersHistory }) {
    const finishedOrders = userOrdersHistory.filter((order) => order.status === 'Finished');
    const ordersHistoryCards = finishedOrders.map((order) => <OrderCard orderInfo={order} />);

    return (
        <Box sx={{ border: '1px solid red', p: 2 }}>
            <TypographyHeading text="Tilaushistoria" />
            <Grid direction="row" gap={5} container>
                {ordersHistoryCards}
            </Grid>
        </Box>
    );
}

export default OrdersHistory;
