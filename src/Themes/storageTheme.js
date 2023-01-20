import { createTheme } from '@mui/material/styles';
import defaultTheme from './defaultTheme';

const storageTheme = createTheme({
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        primary: {
            main: '#00855f',
            light: '#bfe9de',
            contrastText: '#ffffff',
        },
    },
});

export default storageTheme;
