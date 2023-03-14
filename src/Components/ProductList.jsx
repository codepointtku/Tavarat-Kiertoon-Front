import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';

import ProductCard from './ProductCard';

function ProductList() {
    const products = useLoaderData();

    return (
        <Grid container spacing={2}>
            {products?.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <ProductCard
                        id={product.id}
                        productName={product.name}
                        date={product.date}
                        picture={product.pictures[0]}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
