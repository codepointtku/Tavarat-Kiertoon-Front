import { Container, Typography, Grid, Box } from '@mui/material';
// import {CustomizedTime}

function OrderPage() {
    return (
        <Container sx={{ border: '1px solid red' }} disableGutters>
            <Grid container id="main-order-separating-grid" direction="row">
                <Grid xs={6} item>
                    <Box sx={{ p: 5, border: '1px solid blue' }}>
                        <Typography variant="overline" align="center">
                            Osio 1
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={6} item>
                    <Box sx={{ p: 5, border: '1px solid green' }}>
                        <Typography variant="overline" align="center">
                            Osio 2
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default OrderPage;
