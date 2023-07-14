import { useLoaderData, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import {
    Button,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    ImageList,
    ImageListItem,
    Container,
    Grid,
    Paper,
    Box,
} from '@mui/material';

import AuthContext from '../../Context/AuthContext';
import BackButton from '../BackButton';
import AddToCartButton from './AddToCartButton';
import SimilarProductsCarousel from './SimilarProductsCarousel';

function ProductDetails() {
    const { product, products } = useLoaderData();
    const { id: productId } = useParams();

    const {
        name: productName,
        free_description: description,
        category,
        amount,
        measurements,
        weight,
        color,
        barcode,
    } = product;
    const [image, setImage] = useState(product.pictures[0].picture_address);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        setImage(product.pictures[0].picture_address);
    }, [location.pathname]);

    return (
        <Container id="product-detail-card">
            <Grid container mt={2} mb={2}>
                <Grid item xs={1}>
                    <BackButton />
                </Grid>
                <Grid item xs={11}>
                    <Card>
                        <Grid container id="product-img-and-details-container">
                            <Grid item xs={6}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="product image"
                                        height="350"
                                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${image}`}
                                    />
                                </CardActionArea>
                                <ImageList cols={6} rowHeight={90} sx={{ mt: 0 }}>
                                    {product.pictures.map((pic) => (
                                        <ImageListItem
                                            key={pic.picture_address}
                                            onClick={() => setImage(pic.picture_address)}
                                        >
                                            <Card
                                                sx={{
                                                    border: image === pic.picture_address && '2px ridge #009bd8',
                                                    opacity: image === pic.picture_address ? 1 : 0.7,
                                                }}
                                                square
                                            >
                                                <CardActionArea>
                                                    <CardMedia
                                                        component={Box}
                                                        sx={{ alt: 'kuvan valinta' }}
                                                        height={100}
                                                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${pic.picture_address}`}
                                                    />
                                                </CardActionArea>
                                            </Card>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        align="center"
                                        component="div"
                                        color="primary.main"
                                    >
                                        {productName}
                                    </Typography>
                                    <Paper
                                        variant="outlined"
                                        component={Grid}
                                        container
                                        direction="column"
                                        gap={2}
                                        sx={{ p: 2, borderColor: 'primary.light' }}
                                    >
                                        <Grid item>
                                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                                Tuotekuvaus: {description}
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row" gap={4}>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Määrä: {amount}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Paino: {weight}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Mitat: {measurements}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Värit: {color.join(', ')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" gap={2}>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Kategoriat:
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{ width: '4rem' }}
                                                    disabled
                                                >
                                                    {/* to be implemented when backend is ready */}
                                                    {category}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        {/* miten näyttää kategoriat, buttoneina? */}
                                    </Paper>
                                    <Grid container justifyContent="center" sx={{ mt: 5 }}>
                                        <CardActions>
                                            <AddToCartButton
                                                size="large"
                                                id={Number(productId)}
                                                groupId={Number(productId)}
                                            />
                                        </CardActions>
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>

                        <Box sx={{ mx: 2 }}>
                            {auth.storage ||
                                (auth.admin && (
                                    <>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Yksityiskohtaisemmat tiedot
                                        </Typography>
                                        <Paper variant="outlined" sx={{ p: 5 }}>
                                            {/* show id if component used in storageview or admin */}
                                            <Typography variant="body2" color="text.secondary">
                                                Product id: {productId}
                                            </Typography>
                                            {/* generate barcode if component used in storageview or admin */}
                                            <Typography variant="body2" color="text.secondary">
                                                Barcode: {barcode}
                                            </Typography>
                                        </Paper>
                                    </>
                                ))}
                            <Typography gutterBottom variant="h5" component="div" color="primary.main">
                                Samankaltaisia tuotteita
                            </Typography>
                            <SimilarProductsCarousel currentId={productId} similarProducts={products} />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductDetails;
