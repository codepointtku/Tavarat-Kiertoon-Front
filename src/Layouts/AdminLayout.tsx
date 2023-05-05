import { Outlet } from 'react-router';
import { Box, Stack } from '@mui/material';

// import AdminBar from '../Components/Admin/AdminBar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminPanel from '../Components/Admin/Panel/AdminPanel';

// admin Layout

function AdminLayout() {
    return (
        <Stack id="admin-view-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <Box id="admin-layout-content-container" sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
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
