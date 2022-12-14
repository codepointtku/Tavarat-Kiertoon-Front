import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Base from '/MainComponents/Base';
import TavaratKiertoon from '/MainComponents/TavaratKiertoon';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Base />,
            children: [
                {
                    path: '/',
                    element: <TavaratKiertoon />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
