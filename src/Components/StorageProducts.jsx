import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom';

import { IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StorageProductsTable from './StorageProductsTable';
import useCustomSearchParams from '../Hooks/useCustomSearchParams';

function StorageProducts() {
    const { categories } = useRouteLoaderData('root');
    const { storages, products } = useLoaderData();

    console.log('categories:', categories);
    console.log('storages:', storages);
    console.log('products:', products);
    console.log('products.results:', products.results);

    return (
        <div>
            <IconButton
                component={Link}
                to="/varasto/tuotteet/luo"
                variant="contained"
                color="primary"
                fontSize="large"
                aria-label="lisää uusi tuote"
            >
                <SearchIcon sx={{ color: 'white' }} />
                Lisää uusi tuote
            </IconButton>
            <Typography variant="h6" component="h1" color="primary">
                Hae olemassaolevia tuotteita lisätäksesi saldoa tai muokataksesi tuotetta
            </Typography>
            <StorageProductsTable
            // page={usedParams.page} rowsPerPage={usedParams.rows} setUsedParams={setUsedParams}
            />
        </div>
    );
}

export default StorageProducts;
