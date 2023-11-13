import { Stack } from '@mui/material';

import SummaryOrders from './SummaryOrders';

function Summary() {
    return (
        <Stack direction="row" flex={1}>
            <SummaryOrders />
        </Stack>
    );
}

export default Summary;
