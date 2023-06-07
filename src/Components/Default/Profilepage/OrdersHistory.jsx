import { Box } from '@mui/material';
import TypographyHeading from '../../TypographyHeading';
import OrderCard from './OrderCard';

function OrdersHistory({ userOrdersHistory }) {
    console.log(userOrdersHistory);
    return (
        <Box sx={{ border: '1px solid red', p: 2 }}>
            <TypographyHeading text="Tilaushistoria" />
            <OrderCard />
        </Box>
    );
}

export default OrdersHistory;
