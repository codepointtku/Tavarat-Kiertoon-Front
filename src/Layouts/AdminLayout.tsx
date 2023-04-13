import { Outlet } from 'react-router';
import { Container, Stack } from '@mui/material';

import AdminBar from '../Components/AdminBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// admin Layout

function AdminLayout() {
    return (
        <Stack id="admin-view-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <AdminBar />
            <Container maxWidth="xl" sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <main>
                    <Outlet />
                </main>
            </Container>
            <footer>
                <Footer />
            </footer>
        </Stack>
    );
}

export default AdminLayout;
