import { Outlet } from 'react-router';
import { Container, Stack } from '@mui/material';

import StorageBar from '../Components/StorageBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// storage Layout
function StorageLayout() {
    return (
        <Stack sx={{ minHeight: ['100vh', '100svh'] }}>
            <header>
                <Header />
                <StorageBar />
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

export default StorageLayout;
