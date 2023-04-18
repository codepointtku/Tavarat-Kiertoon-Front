import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';

/**
 * Interfaces for Bikes
 */
// BikesPage
// export interface bikesPageInterface {
//     bikes: bikeInterface[];
//     date_info: dateInfoInterface;
//     packages: bikePackageInterface[];
// }

// export interface dateInfoInterface {
//     available_from: string;
//     available_to: string;
// }

// bike
export interface bikeInterface {
    brand: string;
    color: string;
    description: string;
    id: number | string;
    max_available: number;
    name: string;
    package_only_count: number;
    package_only_unavailable: { [key: string]: number };
    size: string;
    type: string;
    unavailable: { [key: string]: number };
}
// bikePackage
export interface bikePackageInterface {
    bikes: { amount: number; bike: number }[];
    // bikes: bikeInterface[];
    brand: string | null;
    color: string | null;
    description: string;
    id: number;
    max_available: number;
    name: string;
    size: string;
    type: string;
}
// selectedBikes
export interface selectedBikesInterface {
    [key: string]: number;
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
                <Outlet />
            </Container>
            <Footer />
        </Stack>
    );
}
