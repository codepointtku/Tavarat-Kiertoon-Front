import { useLoaderData, useSearchParams } from 'react-router-dom';

import { Box, Divider, Grid, Typography } from '@mui/material';
import TypographyHeading from './TypographyHeading';
import ProductCard from './ProductCard';

function SearchResultMessage() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.getAll('haku', 'kategoria');

    if (searchParams.has('haku')) {
        return (
            <Box id="no-search-input-results">
                <TypographyHeading text="Hupsista! :-(" />
                <Box sx={{ margin: '1rem' }}>
                    <Typography component="span">Hakusi “</Typography>
                    <Typography component="span" fontWeight="fontWeightBold">
                        {searchQuery}
                    </Typography>
                    <Typography component="span">” ei tuottanut tuloksia.</Typography>
                </Box>
                <Divider sx={{ margin: '0 0 2rem 0' }} />
                <Typography variant="body2">
                    Voit tarkistaa oikeinkirjoituksen, kokeilla muita hakusanoja, tai napauttaa tuotekategorioita
                    etsiäksesi tuotteita.
                </Typography>
            </Box>
        );
    }
    if (searchParams.has('kategoria')) {
        return (
            <Box id="empty-category">
                <TypographyHeading text="Tule myöhemmin uudelleen!" />
                <Box sx={{ margin: '1rem' }}>
                    <Typography component="span">Tämä kategoria näyttää olevan toistaiseksi tyhjä.</Typography>
                </Box>
            </Box>
        );
    }
}

function NoSearchResults() {
    return (
        <Box
            id="no-results-container"
            sx={{ padding: '4rem 4rem 10rem 4rem', border: '0.1rem solid #bfe6f6', borderRadius: '1rem' }}
        >
            <SearchResultMessage />
        </Box>
    );
}

function ProductList() {
    const products = useLoaderData();

    return products.length ? (
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
    ) : (
        <NoSearchResults />
    );
}

export default ProductList;
