import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import axios from 'axios';
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

import UsersList from '../Components/UsersList';
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
                    loader: async () => {
                        const { data } = await axios.get('http://localhost:3001/products');
                        return data;
                    },
                },
                {
                    path: '/tuotteet/:id',
                    element: <ProductDetails />,
                    loader: async ({ params }) => {
                        const { data } = await axios.get(`http://localhost:3001/products/${params.id}`);
                        if (data) {
                            return data;
                        }
                        return null;
                    },
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
                    loader: async ({ params }) => {
                        const { data } = await axios.get('http://localhost:3001/orders');
                        // num will tell back-end which entries to bring
                        // view is order status, unless archived can bring all?
                        // or will be replaced into the back-end later?
                        const statuses = {
                            waiting: 2,
                            delivery: 1,
                            finished: 0,
                        };
                        statuses[params.view] = 10;
                        data.sort((a, b) => {
                            if (statuses[a.status] > statuses[b.status]) {
                                return -1;
                            }
                            if (a.status === b.status) {
                                if (a.id > b.id) {
                                    return -1;
                                }
                            }
                            return 1;
                        });

                        if (data) {
                            return data;
                        }
                        return null;
                    },
                },
                {
                    path: '/varasto/tilaus/:id',
                    element: <OrderView />,
                    loader: async ({ params }) => {
                        const { data } = await axios.get(`http://localhost:3001/orders/${params.id}`);
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
                    path: '/admin/user/:num/:view',
                    element: <UsersList />,
                    loader: async ({ params }) => {
                        // num will tell back-end which entries to bring
                        const dataList = [...userList];
                        // view is order status, unless archived can bring all?
                        // or will be replaced into the back-end later?
                        const statuses = {
                            admin: 2,
                            varasto: 1,
                            kahvinkeittäjä: 0,
                        };
                        statuses[params.view] = 10;
                        dataList.sort((a, b) => {
                            if (statuses[a.status] > statuses[b.status]) {
                                return -1;
                            }
                            if (a.status === b.status) {
                                if (a.id > b.id) {
                                    return -1;
                                }
                            }
                            return 1;
                        });

                        if (dataList) {
                            return dataList;
                        }
                        return null;
                    },
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
