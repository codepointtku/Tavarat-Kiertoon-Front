import { Container, Stack, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router';

import { createTheme } from '@mui/material/styles';
import Footer from './Components/Footer';
import Header from './Components/Header';

import defaultTheme from '../Themes/defaultTheme';

const bikeTheme = createTheme({
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        primary: {
            ...defaultTheme.palette.primary,
            main: '#005b72',
            light: '#ffff8d', // Used as the highlight color
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
