import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';

import CategoryTree from './CategoryTree';
import ProductCard from './ProductCard';

function ProductList() {
    const data = useLoaderData();
    return (
        <Grid container spacing={4}>
            <Grid item xs={2} md={3} lg={2} xl={2}>
                <CategoryTree />
            </Grid>
            <Grid item xs={10} md={9} lg={10} xl={10}>
                <Grid container spacing={2} marginTop={1}>
                    {data?.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard id={product.id} productName={product.name} dateAdded={product.dateAdded} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductList;
