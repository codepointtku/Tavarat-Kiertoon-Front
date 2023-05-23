import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import BikeNavigationBar from '../../Layouts/BikeNavigationBar';

// warehouse page for the bikes view
export default function BikeWarehouse() {
    return (
        <Grid container>
            <BikeNavigationBar />
            <Outlet />
        </Grid>
    );
}
