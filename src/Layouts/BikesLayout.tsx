import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';

/**
 * Interfaces common for Bikes
 */
export interface bikeInterface {
    brand: string;
    color: string;
    description: string;
    id: number;
    max_available: number;
    name: string;
    package_only_count: number;
    package_only_unavailable: { [key: string]: number };
    size: string;
    type: string;
    unavailable: { [key: string]: number };
}

/**
 * Main layout for Bikes
 *
 * @returns JSX.Element
 */
export default function BikesLayout() {
    return (
        <Stack id="bike-view-stack" sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <Container maxWidth="xl" sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <main>
                    <Outlet />
                </main>
            </Container>
            <Footer />
        </Stack>
    );
}
