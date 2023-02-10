import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#009bd8',
            light: '#bfe6f6',
            contrastText: '#ffffff',
            dark: '#0062ae',
        },
        secondary: {
            main: '#f8c2d9',
            light: '#bfe6f6',
            dark: '#e50064',
        },
        background: {
            default: '#ffffff',
            paper: '#fdfdfd',
        },
        text: {
            primary: '#000000',
            secondary: '#0062ae',
            hint: '#cdcbbd',
            disabled: '#404040',
        },
        error: {
            main: '#e4032e',
            light: '#fac6ce',
        },
        warning: {
            main: '#ffd239',
            light: '#fff0cd',
        },
        info: {
            main: '#3ca29a',
            light: '#cfe9e7',
        },
        success: {
            main: '#81C784',
            light: '#81C784',
            dark: '#388E3C',
        },
    },
    typography: {
        fontSize: 16,
        fontSizeSmall: 12,
        // fontWeight: "choice", (default=fontWeightRegular)
        fontWeightThin: 100,
        fontWeightLight: 200,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 600,
        fontWeightHeavy: 800,
        button: { textTransform: 'initial' },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: false,
        },
        MuiList: {
            dense: true,
        },
        MuiMenuItem: {
            dense: true,
        },
        MuiTable: {
            size: 'small',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
        },
    },
});

export default defaultTheme;
