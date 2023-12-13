import { ThemeProvider } from '@mui/material/styles';
import { useState, useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './Themes/defaultTheme';

import Routes from './Router/Routes';
import AuthContext from './Context/AuthContext';

export const roles = ['user_group', 'storage_group', 'admin_group', 'bicycle_group', 'bicycle_admin_group'] as const;

export type Roles = typeof roles;
export type Role = Roles[number];

function App() {
    const [auth, setAuth] = useState({
        user_group: false,
        storage_group: false,
        admin_group: false,
        username: false,
        bicycle_group: false,
    });

    const authorized = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md

    return (
        <AuthContext.Provider value={authorized}>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline enableColorScheme />
                <Routes />
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

export default App;
