import { Box } from '@mui/material';

import NavigationTree from './NavigationTree';
import PanelHeader from './PanelHeader';
import ComponentContainer from './ComponentContainer';

function AdminPanel() {
    return (
        <Box id="admin-panel-container" sx={{ display: 'flex', flexGrow: '1', minHeight: '75vh' }}>
            <NavigationTree />
            <Box id="layout-area-container" sx={{ display: 'flex', flexDirection: 'column' }}>
                <PanelHeader />
                <ComponentContainer />
            </Box>
        </Box>
    );
}

export default AdminPanel;
