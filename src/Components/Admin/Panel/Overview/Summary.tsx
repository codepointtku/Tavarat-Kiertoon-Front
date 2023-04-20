import { Box, Grid, Paper } from '@mui/material';

import SummaryOrders from './SummaryOrders';
import SummaryProducts from './SummaryProducts';
import SummaryUsers from './SummaryUsers';
import TypographyTitle from '../../../TypographyTitle';

function SummaryHero() {
    return (
        <Box sx={{ marginBottom: '2rem', paddingTop: '1rem' }}>
            <TypographyTitle text="Yhteenveto Tavarat Kiertoon-järjestelmän tilasta" />
        </Box>
    );
}

function Summary() {
    return (
        <Box id="admin-summary-area" sx={{ padding: '1rem' }}>
            <Paper elevation={1}>
                <SummaryHero />
                <Grid id="summary-grid-container" container justifyContent="space-evenly">
                    <Grid className="summary-item" item>
                        <SummaryOrders />
                    </Grid>
                    <Grid className="summary-item" item>
                        <SummaryProducts />
                    </Grid>
                    <Grid className="summary-item" item>
                        <SummaryUsers />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default Summary;
