import { useLoaderData, useSearchParams } from 'react-router-dom';

import { Box, Divider, Grid, Typography } from '@mui/material';
import type { productListLoader } from '../../Router/loaders';
import TypographyHeading from '../TypographyHeading';
import ProductCard from './ProductCard';
import Pagination from '../Pagination';

function SearchResultMessage() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('haku');

    if (searchParams.has('kategoria') || (searchParams.has('kategoria') && searchQuery === '')) {
        return (
            <Box id="empty-category">
                <TypographyHeading text="Tule myöhemmin uudelleen!" />
                <Box sx={{ margin: '1rem' }}>
                    <Typography component="span">Tämä kategoria näyttää olevan toistaiseksi tyhjä.</Typography>
                </Box>
            </Box>
        );
    }

    if (searchParams.has('haku')) {
        return (
            <Box id="no-search-input-results">
                <TypographyHeading text="Hupsista! :-/" />
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

    return null;
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
    const { results, count } = useLoaderData() as Awaited<ReturnType<typeof productListLoader>>;

    return (
        <>
            {results?.length ? (
                <Grid container spacing={2}>
                    {results.map((product: any) => (
                        <Grid item key={product.id} xs={13} sm={7} md={5} lg={4} xl={3}>
                            <ProductCard
                                id={product.id}
                                groupId={product.id}
                                productName={product.name}
                                pictures={product.pictures}
                                freeDescription={product.free_description}
                                categoryName={product.category_name}
                                storageName={product.storage_name}
                                colorName={product.color_name}
                                measurements={product.measurements}
                                weight={product.weight}
                                count={product.amount}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <NoSearchResults />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination count={count} itemsText="Tuotteita" />
            </Box>
        </>
    );
}

export default ProductList;
