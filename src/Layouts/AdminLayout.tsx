import { Box, Stack } from '@mui/material';

import Header from './Components/Header';
import AdminPanel from '../Components/Admin/Panel/AdminPanel';
import Footer from './Components/Footer';

// admin Layout

function AdminLayout() {
    return (
        <Stack id="admin-view-layout-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <Box id="admin-layout-admin-panel-container" sx={{ display: 'flex', flex: 1 }}>
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
