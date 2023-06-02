import { Box } from '@mui/material';
import TypographyHeading from '../../TypographyHeading';

function OrdersHistory() {
    return (
        <Box sx={{ border: '1px solid red' }}>
            <TypographyHeading text="Tilaushistoria" />
            <p>moi tässä on tilaushistoria</p>
        </Box>
    );
}

export default OrdersHistory;
