import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router';

import Footer from './Components/Footer';
import Header from './Components/Header';

export default function BikesLayout() {
    return (
        <Stack sx={{ minHeight: ['100vh', '100svh'] }}>
            <header>
                <Header />
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
