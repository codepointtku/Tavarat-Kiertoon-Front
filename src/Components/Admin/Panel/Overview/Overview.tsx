import { Box, Grid } from '@mui/material';

import Summary from './Summary';

function Overview() {
    return (
        <Grid id="overview-grid-container" container flexDirection="column">
            <Grid className="overview-grid-item" item>
                <Summary />
            </Grid>
            <Grid className="overview-grid-item" item>
                <Box className="overview-component" sx={{ border: '1px solid green', padding: '1rem' }}>
                    <p>
                        overview-komponenttioverview-komponenttioverview-komponenttioverview-komponenttioverview-komponentti
                        overview-komponentti overview-komponentti overview-komponentti overview-komponentti
                        overview-komponentti overview-komponentti overview-komponentti overview-komponentti
                        overview-komponentti overview-komponentti overview-komponentti overview-komponentti
                        overview-komponentti overview-komponentti
                    </p>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Overview;
