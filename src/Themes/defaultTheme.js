import { createTheme } from '@mui/material/styles';

import palette from './palette';

const defaultTheme = createTheme({
    palette,
    typography: {
        fontSize: 16,
        fontWeightLight: 200,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 800,
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
