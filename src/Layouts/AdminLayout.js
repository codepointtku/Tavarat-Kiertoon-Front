import { Outlet } from 'react-router';
import AdminBar from '../Components/AdminBar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Container, Stack } from '@mui/material';

// admin Layout

function AdminLayout() {
    return (
        <Stack sx={{ minHeight: ['100vh', '100svh'] }}>
            <header>
                <Header />
                <AdminBar />
            </header>
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
