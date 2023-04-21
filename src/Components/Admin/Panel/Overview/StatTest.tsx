import { Box } from '@mui/material';

import PieChart from '../../Stats/PieChart';

function StatTest() {
    return (
        <Box id="stat-test-container" sx={{ border: '1px solid red', padding: '1rem' }}>
            <PieChart />
        </Box>
    );
}

export default StatTest;
