import { Grid } from '@mui/material';
import CategoryTree from '../Components/CategoryTree';
import ProductList from '../Components/ProductList';

// default front page view

function DefaultView() {
    return (
        <Grid container mt={2} mb={2}>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
                <CategoryTree />
            </Grid>
            <Grid item xs={12} sm={6} md={9} lg={9} xl={10}>
                <ProductList />
            </Grid>
        </Grid>
    );
}

export default DefaultView;
