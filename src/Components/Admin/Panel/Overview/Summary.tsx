import { Box, Grid } from '@mui/material';

import SummaryOrders from './SummaryOrders';
import SummaryProducts from './SummaryProducts';
import SummaryUsers from './SummaryUsers';

function Summary() {
    return (
        <Box id="admin-summary">
            summary
            <Grid container>
                <Grid id="summary-item" item>
                    <Box id="summary-component" sx={{ border: '1px solid cyan', padding: '1rem' }}>
                        <SummaryOrders />
                    </Box>
                </Grid>
                <Grid id="summary-item" item>
                    <Box id="summary-component" sx={{ border: '1px solid cyan', padding: '1rem' }}>
                        <SummaryProducts />
                    </Box>
                </Grid>
                <Grid id="summary-item" item>
                    <Box id="summary-component" sx={{ border: '1px solid cyan', padding: '1rem' }}>
                        <SummaryUsers />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Summary;
