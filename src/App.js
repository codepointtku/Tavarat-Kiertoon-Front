import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';

import Base from './MainComponents/Base';
import TavaratKiertoon from './MainComponents/TavaratKiertoon';
import StorageView from './MainComponents/StorageView';

function App() {
    // replace this with userContext
    const tempContext = true;

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
                    loader: () => {
                        if (!tempContext) {
                            throw redirect('/tavaratkiertoon');
                        }
                    },
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
