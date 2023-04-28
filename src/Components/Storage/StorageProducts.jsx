import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom';

import { Grid, IconButton, styled } from '@mui/material';
import StorageProductsTable from './StorageProductsTable';
import AddCircle from '@mui/icons-material/AddCircle';
// import QrCodeScanner from '@mui/icons-material/QrCodeScanner';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
// import SearchIcon from '@mui/icons-material/Search';

const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    borderRadius: 20,
    margin: 4,
    justifyContent: 'center',
    padding: 4,
}));

function StorageProducts() {
    const { categories } = useRouteLoaderData('root');
    const { storages, products } = useLoaderData();

    console.log('categories:', categories);
    console.log('storages:', storages);
    console.log('products:', products);
    console.log('products.results:', products.results);

    return (
        <>
            <Grid container spacing={4} sx={{ margin: 2 }} justifyContent={'space-evenly'}>
                <StyledGrid
                    item
                    component={Link}
                    to="/varasto/tuotteet/luo"
                    xs={3}
                    sx={{
                        textDecoration: 'none',
                    }}
                >
                    <IconButton fontSize="large" color="primary" variant="contained" aria-label="barcode search">
                        <AddCircle sx={{ color: 'primary' }} fontSize="large" />
                        Lisää uusi tuote
                    </IconButton>
                </StyledGrid>
                <StyledGrid item xs={3}>
                    <IconButton fontSize="large" color="primary" variant="contained" aria-label="barcode search">
                        {/* todo: custom viivakoodi-ikoni? */}
                        <HorizontalSplitIcon
                            sx={{
                                color: 'primary',
                                transform: 'rotate(90deg)',
                            }}
                            fontSize="large"
                        />
                        <HorizontalSplitIcon
                            sx={{ color: 'primary', transform: 'rotate(90deg)', marginLeft: -1.6 }}
                            fontSize="large"
                        />
                        Skannaa ja hae
                    </IconButton>
                </StyledGrid>
                {/* <StyledGrid item xs={3} sx={{ borderColor: 'primary', border: 1 }}>
                    <IconButton fontSize="large" color="primary" variant="contained" aria-label="search">
                        <SearchIcon sx={{ color: 'primary' }} fontSize="large" />
                        Hae tuotteita
                    </IconButton>
                </StyledGrid> */}
            </Grid>

            <StorageProductsTable
            // page={usedParams.page} rowsPerPage={usedParams.rows} setUsedParams={setUsedParams}
            />
        </>
    );
}

export default StorageProducts;
