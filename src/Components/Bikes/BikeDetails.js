import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    ImageList,
    ImageListItem,
    Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

import AuthContext from '../../Context/AuthContext';
import { sizeOptions, typeOptions } from './BikesPage';

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

export default function BikeDetails() {
    const { id: bikeId } = useParams();
    const { name, description, dateAdded, type, barcode, available, totalCount, size } = useLoaderData();
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
                                {name}
                            </Typography>
                            {/* show id if component used in storageview or admin */}
                            {auth.storage ||
                                (auth.admin && (
                                    <Typography variant="body6" color="text.secondary">
                                        Product id: {bikeId}
                                    </Typography>
                                ))}

                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                Description: {description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Added on: {dateAdded}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Heti vapaana: {available}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Yhteensä palvelussa: {totalCount}
                            </Typography>
                            {/* generate barcode if component used in storageview or admin */}
                            {auth.storage ||
                                (auth.admin && (
                                    <Typography variant="body2" color="text.secondary">
                                        Barcode: {barcode}
                                    </Typography>
                                ))}
                            <Typography variant="body2" color="text.secondary">
                                Tyyppi: {typeOptions.find((option) => option.value === type).label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Koko: {sizeOptions.find((option) => option.value === size).label}
                            </Typography>
                        </>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="medium"
                            aria-label="add to shopping cart"
                            color={available ? 'success' : 'primary'}
                        >
                            <AddShoppingCartIcon />
                            Vuokraa
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Box>
    );
}
