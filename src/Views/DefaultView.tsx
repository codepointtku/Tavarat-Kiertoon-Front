import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

import SearchField from '../Components/Default/SearchField';
import CategoryTree from '../Components/Default/CategoryTree';
import ProductList from '../Components/Default/ProductList';
import AlertBox from '../Components/AlertBox';

// default front page view

function DefaultView() {
    const [categoryTreeSelected, setCategoryTreeSelected] = useState(false);
    console.log(categoryTreeSelected);
    const { state: responseStatus } = useLocation();
    return (
        <Box id="front-page-main-block">
            {responseStatus?.type === 'orderCreated' && responseStatus?.status === true && (
                <AlertBox text="Tilaus onnistui!" status="success" timer={3000} />
            )}
            <SearchField treeSelectedState={{ categoryTreeSelected, setCategoryTreeSelected }} />
            <Grid id="front-page-grid" container mt={2} mb={2}>
                <Grid id="category-tree" item xs={12} sm={4} md={3} lg={2} xl={2}>
                    <CategoryTree treeSelectedState={{ categoryTreeSelected, setCategoryTreeSelected }} />
                </Grid>
                <Grid id="product-list" item xs={12} sm={8} md={9} lg={10} xl={10}>
                    <ProductList />
                </Grid>
            </Grid>
        </Box>
    );
}

export default DefaultView;
