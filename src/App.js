import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Base from './MainComponents/Base';
import TavaratKiertoon from './MainComponents/TavaratKiertoon';
import StorageView from './MainComponents/StorageView';

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
                {
                    path: '/varasto',
                    element: <StorageView />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
