import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import DefaultView from './DefaultView';
import StorageView from './StorageView';
import AdminView from './AdminView';

import storageTheme from '../Themes/storageTheme';
import adminTheme from '../Themes/adminTheme';
import Base from '../Layouts/Base';
import Storage from '../Layouts/Storage';
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

// import productData from '../TestData/tuote.json';
import orderData from '../TestData/tilaus.json';
import orderList from '../TestData/tilaukset.json'

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
                    <Storage>
                        <StorageView />
                    </Storage>
                </ThemeProvider>
            ),
            children: [
                {
                    path: '/varasto/:num/:view',
                    element: <OrdersList />,
                    loader: async ({params}) => {
                        // num will the back-end which entries to bring
                        const dataList = [...orderList]
                        // view is order status, unless archived can bring all?
                        // or will be replaced into the back-end later?
                        const statuses = {
                            waiting: 3,
                            delivery: 2,
                            foinished: 1,
                        }
                        statuses[params.view] = 10
                        
                        dataList.sort((a, b) => {
                            if (statuses[a.status] > statuses[b.status]) {
                                return a
                            }
                            if (a.status === b.status) {
                                if (a.id > b.id) {
                                    return a
                                } 
                            } return b
                            })
                        
                            if (dataList) {
                            return dataList;
                        }
                        return null;
                    },
                },
                {
                    path: '/varasto/tilaus/:id',
                    element: <OrderView />,
                    loader: async ({ params }) => {
                        const data = orderData[params.id];
                        if (data) {
                            return data;
                        }
                        return null;
                    },
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
                    path: '/admin/user/:id',
                    element: <UserDetails />,
                },
                {
                    path: '/admin/varastot',
                    element: <LocationsView />,
                },
                {
                    path: '/admin/varastot/varasto/:id',
                    element: <LocationDetails />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
