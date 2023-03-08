import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';

import ProductCard from './ProductCard';

function ProductList() {
    const products = useLoaderData();

    return (
        <Grid item xs={7} md={8} lg={9} xl={10}>
            <Grid container spacing={2}>
                {products?.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={5} lg={4}>
                        <ProductCard
                            id={product.id}
                            productName={product.name}
                            date={product.date}
                            picture={product.pictures[0]}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default ProductList;
