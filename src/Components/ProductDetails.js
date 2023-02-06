/* eslint-disable camelcase */
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

const itemData = [
    {
        img: '../br.jpg',
        title: 'Kuvan1 otsikko',
        id: '1',
    },
    {
        img: '../br.jpg',
        title: 'Kuvan2 otsikko',
        id: '2',
    },
    {
        img: '../br.jpg',
        title: 'Kuvan3 otsikko',
        id: '3',
    },
    {
        img: '../br.jpg',
        title: 'Kuvan4 otsikko',
        id: '4',
    },
    {
        img: '../br.jpg',
        title: 'Kuvan5 otsikko',
        id: '5',
    },
    {
        img: '../br.jpg',
        title: 'Kuvan6 otsikko',
        id: '6',
    },
];

function ProductDetails() {
    const { id: productId } = useParams();
    const { name: productName, free_description, date, category, barcode } = useLoaderData();
    const [image, setImage] = useState(itemData[0].img);
    const { auth } = useContext(AuthContext);

    return (
        <Box>
            <Container maxWidth="md">
                <Card>
                    <CardMedia component="img" alt="product image" height="300" image={image} />
                    <CardContent>
                        <>
                            <ImageList cols={6} rowHeight={164}>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.id} onClick={() => setImage(item.img)}>
                                        <img
                                            src={`${item.img}`}
                                            srcSet={`${item.img}`}
                                            alt={item.title}
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
                                Description: {free_description}
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
