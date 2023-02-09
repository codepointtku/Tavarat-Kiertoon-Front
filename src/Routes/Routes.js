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
import BikesLayout from '../Layouts/Bikes';

import OrdersList from '../Components/OrdersList';
import OrderView from '../Components/OrderView';
import OrderEdit from '../Components/OrderEdit';
import QrScanner from '../Components/QrScanner';

import UsersList from '../Components/UsersList';
import UserEdit from '../Components/UserEdit';

import BikesPage from '../Components/Bikes/BikesPage';
import BikeDetails from '../Components/Bikes/BikeDetails';
import BikesView from './BikesView';

import ProductList from '../Components/ProductList';
import ProductDetails from '../Components/ProductDetails';
import Announcements from '../Components/Announcements';
import FaqView from '../Components/FaqView';
import StoragesList from '../Components/StoragesList';
import StorageEdit from '../Components/StorageEdit';
import AddItem from '../Components/AddItem';
import Delivery from '../toimitus';
import BackgroundInfo from '../Components/Backgroundinfo';
import StatsPage from '../Components/Stats/StatsPage';
import SignupLandingPage from '../Components/Signup/SignupLandingPage';
import SignupPage from '../Components/Signup/SignupPage';

function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Base>
                    <DefaultView />
                </Base>
            ),
            loader: async () => {
                const { data } = await axios.get('http://localhost:3001/contacts');
                return data;
            },

            children: [
                {
                    path: '/',
                    element: <ProductList />,
                    loader: async () => {
                        try {
                            const { data } = await axios.get('http://localhost:8000/products/');
                            return data.results;
                        } catch {
                            return null;
                        }
                    },
                },
                {
                    path: '/tuotteet/:id',
                    element: <ProductDetails />,
                    loader: async ({ params }) => {
                        try {
                            const { data } = await axios.get(`http://localhost:8000/products/${params.id}`);
                            return data;
                        } catch {
                            return null;
                        }
                    },
                },
                {
                    path: '/delivery',
                    element: <Delivery />,
                    loader: async () => {
                        const { data } = await axios.get('http://localhost:3001/contacts');
                        return data;
                    },
                },
                {
                    path: '/faq',
                    element: <FaqView />,
                },
                {
                    path: '/backgroundinfo',
                    element: <BackgroundInfo />,
                },
                {
                    path: '/stats',
                    element: <StatsPage />,
                },
                {
                    path: '/tiedotteet',
                    element: <Announcements />,
                    loader: async () => {
                        const { data } = await axios.get('http://localhost:3001/announcements');
                        try {
                            return data;
                        } catch {
                            return null;
                        }
                    },
                },
                {
                    path: '/signup',
                    element: <SignupLandingPage />,
                },
                {
                    path: '/signup/user',
                    element: <SignupPage isLocationForm={false} />,
                },
                {
                    path: '/signup/location',
                    element: <SignupPage isLocationForm />,
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
            loader: async () => {
                const { data } = await axios.get('http://localhost:3001/contacts');
                return data;
            },
            children: [
                {
                    path: '/varasto/:num/:view',
                    element: <OrdersList />,
                    loader: async ({ params }) => {
                        const { data } = await axios.get('http://localhost:8000/orders');
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
                        const { data } = await axios.get(`http://localhost:8000/orders/${params.id}`);
                        const productFind = async (id) => {
                            const product = await axios.get(`http://localhost:8000/products/${id}`);
                            return product;
                        };
                        const newProducts = await Promise.all(data.products.map((entry) => productFind(entry)));

                        data.products.forEach((entry) => {
                            productFind(entry);
                        });
                        if (data) {
                            data.productList = newProducts;
                            return data;
                        }
                        return null;
                    },
                },
                {
                    path: '/varasto/tilaus/:id/muokkaa',
                    element: <OrderEdit />,
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
            loader: async () => {
                const { data } = await axios.get('http://localhost:3001/contacts');
                return data;
            },
            children: [
                {
                    path: '/admin',
                    element: <StoragesList />,
                    loader: async () => {
                        const { data } = await axios.get('http://localhost:3001/storages');
                        if (data) {
                            return data;
                        }
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
                    loader: async ({ params }) => {
                        const { data } = await axios.get(`http://localhost:3001/users/${params.id}`);
                        if (data) {
                            return data;
                        }
                        return data;
                    },
                },
                {
                    path: '/admin/varastot/:id',
                    element: <StorageEdit />,
                },
                {
                    path: '/admin/hakemukset',
                    element: <h2 style={{ textAlign: 'center' }}>Tässä on hakemukset</h2>,
                },
            ],
        },
        {
            path: '/bikes',
            element: (
                <BikesLayout>
                    <BikesView />
                </BikesLayout>
            ),
            loader: async () => {
                const { data } = await axios.get('http://localhost:3001/contacts');
                return data;
            },
            children: [
                {
                    path: '/bikes',
                    element: <BikesPage />,
                    loader: async () => {
                        const { data } = await axios.get('http://localhost:3001/bikes');
                        return data;
                    },
                },
                {
                    path: '/bikes/:id',
                    element: <BikeDetails />,
                    loader: async ({ params }) => {
                        const { data } = await axios.get(`http://localhost:3001/bikes/${params.id}`);
                        return data ?? null;
                    },
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
