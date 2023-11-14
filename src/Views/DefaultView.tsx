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

                {/* <Stack direction="row" gap={4}> */}
                <Grid container justifyContent="center" alignItems="flex-start">
                    <Grid item /* sx={{ border: '1px solid blue' }} */ xs={12} sm={3} md={2}>
                        <CategoryTree treeSelectedState={{ categoryTreeSelected, setCategoryTreeSelected }} />
                    </Grid>
                    <Grid item /*sx={{ border: '1px solid red' }} */ xs={12} sm={9} md={10}>
                        <ProductList />
                    </Grid>
                </Grid>
                {/* </Stack> */}
            </Stack>
        </>
    );
}

export default DefaultView;
