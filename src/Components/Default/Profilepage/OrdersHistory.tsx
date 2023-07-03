import { useRouteLoaderData } from 'react-router-dom';
import { Box, Grid, Typography, Container } from '@mui/material';
import OrderCard from './OrderCard';
import { OrderDetailResponse } from '../../../api';

import TypographyTitle from '../../TypographyTitle';

interface UserOrders {
    userOrders: { results: OrderDetailResponse[] };
}

function OrdersHistory() {
    const { userOrders } = useRouteLoaderData('profile') as Awaited<UserOrders>;
    console.log(userOrders);
    const finishedOrders = userOrders.results.filter((order) => order.status === 'Finished');
    const ordersHistoryCards = finishedOrders.map((order) => <OrderCard key={order.id} orderInfo={order} />);

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
        </Box>
    );
}

export default OrdersHistory;
