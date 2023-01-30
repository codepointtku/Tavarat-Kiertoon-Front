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
import UserEdit from '../Components/UserEdit';

import ProductList from '../Components/ProductList';
import ProductDetails from '../Components/ProductDetails';
import FaqView from '../Components/FaqView';
import StoragesList from '../Components/StoragesList';
import StorageEdit from '../Components/StorageEdit';
import AddItem from '../Components/AddItem';
import ItemForm from '../Components/AddNewItem';

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
                {
                    path: '/faq',
                    element: <FaqView />,
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
                    path: '/varasto/luo',
                    element: <AddItem />,
                },
                {
                    path: '/varasto/lomake',
                    element: <ItemForm />,
                    loader: async () => {
                        const dataList = [];
                        let { data } = await axios.get('http://localhost:3001/categories/');
                        dataList.push(data);
                        data = await axios.get('http://localhost:3001/storages/');
                        dataList.push(data.data);
                        if (dataList) {
                            return dataList;
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
                    element: <StoragesList />,
                    loader: async () => {
                        const { data } = await axios.get('http://localhost:3001/storages');
                        if (data) {
                            return data;
                        }
                        console.log(data);
                        return null;
                    },
                },
                {
                    path: '/admin/users',
                    element: <UsersList />,
                    loader: async () => {
                        // num will tell back-end which entries to bring
                        const { data } = await axios.get('http://localhost:3001/users');
                        // view is order status, unless archived can bring all?
                        // or will be replaced into the back-end later?
                        if (data) {
                            return data;
                        }
                        return data;
                    },
                },
                {
                    path: '/admin/users/:id',
                    element: <UserEdit />,
                },
                {
                    path: '/admin/varastot/:id',
                    element: <StorageEdit />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
