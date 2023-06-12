import { Box, Stack } from '@mui/material';

import NavigationTree from './NavigationTree';
import PanelHeader from './PanelHeader';
import ComponentContainer from './ComponentContainer';

function AdminPanel() {
    return (
        <Box id="admin-panel-container" sx={{ display: 'flex', flex: '1', minHeight: '75vh' }}>
            {/* <Stack direction="row"> */}
            <NavigationTree />
            {/* <PanelHeader /> */}
            <Box id="layout-area-container" sx={{ display: 'flex', flex: 1 }}>
                <ComponentContainer />
            </Box>
            {/* </Stack> */}
        </Box>
    );
}

export default AdminPanel;
