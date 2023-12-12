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
export interface BikeInterface {
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
    picture: string;

}
// bikePackage
export interface BikePackageInterface {
    bikes: { amount: number; bike: number;}[];
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
export interface SelectedBikesInterface {
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
            <footer style={{ marginTop: 'auto' }}>
                <Footer />
            </footer>
        </Stack>
    );
}

/*
structure for a single bike that back-end returns
getting all returns all information EXCEPT storage.
getting single bike with ID returns all information
{
    ​​bike: { 
        ​​brand: { 
            id: 2, 
            name: "Woom" 
        }
        color: { 
            id: 2, 
            name: "Sininen" 
        }
        description: "Hyväkuntonen hieno pyörä suoraa 80-luvulta"
        id: 1
        name: "Todella hieno pyörä"
        size: { 
            id: 1, 
            name: "14″" 
        }
        type: { 
            id: 4, 
            name: "Sähkö" 
        }
    }

    created_at: "2023-04-20T14:00:25.966402+03:00"
    frame_number: "3e76a906-b908-4c64-a064-da65f0d0f555"
    id: 1
    number: "5915a50d-5e2d-4058-af41-9481f66ab921"
    package_only: false
    state: "AVAILABLE"

    storage: { 
        address: "Blabla 2b, 20230 Turku"
        id: 1
        in_use: true
        name: "Varasto X"
    }
}
*/
