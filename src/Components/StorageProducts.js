import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

import StorageProductsTable from './StorageProductsTable';
import useCustomSearchParams from '../Hooks/useCustomSearchParams';

function StorageProducts() {
    const { categories } = useRouteLoaderData('root');
    const { storages, products } = useLoaderData();
    // const [usedParams, setUsedParams] = useCustomSearchParams({ page: 0, rows: 5 });

    if (!categories) {
        return <>categories lataus ei toimi.</>;
    }
    if (!storages) {
        return <>storages lataus ei toimi.</>;
    }
    if (!products) {
        return <>products lataus ei toimi.</>;
    }
    console.log('categories:', categories);
    console.log('storages:', storages);
    console.log('products:', products);
    console.log('products.results:', products.results);

    return (
        <div>
            {/* todo: add new item link  */}

            <StorageProductsTable
            // page={usedParams.page} rowsPerPage={usedParams.rows} setUsedParams={setUsedParams}
            />
        </div>
    );
}

export default StorageProducts;
