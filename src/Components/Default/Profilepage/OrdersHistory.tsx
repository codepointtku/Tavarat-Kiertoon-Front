import { useRouteLoaderData } from 'react-router-dom';
import { Box, Grid, Typography, Container } from '@mui/material';
import { OrderDetailResponse } from '../../../api';

import OrderCard from './OrderCard';
import UserOrderPagination from './UserOrderPagination';
import TypographyTitle from '../../TypographyTitle';

export interface UserOrders {
    userOrders: { count: number; results: OrderDetailResponse[] };
}

function OrdersHistory() {
    const { userOrders } = useRouteLoaderData('profile') as Awaited<UserOrders>;
    const ordersHistoryCards = userOrders.results.map((order) => <OrderCard key={order.id} orderInfo={order} />);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" color="primary.main" align="center" sx={{ mb: 2 }}>
                Tilaushistoria
            </Typography>
            <Grid direction="row" gap={5} container>
                {ordersHistoryCards.length === 0 ? (
                    <Container sx={{ mt: 2 }}>
                        <TypographyTitle text="Ei valmiita tilauksia" />
                    </Container>
                ) : (
                    ordersHistoryCards
                )}
            </Grid>
            <UserOrderPagination userOrders={userOrders} />
        </Box>
    );
}

export default OrdersHistory;
