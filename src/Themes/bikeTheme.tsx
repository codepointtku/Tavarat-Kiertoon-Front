import { createTheme } from '@mui/material/styles';
import defaultTheme from './defaultTheme';

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

export default bikeTheme;
