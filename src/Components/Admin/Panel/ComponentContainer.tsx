import { Box } from '@mui/material';
import Overview from './Overview/Overview';

function ComponentContainer() {
    return (
        <Box id="admin-panel-component-render-area" sx={{ display: 'flex', flexGrow: '1' }}>
            <Overview />
        </Box>
    );
}

export default ComponentContainer;
