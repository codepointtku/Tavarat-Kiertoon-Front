import { Box } from '@mui/material';
import { Outlet } from 'react-router';

// a wrapper component for the current visible component-render-area.
// defaults to <Overview />. See routes-file

function ComponentContainer() {
    return (
        <Box id="admin-panel-component-render-area" sx={{ display: 'flex', flexGrow: '1', padding: '1rem' }}>
            <Outlet />
        </Box>
    );
}

export default ComponentContainer;
