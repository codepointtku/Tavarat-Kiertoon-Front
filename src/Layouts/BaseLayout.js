import { Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import DefaultAppBar from '../Components/AppBar/Default/DefaultAppBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// default Layout
function BaseLayout() {
    return (
        <Stack sx={{ minHeight: ['100vh', '100svh'] }}>
            <header>
                <Header />
                <DefaultAppBar />
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

export default BaseLayout;
