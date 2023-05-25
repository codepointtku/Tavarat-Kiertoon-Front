import { Box, Grid, Stack, Typography } from '@mui/material';

import News from './News';

import SummaryOrders from './SummaryOrders';
import SummaryProducts from './SummaryProducts';
import SummaryUsers from './SummaryUsers';

import StatTest from './StatTest';
// import StatTestTwo from './StatTestTwo';

// function SummaryHero() {
//     return (
//         <Box sx={{ marginBottom: '2rem', paddingTop: '1rem' }}>
//             <Typography variant="h6" textAlign="center" color="#000">
//                 Järjestelmän tila
//             </Typography>
//         </Box>
//     );
// }

function Summary() {
    return (
        <Box id="admin-summary-area">
            {/* <SummaryHero /> */}
            <Grid id="summary-grid-container" container justifyContent="space-evenly" marginTop="2rem">
                <Grid className="summary-item" item>
                    <News />
                </Grid>
                <Grid className="summary-item" item>
                    <Stack>
                        <Typography sx={{ color: '#000' }} variant="h6" component="div">
                            Yhteenveto
                        </Typography>
                        <SummaryOrders />
                        <SummaryProducts />
                        <SummaryUsers />
                    </Stack>
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
