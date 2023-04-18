import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

import DefaultAppBar from '../Components/Default/AppBar/Default/DefaultAppBar';
import NavigationBar from './Components/NavigationBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// default Layout

function BaseLayout() {
    return (
        <Stack id="main-view-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <DefaultAppBar />
            <NavigationBar />
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', margin: '0 2rem 0 2rem' }}>
                <main>
                    <Outlet />
                </main>
            </Box>
            <footer>
                <Footer />
            </footer>
        </Stack>
    );
}

export default BaseLayout;
