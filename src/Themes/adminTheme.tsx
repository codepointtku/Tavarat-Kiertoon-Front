import { createTheme } from '@mui/material/styles';
import defaultTheme from './defaultTheme';

const adminTheme = createTheme({
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        primary: {
            ...defaultTheme.palette.primary,
            // main: '#e50064',
            main: '#051e34',
            light: '#f8c2d9',
            dark: '#f8c2d9',
            contrastText: '#ffffff',
        },
        secondary: {
            ...defaultTheme.palette.secondary,
            main: '#e50064',
        },
        text: {
            primary: '#fff',
            secondary: '#0062ae',
            disabled: '#404040',
        },
    },
});

export default adminTheme;
