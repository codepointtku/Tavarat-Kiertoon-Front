import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import DefaultView from './DefaultView';
import StorageView from './StorageView';
import AdminView from './AdminView';

import OrdersList from '../Components/OrdersList';
import OrderView from '../Components/OrderView';
import QrScanner from '../Components/QrScanner';

import storageTheme from '../Themes/storageTheme';
import adminTheme from '../Themes/adminTheme';
import Base from '../Layouts/Base';
import Admin from '../Layouts/Admin';

// maybe rename this filename to "Routes.js" or "Router.js"

function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Base>
                    <DefaultView />
                </Base>
            ),
        },
        {
            path: '/varasto',
            element: (
                <ThemeProvider theme={storageTheme}>
                    <Base>
                        <StorageView />
                    </Base>
                </ThemeProvider>
            ),
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
            element: (
                <ThemeProvider theme={adminTheme}>
                    <Admin>
                        <AdminView />
                    </Admin>
                </ThemeProvider>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
