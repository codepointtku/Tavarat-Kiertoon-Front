import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList() {
    const data = useLoaderData();
    const shoppingCart = [];

    return (
        <Grid container spacing={2}>
            {data?.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard id={product.id} productName={product.name} dateAdded={product.dateAdded} shoppingCart={shoppingCart}/>
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
