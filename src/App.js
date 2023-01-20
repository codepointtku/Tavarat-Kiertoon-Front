import { ThemeProvider } from '@mui/material/styles';
import { useState, useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './Themes/defaultTheme';
// import './Themes/index.css';

import Routes from './Routes/Routes';
import AuthContext from './Context/AuthContext';

function App() {
    const [auth, setAuth] = useState({ user: true, storage: true, admin: true });
    const authorized = useMemo(() => ({ auth, setAuth }), [auth]); // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md

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
