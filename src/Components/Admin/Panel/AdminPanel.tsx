import { Box } from '@mui/material';

import NavigationTree from './NavigationTree';
import ComponentContainer from './ComponentContainer';

function AdminPanel() {
    return (
        <Box id="panel-container-child" sx={{ display: 'flex', flex: 1 }}>
            <NavigationTree />
            <Box id="component-render-area-container" sx={{ display: 'flex', flex: 1 }}>
                <ComponentContainer />
            </Box>
        </Box>
    );
}

export default AdminPanel;
