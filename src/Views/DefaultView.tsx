import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Stack } from '@mui/material';

import SearchField from '../Components/Default/SearchField';
import CategoryTree from '../Components/Default/CategoryTree';
import ProductList from '../Components/Default/ProductList';
import AlertBox from '../Components/AlertBox';

// default front page view

function DefaultView() {
    const [categoryTreeSelected, setCategoryTreeSelected] = useState(false);
    const { state: responseStatus } = useLocation();

    return (
        <>
            {responseStatus?.type === 'orderCreated' && responseStatus?.status === true && (
                <AlertBox text="Kiitos tilauksestasi!" status="success" timer={10000} />
            )}

            <Stack id="front-page-main-block" alignItems="center" gap={2}>
                <SearchField treeSelectedState={{ categoryTreeSelected, setCategoryTreeSelected }} />

                <Stack direction="row" gap={4}>
                    <CategoryTree treeSelectedState={{ categoryTreeSelected, setCategoryTreeSelected }} />

                    <ProductList />
                </Stack>
            </Stack>
        </>
    );
}

export default DefaultView;
