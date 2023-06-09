import { useLocation } from 'react-router-dom';

import { Container, Grid, Paper, Card, CardHeader, CardContent, CardMedia, Typography, Box } from '@mui/material';

import CustomizedTimeline from './CustomizedTimeline';
import TypographyHeading from '../../TypographyHeading';

interface Product {
    name: string;
    amount: number;
    pictures: { id: number; picture_address: string }[];
}

interface ProductItem {
    product: Product;
}

function OrderPage() {
    const { state } = useLocation();

    console.log(state.orderInfo.product_items);

    return (
        <Container disableGutters>
            <Grid container id="main-order-separating-grid" direction="row">
                <Grid item xs={6} component={Paper} square variant="outlined" sx={{ p: 5 }}>
                    <TypographyHeading text="Tilauksesi tila" />
                    <CustomizedTimeline />
                </Grid>
                <Grid item xs={6} component={Paper} square variant="outlined" sx={{ p: 5 }}>
                    <TypographyHeading text="Tilaamasi tuotteet" />
                    <Grid gap={2} sx={{ mt: 2 }} container>
                        {state.orderInfo.product_items.map((product_item: ProductItem) => (
                            <Grid
                                item
                                component={Card}
                                sx={{
                                    height: 200,
                                    width: 200,
                                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                    backdropFilter: 'blur(6px)',
                                }}
                                raised
                            >
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
                                        <CardHeader
                                            component={Typography}
                                            align="center"
                                            color="primary.dark"
                                            title={product_item.product.name}
                                        ></CardHeader>
                                        <CardContent>
                                            <Typography variant="body2" color="primary.dark" align="center">
                                                <b>Määrä: </b>
                                                {product_item.product.amount}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </CardMedia>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default OrderPage;
