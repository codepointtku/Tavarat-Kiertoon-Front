import { Box } from '@mui/material';
import Overview from './Overview/Overview';

function ComponentContainer() {
    return (
        <Box id="admin-panel-component-render-area" sx={{ border: '1px solid red', display: 'flex', flexGrow: '1' }}>
            <Overview />
        </Box>
    );
}

export default ComponentContainer;
