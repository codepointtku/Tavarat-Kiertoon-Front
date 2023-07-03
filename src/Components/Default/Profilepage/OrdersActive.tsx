import { useRouteLoaderData } from 'react-router-dom';
import { Box, Grid, Typography, Container } from '@mui/material';

import OrderCard from './OrderCard';
import { OrderDetailResponse } from '../../../api';
import TypographyTitle from '../../TypographyTitle';

interface UserOrders {
    userOrders: { results: OrderDetailResponse[] };
}

function ProfileInfo() {
    const { userOrders } = useRouteLoaderData('profile') as Awaited<UserOrders>;

    const activeOrders = userOrders.results.filter((order) => order.status !== 'Finished');
    const activeOrdersCards = activeOrders.map((order) => <OrderCard key={order.id} orderInfo={order} />);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" color="primary.main" align="center" sx={{ mb: 2 }}>
                Aktiiviset tilaukset
            </Typography>
            <Grid container direction="row" gap={5} sx={{ p: 2 }}>
                {activeOrdersCards.length === 0 ? (
                    <Container sx={{ mt: 2 }}>
                        <TypographyTitle text="Ei aktiivisia tilauksia" />
                    </Container>
                ) : (
                    activeOrdersCards
                )}
            </Grid>
        </Box>
    );
}

export default ProfileInfo;
