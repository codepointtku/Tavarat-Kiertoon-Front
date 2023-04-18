import { useActionData } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

import SearchField from '../Components/Default/SearchField';
import CategoryTree from '../Components/Default/CategoryTree';
import ProductList from '../Components/Default/ProductList';
import AlertBox from '../Components/AlertBox';

// default front page view

interface Jee {
    type: string;
}

function DefaultView() {
    const responseStatus = useActionData() as Jee;
    return (
        <Box id="front-page-main-block">
            {responseStatus?.type === 'orderCreated' && (
                <AlertBox text="Tilaus onnistui!" status="success" timer={3000} />
            )}
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
