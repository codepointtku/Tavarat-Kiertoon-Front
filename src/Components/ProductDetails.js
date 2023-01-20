import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { productId } = useParams();

    return (
        <Box>
            <Paper elevation={3}>
                <Card sx={{ maxWidth: 1200 }}>
                    <CardMedia component="img" alt="turku logo" height="300" image="turku_pysty_300ppi_black.png" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Product
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                            all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>{' '}
                <Typography> ProductDetails id:{productId} - tuotteen yksityiskohtaiset tiedot</Typography>
            </Paper>
        </Box>
    );
}

export default ProductDetails;
