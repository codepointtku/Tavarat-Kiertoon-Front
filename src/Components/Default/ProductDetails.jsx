import { useLoaderData, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    ImageList,
    ImageListItem,
    Container,
    Grid,
} from '@mui/material';

import AuthContext from '../../Context/AuthContext';
import BackButton from '../BackButton';
import AddToCartButton from './AddToCartButton';

function ProductDetails() {
    const data = useLoaderData();
    const { id: productId } = useParams();

    const { name: productName, free_description: description, date, category, barcode } = data;
    const [image, setImage] = useState(data.pictures[0].picture_address);
    const { auth } = useContext(AuthContext);

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
                                <CardMedia
                                    component="img"
                                    alt="product image"
                                    height="460"
                                    image={`${window.location.protocol}//${window.location.hostname}:8000/media/${image}`}
                                />
                                <ImageList cols={6} rowHeight={164}>
                                    {data.pictures.map((pic) => (
                                        <ImageListItem
                                            key={pic.picture_address}
                                            onClick={() => setImage(pic.picture_address)}
                                        >
                                            <img
                                                src={`${window.location.protocol}//${window.location.hostname}:8000/media/${pic.picture_address}`}
                                                srcSet={`${window.location.protocol}//${window.location.hostname}:8000/media/${pic.picture_address}`}
                                                alt="kuva"
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {productName}
                                    </Typography>
                                    {/* show id if component used in storageview or admin */}
                                    {auth.storage || auth.admin ? (
                                        <Typography variant="body6" color="text.secondary">
                                            Product id: {productId}
                                        </Typography>
                                    ) : null}

                                    <Typography variant="body1" color="text.secondary" gutterBottom>
                                        Tuotekuvaus: {description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Added on: {new Date(date).toLocaleDateString('fi-FI')}
                                    </Typography>
                                    {/* generate barcode if component used in storageview or admin */}
                                    {auth.storage || auth.admin ? (
                                        <Typography variant="body2" color="text.secondary">
                                            Barcode: {barcode}
                                        </Typography>
                                    ) : null}
                                    {/* miten näyttää kategoriat, buttoneina? */}
                                    <Typography variant="body2" color="text.secondary">
                                        Kategoriat:
                                    </Typography>
                                    <Button variant="contained" size="small" disabled>
                                        {/* to be implemented when backend is ready */}
                                        {category}
                                    </Button>

                                    <CardActions>
                                        <AddToCartButton
                                            size="medium"
                                            id={Number(productId)}
                                            productName={productName}
                                        />
                                    </CardActions>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductDetails;
