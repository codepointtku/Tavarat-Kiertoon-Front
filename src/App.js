import { ThemeProvider } from '@mui/material/styles';

import defaultTheme from './Themes/defaultTheme';
import './Themes/index.css';

import Routes from './Routes/Routes';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Routes />
        </ThemeProvider>
    );
}

export default App;
