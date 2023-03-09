import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';

import CategoryTree from './CategoryTree';
import ProductCard from './ProductCard';

function ProductList() {
    const { products } = useLoaderData();

    console.log('products:', products);

    return (
        <Grid container mt={1} mb={1}>
            <Grid item xs={5} md={4} lg={3} xl={2}>
                <CategoryTree />
            </Grid>
            <Grid item xs={7} md={8} lg={9} xl={10}>
                <Grid container spacing={2}>
                    {products?.results?.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={5} lg={4}>
                            <ProductCard
                                id={product.id}
                                productName={product.name}
                                dateAdded={product.dateAdded}
                                picture={product.pictures[0]}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductList;
