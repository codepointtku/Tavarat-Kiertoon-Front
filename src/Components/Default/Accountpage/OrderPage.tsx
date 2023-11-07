import { useLocation, Link } from 'react-router-dom';

import { Container, Grid, Paper, Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';

import OrderStepper from './OrderStepper';
import BackButton from '../../BackButton';
import TypographyHeading from '../../TypographyHeading';

interface Product {
    id: number;
    name: string;
    amount: number;
    pictures: { id: number; picture_address: string }[];
}

interface ProductItem {
    id: number;
    product: Product;
}

function OrderPage() {
    // location.state is unrealiable?
    const { state } = useLocation();
    const productRenderItems: ProductItem[][] = [];
    //TODO: memoize this?
    state?.orderInfo?.product_items?.forEach((productItem: ProductItem) => {
        // check if array already contains an item.product.id array
        const productIndex = productRenderItems.findIndex((index) => index[0]?.product.id === productItem.product.id);
        if (productIndex < 0) {
            // if not, push a new array with this item as its first object
            productRenderItems.push([productItem]);
        } else {
            // if yes, push this item to that array
            productRenderItems[productIndex].push(productItem);
        }
    });
    return (
        <Container disableGutters>
            <Box sx={{ my: 2 }}>
                <BackButton />
            </Box>
            <Grid container id="main-order-separating-grid" direction="row">
                <Grid item xs={6} component={Paper} square variant="outlined" sx={{ p: 5 }}>
                    <TypographyHeading text="Tilauksesi tila" />
                    <OrderStepper orderInfo={state.orderInfo} />
                </Grid>
                <Grid item xs={6} component={Paper} square variant="outlined" sx={{ p: 5 }}>
                    <TypographyHeading text="Tilaamasi tuotteet" />
                    <Grid gap={2} sx={{ mt: 2 }} container>
                        {productRenderItems.map((product_item: ProductItem[]) => (
                            <Grid
                                key={product_item[0].id}
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
                                <CardActionArea
                                    sx={{ height: '100%' }}
                                    component={Link}
                                    to={`/tuotteet/${product_item[0].product.id}`}
                                >
                                    <CardMedia
                                        sx={{ height: '100%' }}
                                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${product_item[0]?.product?.pictures[0]?.picture_address}`}
                                    >
                                        <Box
                                            sx={{
                                                height: 'inherit',
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                backdropFilter: 'blur(3px)',
                                            }}
                                        >
                                            <Typography
                                                align="center"
                                                color="primary.dark"
                                                sx={{ p: 2, fontWeight: 'fontWeightMediumBold' }}
                                            >
                                                {product_item[0].product.name}
                                            </Typography>
                                            <CardContent>
                                                <Typography variant="body2" color="primary.dark" align="center">
                                                    <b>Määrä: </b>
                                                    {product_item.length}
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
