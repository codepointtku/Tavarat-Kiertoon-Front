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
    props: {
        MuiButtonBase: {
            disableRipple: false,
            variant: 'contained',
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
