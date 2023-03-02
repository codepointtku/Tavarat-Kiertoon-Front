import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    ImageList,
    ImageListItem,
    Container,
} from '@mui/material';
import { useLoaderData, useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext, useState } from 'react';
import AuthContext from '../Context/AuthContext';

function ProductDetails() {
    const { id: productId } = useParams();

    const data = useLoaderData();
    if (!data) {
        return <>ToniPal Kahville</>;
    }
    const { name: productName, free_description: description, date, category, barcode } = data;
    const [image, setImage] = useState(data.pictures[0]);
    const { auth } = useContext(AuthContext);

    return (
        <Box margin={2}>
            <Container maxWidth="md">
                <Card>
                    <CardMedia
                        component="img"
                        alt="product image"
                        height="300"
                        image={`http://localhost:8000/media/${image}`}
                    />
                    <CardContent>
                        <>
                            <ImageList cols={6} rowHeight={164}>
                                {data.pictures.map((pic) => (
                                    <ImageListItem key={pic} onClick={() => setImage(pic)}>
                                        <img
                                            src={`http://localhost:8000/media/${pic}`}
                                            srcSet={`http://localhost:8000/media/${pic}`}
                                            alt="kuva"
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
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
                                Description: {description}
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
                        </>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" aria-label="add to shopping cart">
                            <AddShoppingCartIcon />
                            Lisää koriin
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Box>
    );
}

export default ProductDetails;
