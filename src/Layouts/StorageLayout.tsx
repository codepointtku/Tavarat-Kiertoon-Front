import { Outlet } from 'react-router';
import { Container, Stack } from '@mui/material';

import StorageBar from '../Components/Storage/StorageBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// storage Layout

function StorageLayout() {
    return (
        <Stack id="storage-view-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <StorageBar />
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

export default StorageLayout;
