import { Box, Grid } from '@mui/material';

import OrderCard from './OrderCard';
import TypographyHeading from '../../TypographyHeading';

function ProfileInfo({ userOrders }) {
    const activeOrders = userOrders.filter((order) => order.status !== 'Finished');
    const activeOrdersCards = activeOrders.map((order) => <OrderCard orderInfo={order} />);

    return (
        <Box sx={{ border: '1px solid red', p: 2 }}>
            <TypographyHeading text="Aktiiviset tilaukset" />
            <Grid container direction="row" gap={5} sx={{ p: 2 }}>
                {activeOrdersCards}
            </Grid>
        </Box>
    );
}

export default ProfileInfo;
