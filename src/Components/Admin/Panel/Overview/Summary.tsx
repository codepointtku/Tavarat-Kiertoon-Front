import { Box, Grid, Paper, Typography } from '@mui/material';

import TypographyTitle from '../../../TypographyTitle';

import News from './News';

import SummaryOrders from './SummaryOrders';
import SummaryProducts from './SummaryProducts';
import SummaryUsers from './SummaryUsers';

import StatTest from './StatTest';
// import StatTestTwo from './StatTestTwo';

function SummaryHero() {
    return (
        <Box sx={{ marginBottom: '2rem', paddingTop: '1rem' }}>
            <Typography variant="h6" textAlign="center" color="#000">
                Yhteenveto Tavarat Kiertoon-järjestelmän tilasta
            </Typography>
        </Box>
    );
}

function Summary() {
    return (
        <Box id="admin-summary-area">
            <SummaryHero />
            <Grid id="summary-grid-container" container justifyContent="space-evenly">
                <Grid className="summary-item" item>
                    <News />
                </Grid>
                <Grid className="summary-item" item>
                    <SummaryOrders />
                    <SummaryProducts />
                    <SummaryUsers />
                </Grid>
                <Grid className="summary-item" item>
                    <StatTest />
                </Grid>
                {/* <Grid className="summary-item" item>
                        <StatTestTwo />
                    </Grid> */}
            </Grid>
        </Box>
    );
}

export default Summary;
