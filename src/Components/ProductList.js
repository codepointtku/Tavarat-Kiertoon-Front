import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';

import ProductCard from './ProductCard';

function ProductList() {
    const data = useLoaderData();
    return (
        <Grid container spacing={2}>
            {data?.map((product) => (
                <Grid item key={product.id} xs={12} sm={10} md={4} lg={3} xl={2}>
                    <ProductCard
                        id={product.id}
                        productName={product.name}
                        dateAdded={product.dateAdded}
                        picture={product.pictures[0]}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
