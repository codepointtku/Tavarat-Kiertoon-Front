import { useLoaderData, useNavigation } from 'react-router-dom';
import { Button, Grid, ImageList, Typography, Box } from '@mui/material';
import { type productItemsReturnLoader } from '../../Router/loaders';
import { Link } from 'react-router-dom';
import ProductsReturnForm from './ProductsReturnForm';
import { useState } from 'react';

function ProductsReturn() {
    const [picId, setPicId] = useState(0);
    const { product } = useLoaderData() as Awaited<ReturnType<typeof productItemsReturnLoader>>;
    const navigation = useNavigation();

    return (
        <Grid
            container
            sx={{
                paddingY: '1rem',
                // filter: navigation.state === 'loading' ? 'blur(8px)' : 'none', // blur all content during loading
            }}
        >
            <Grid item xs={12} md={6} height={800}>
                <Box>
                    <img
                        src={`${window.location.protocol}//${window.location.hostname}:8000/media/${product?.pictures[picId]?.picture_address}`}
                        alt="product"
                        height={600}
                        width="90%"
                        style={{ objectFit: 'contain' }}
                    />
                </Box>
                <ImageList cols={6} rowHeight={164}>
                    {product?.pictures.map((picture, index) => (
                        <img
                            key={picture.id}
                            src={`${window.location.protocol}//${window.location.hostname}:8000/media/${picture.picture_address}`}
                            alt="product"
                            height={164}
                            onClick={() => setPicId(index)}
                        />
                    ))}
                </ImageList>
            </Grid>
            <Grid container spacing={2} item xs={12} md={6}>
                <Grid item xs={12} md={6}>
                    <ProductsReturnForm />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">{product?.name}</Typography>
                    <Typography variant="subtitle1">Viivakoodi: {product?.product_items[0]?.barcode}</Typography>
                    <Typography variant="body2">
                        Varasto: {product?.product_items[0]?.storage.name} {product?.product_items[0]?.shelf_id}
                    </Typography>
                    <Button
                        component={Link}
                        to={`/varasto/tuotteet/${product.id}/muokkaa`}
                        variant="outlined"
                        color="primary"
                        sx={{ marginY: 2 }}
                    >
                        Muokkaa tuotteen tietoja
                    </Button>
                    {/* <Typography variant="body2">
                            Kategoria:
                            {product.category ? categories[product?.category]?.name : ''}
                        </Typography> */}
                    <Typography variant="body2">Kuvaus: {product?.free_description}</Typography>
                    {/* TODO: show all values / states of items? (possible backend change: needed info could come from products/id/return endpoint?) */}
                    {/* <Typography variant="body2">Hinta: {product?.price} €</Typography> */}
                    {/* <Typography variant="body2">Mitat: {product?.measurements}</Typography> */}
                    {/* <Typography variant="body2">Paino: {product?.weight}</Typography> */}
                    {/* <Typography variant="body2">Värit: {product?.colors}</Typography> */}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductsReturn;
