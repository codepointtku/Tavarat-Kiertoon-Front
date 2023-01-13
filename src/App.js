import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './Styles/index.css';

// default font imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Base from './MainComponents/Base';
import DefaultView from './MainComponents/DefaultView';
import StorageView from './MainComponents/StorageView';
import AdminView from './MainComponents/AdminView';
import OrdersList from './Components/OrdersList';
import OrderView from './Components/OrderView';
import QrScanner from './Components/QrScanner';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Base />,
            children: [
                {
                    path: '/',
                    element: <DefaultView />,
                },
                {
                    path: '/varasto',
                    element: <StorageView />,
                    children: [
                        {
                            path: '/varasto',
                            element: <OrdersList />,
                        },
                        {
                            path: '/varasto/tilaus/:id',
                            element: <OrderView />,
                        },
                        {
                            path: '/varasto/koodinlukija',
                            element: <QrScanner />,
                        },
                    ],
                },
                {
                    path: '/admin',
                    element: <AdminView />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
