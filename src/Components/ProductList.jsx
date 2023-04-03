import { useLoaderData, useSearchParams } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';

function NoSearchResults() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('haku');

    return (
        <Box sx={{ border: '0.1rem solid #bfe6f6', borderRadius: '1rem' }} padding={10}>
            <Typography component="span">Hakusi "</Typography>
            <Typography component="span" fontWeight="fontWeightBold">
                {searchQuery}
            </Typography>
            <Typography component="span">" ei tuottanut tuloksia.</Typography>;
        </Box>
    );
}

function ProductList() {
    const products = useLoaderData();

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {products.length === 0 ? (
                <NoSearchResults />
            ) : (
                <Grid container spacing={2}>
                    {products?.map((product) => (
                        <Grid item key={product.id} xs={13} sm={7} md={5} lg={4} xl={3}>
                            <ProductCard
                                id={product.id}
                                groupId={product.group_id}
                                productName={product.name}
                                date={product.date}
                                picture={product.pictures[0]}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}

export default ProductList;
