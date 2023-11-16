import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';

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
                <Grid container justifyContent="flex-start" alignItems="flex-start">
                    <Grid item xs={12} sm={'auto'}>
                        <CategoryTree treeSelectedState={{ categoryTreeSelected, setCategoryTreeSelected }} />
                    </Grid>
                    <Grid item xs={12} sm={true}>
                        <ProductList />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
}

export default DefaultView;
