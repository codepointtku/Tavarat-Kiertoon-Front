import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

import DefaultAppBar from '../Components/Default/AppBar/DefaultAppBar';
import NavigationBar from './Components/NavigationBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// default Layout

function BaseLayout() {
    return (
        <Stack id="default-view-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <DefaultAppBar />
            <NavigationBar />
            <main>
                <Box
                    id="main-layout-column-box"
                    sx={{ display: 'flex', flex: 1, flexDirection: 'column', margin: '0 2rem 0 2rem' }}
                >
                    <Outlet />
                </Box>
            </main>
            <footer>
                <Footer />
            </footer>
        </Stack>
    );
}

export default BaseLayout;
