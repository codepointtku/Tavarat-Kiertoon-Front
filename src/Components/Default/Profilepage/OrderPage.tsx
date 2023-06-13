import { useLocation } from 'react-router-dom';

import { Container, Grid, Paper, Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';

import OrderStepper from './OrderStepper';
// import CustomizedTimeline from './CustomizedTimeline';
import TypographyHeading from '../../TypographyHeading';

interface Product {
    name: string;
    amount: number;
    pictures: { id: number; picture_address: string }[];
}

interface ProductItem {
    id: number;
    product: Product;
}

function OrderPage() {
    const { state } = useLocation();

    return (
        <Container disableGutters>
            <Grid container id="main-order-separating-grid" direction="row">
                <Grid item xs={6} component={Paper} square variant="outlined" sx={{ p: 5 }}>
                    <TypographyHeading text="Tilauksesi tila" />
                    <OrderStepper orderInfo={state.orderInfo} />
                </Grid>
                <Grid item xs={6} component={Paper} square variant="outlined" sx={{ p: 5 }}>
                    <TypographyHeading text="Tilaamasi tuotteet" />
                    <Grid gap={2} sx={{ mt: 2 }} container>
                        {state.orderInfo.product_items.map((product_item: ProductItem) => (
                            <Grid
                                key={product_item.id}
                                item
                                component={Card}
                                sx={{
                                    height: 150,
                                    width: 150,
                                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                    backdropFilter: 'blur(6px)',
                                }}
                                raised
                            >
                                <CardActionArea sx={{ height: '100%' }}>
                                    <CardMedia
                                        sx={{ height: '100%' }}
                                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${product_item.product.pictures[0].picture_address}`}
                                    >
                                        <Box
                                            sx={{
                                                height: 'inherit',
                                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                backdropFilter: 'blur(3px)',
                                            }}
                                        >
                                            <Typography
                                                align="center"
                                                color="primary.dark"
                                                sx={{ p: 2, fontWeight: 'fontWeightMediumBold' }}
                                            >
                                                {product_item.product.name}
                                            </Typography>
                                            <CardContent>
                                                <Typography variant="body2" color="primary.dark" align="center">
                                                    <b>Määrä: </b>
                                                    {product_item.product.amount}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </CardMedia>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default OrderPage;
