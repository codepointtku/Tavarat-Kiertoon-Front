import { useLocation } from 'react-router-dom';

import { Container, Grid, Paper } from '@mui/material';

import CustomizedTimeline from './CustomizedTimeline';
import TypographyHeading from '../../TypographyHeading';

function OrderPage() {
    const { state } = useLocation();

    return (
        <Container disableGutters>
            <Grid container id="main-order-separating-grid" direction="row">
                <Grid xs={6} component={Paper} square variant="outlined" sx={{ p: 5 }} item>
                    <TypographyHeading text="Tilauksesi tila" />
                    <CustomizedTimeline />
                </Grid>
                <Grid xs={6} component={Paper} square variant="outlined" sx={{ p: 5 }} item>
                    <TypographyHeading text="Tilaamasi tuotteet" />
                    <Grid container>{state.orderInfo.product_items.map((product_item: {}) => product_item)}</Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default OrderPage;
