import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// default font imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Base from './MainComponents/Base';
import TavaratKiertoon from './MainComponents/TavaratKiertoon';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Base />,
            children: [
                {
                    path: '/tavaratkiertoon',
                    element: <TavaratKiertoon />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
