import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import DefaultView from './DefaultView';
import StorageView from './StorageView';
import AdminView from './AdminView';

import storageTheme from '../Themes/storageTheme';
import adminTheme from '../Themes/adminTheme';
import Base from '../Layouts/Base';
import Admin from '../Layouts/Admin';

import OrdersList from '../Components/OrdersList';
import OrderView from '../Components/OrderView';
import QrScanner from '../Components/QrScanner';

import UsersView from '../Components/UsersView';
import UserDetails from '../Components/UserDetails';
import LocationsView from '../Components/LocationsView';
import LocationDetails from '../Components/LocationDetails';

import ProductList from '../Components/ProductList';
import ProductDetails from '../Components/ProductDetails';

function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Base>
                    <DefaultView />
                </Base>
            ),
            children: [
                {
                    path: '/',
                    element: <ProductList />,
                },
                {
                    path: '/tuotteet/:id',
                    element: <ProductDetails />,
                },
            ],
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
            children: [
                {
                    path: '/admin',
                    element: <UsersView />,
                },
                {
                    path: '/admin/user',
                    element: <UserDetails />,
                },
                {
                    path: '/admin/varastot',
                    element: <LocationsView />,
                },
                {
                    path: '/admin/varastot/varasto',
                    element: <LocationDetails />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
