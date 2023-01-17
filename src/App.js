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
import UsersView from './Components/UsersView';
import UserDetails from './Components/UserDetails';
import LocationsView from './Components/LocationsView';
import LocationDetails from './Components/LocationDetails';

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
                            path: '/varasto/tilaus',
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
                    children: [
                        {
                            path: '/admin',
                            element: <UsersView />
                        },
                        {
                            path: '/admin/user',
                            element: <UserDetails />
                        },
                        {                      
                            path: '/admin/varastot',
                            element: <LocationsView />
                        },
                        {                        
                            path: '/admin/varastot/varasto',
                            element: <LocationDetails />
                        },
                        
                    ]
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
