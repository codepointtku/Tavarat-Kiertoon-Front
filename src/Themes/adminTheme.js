import { createTheme } from '@mui/material/styles';
import defaultTheme from './defaultTheme';

const adminTheme = createTheme({
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        primary: {
            ...defaultTheme.palette.primary,
            main: '#e50064',
            // light: '#c7d7eb',
            // contrastText: '#ffffff',
        },
    },
});

export default adminTheme;
