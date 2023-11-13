import { Box } from '@mui/material';

import PieChart from '../../Stats/PieChart';

function StatTest() {
    return (
        <Box id="stat-test-container" sx={{ display: 'flex', flex: 1 }}>
            <PieChart />
        </Box>
    );
}

export default StatTest;
