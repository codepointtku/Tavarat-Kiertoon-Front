import { Box, Stack } from '@mui/material';

import Header from './Components/Header';
import AdminAppBar from '../Components/Admin/Panel/PanelHeader';
import AdminPanel from '../Components/Admin/Panel/AdminPanel';
import Footer from './Components/Footer';

// admin Layout

function AdminLayout() {
    return (
        <Stack id="admin-view-layout-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Stack direction="row" justifyContent="space-between">
                <Header />
                <AdminAppBar />
            </Stack>
            <Box id="admin-layout-admin-panel-container">
                <main>
                    <AdminPanel />
                </main>
            </Box>
            <footer>
                <Footer />
            </footer>
        </Stack>
    );
}

export default AdminLayout;
