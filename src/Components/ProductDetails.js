import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import { useLoaderData, useParams } from 'react-router-dom';

function ProductDetails() {
    const { id: productId } = useParams();
    const { productName, description, dateAdded } = useLoaderData();

    return (
        <Box>
            <Paper elevation={3}>
                <Card sx={{ maxWidth: 1200 }}>
                    <CardMedia component="img" alt="product image" height="300" image="../br.jpg" />
                    <CardContent>
                        <Typography variant="body5" color="text.secondary">
                            Product Details View, product id: {productId}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Product: {productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            description: {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            added on: {dateAdded}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Paper>
        </Box>
    );
}

export default ProductDetails;
