import { Box, Stack } from '@mui/material';

import PanelHeader from '../Components/Admin/Panel/PanelHeader';
import AdminPanel from '../Components/Admin/Panel/AdminPanel';
import Footer from './Components/Footer';

// admin Layout

function AdminLayout() {
    return (
        <Stack id="admin-view-layout-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <PanelHeader />
            <Box id="admin-layout-admin-panel-container" sx={{ display: 'flex', flex: '1' }}>
                <AdminPanel />
            </Box>
            <footer style={{ marginTop: 'auto' }}>
                <Footer />
            </footer>
        </Stack>
    );
}

export default AdminLayout;
