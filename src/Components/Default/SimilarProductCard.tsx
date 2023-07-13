import { Card, CardActionArea, CardActions, CardContent, CardMedia, CardHeader, Box, Grid } from '@mui/material';
import AddToCartButton from './AddToCartButton';

export interface SimilarProduct {
    product: {
        id: number;
        amount: number;
        color: [number];
        free_description: string;
        measurements: string;
        name: string;
        weight: number;
        pictures: [{ id: number; picture_address: string }];
    };
}

function SimilarProductCard({ product }: SimilarProduct) {
    return (
        <Card sx={{ width: 200, height: 243 }}>
            <CardActionArea>
                <CardMedia
                    component={Box}
                    sx={{ alt: 'kuva' }}
                    height={100}
                    image={`${window.location.protocol}//${window.location.hostname}:8000/media/${product.pictures[0].picture_address}`}
                />
                <CardHeader title={product.name} />
            </CardActionArea>
            <CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item></Grid>
                        <Grid item></Grid>
                    </Grid>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default SimilarProductCard;
