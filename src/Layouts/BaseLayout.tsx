import { Outlet, useRouteLoaderData } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

import DefaultAppBar from '../Components/Default/AppBar/DefaultAppBar';
import NavigationBar from './Components/NavigationBar';
import BulletinModal from '../Components/BulletinModal';
import Header from './Components/Header';
import Footer from './Components/Footer';

import type { rootLoader } from '../Router/loaders';

// default Layout

function BaseLayout() {
    const { bulletins } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;

    const latestBulletin = bulletins[0];
    const latestBulletinDate = new Date(latestBulletin?.date ?? 0).getTime();
    const lastVisit = parseInt(localStorage.getItem('lastvisit') || '0');

    return (
        <Stack id="default-view-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <DefaultAppBar />
            <NavigationBar />
            {lastVisit < latestBulletinDate && (
                <BulletinModal
                    title={latestBulletin.title}
                    content={latestBulletin.content}
                    date={latestBulletinDate}
                />
            )}
            <main>
                <Box
                    id="main-layout-column-box"
                    sx={{ display: 'flex', flex: 1, flexDirection: 'column', margin: '0 2rem 1rem 2rem' }}
                >
                    <Outlet />
                </Box>
            </main>
            <footer style={{ marginTop: 'auto' }}>
                <Footer />
            </footer>
        </Stack>
    );
}

export default BaseLayout;
