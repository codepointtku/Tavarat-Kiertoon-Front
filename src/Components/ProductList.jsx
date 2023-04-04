import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';

import ProductCard from './ProductCard';

function ProductList() {
    const products = useLoaderData();

    return (
        <Grid container spacing={2}>
            {products?.map((product) => (
                <Grid item key={product.id} xs={13} sm={7} md={5} lg={4} xl={3}>
                    <ProductCard
                        id={product.id}
                        groupId={product.group_id}
                        productName={product.name}
                        date={product.date}
                        count={product.amount}
                        picture={product.pictures[0]}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
