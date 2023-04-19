import { Box, Grid } from '@mui/material';

import Summary from './Summary';

function Overview() {
    return (
        <Grid container>
            <Grid id="overview-grid-itemi" item>
                <Box id="overview-component" sx={{ border: '1px solid cyan', padding: '1rem' }}>
                    <Summary />
                </Box>
            </Grid>
            <Grid id="overview-grid-itemi" item>
                <Box id="overview-component" sx={{ border: '1px solid cyan', padding: '1rem' }}>
                    <p>overview-komponentti</p>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Overview;
