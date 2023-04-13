import { Box, Grid } from '@mui/material';

import SearchField from '../Components/SearchField';
import CategoryTree from '../Components/CategoryTree';
import ProductList from '../Components/ProductList';

// default front page view

function DefaultView() {
    return (
        <Box id="front-page-main-block">
            <SearchField />
            <Grid id="front-page-grid" container mt={2} mb={2}>
                <Grid id="category-tree" item xs={12} sm={4} md={3} lg={2} xl={2}>
                    <CategoryTree />
                </Grid>
                <Grid id="product-list" item xs={12} sm={8} md={9} lg={10} xl={10}>
                    <ProductList />
                </Grid>
            </Grid>
        </Box>
    );
}

export default DefaultView;
