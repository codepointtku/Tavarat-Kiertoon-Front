import { Container, Stack, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Outlet } from 'react-router';

import defaultTheme from '../Themes/defaultTheme';
import Footer from './Components/Footer';
import Header from './Components/Header';

const bikeTheme = createTheme({
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        primary: {
            ...defaultTheme.palette.primary,
            main: '#0062ae',
            light: '#ffff8d', // Used as the highlight color
            dark: '#c7d7eb',
        },
        text: {
            ...defaultTheme.palette.text,
            secondary: '#808080', // Used as a disabled color (f.e. BikeAvailability and BikeCalendar)
            disabled: '#cdcbbd',
        },
    },
});

export default function BikesLayout() {
    return (
        <ThemeProvider theme={bikeTheme}>
            <Stack sx={{ minHeight: ['100vh', '100svh'] }}>
                <Header />
                <Container maxWidth="xl" sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <main>
                        <Outlet />
                    </main>
                </Container>
                <Footer />
            </Stack>
        </ThemeProvider>
    );
}
