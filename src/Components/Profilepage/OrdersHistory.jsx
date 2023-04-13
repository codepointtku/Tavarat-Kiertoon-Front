import { Box } from '@mui/material';
import TypographyHeading from '../TypographyHeading';

function OrdersHistory({ userOrdersHistory }) {
    // console.log('ollaan historia tilaukset', userOrdersHistory);
    return (
        <Box sx={{ border: '1px solid red' }}>
            <TypographyHeading text="Tilaushistoria" />
            <p>moi tässä on tilaushistoria</p>
        </Box>
    );
}

export default OrdersHistory;
