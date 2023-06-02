import { Box } from '@mui/material';

import PolarAreaChart from '../../Stats/PolarAreaChart';

function StatTestTwo() {
    return (
        <Box id="stat-test-container-2" sx={{ border: '1px solid blue', padding: '1rem' }}>
            <PolarAreaChart />
        </Box>
    );
}

export default StatTestTwo;
