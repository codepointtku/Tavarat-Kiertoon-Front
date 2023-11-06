import { Stack, Typography } from '@mui/material';

// import LineChart from '../../Stats/LineChart';
import AreaChart from '../../Stats/AreaChart';

function SummaryOrders() {
    return (
        <Stack alignItems="center">
            <Typography variant="subtitle2">Kuluvan kuukauden tilausmäärät</Typography>
            {/* <LineChart /> */}
            <AreaChart />
        </Stack>
    );
}

export default SummaryOrders;
