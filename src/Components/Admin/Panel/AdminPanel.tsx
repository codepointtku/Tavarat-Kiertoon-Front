import { Box } from '@mui/material';

import NavigationTree from './NavigationTree';
import ComponentContainer from './ComponentContainer';

function AdminPanel() {
    return (
        <Box id="admin-panel-container" sx={{ border: '1px solid blue', display: 'flex', flexDirection: 'row' }}>
            <NavigationTree />
            <ComponentContainer />
        </Box>
    );
}

export default AdminPanel;
