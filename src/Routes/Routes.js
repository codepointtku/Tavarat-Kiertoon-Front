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
import OrderEdit from '../Components/OrderEdit';
import QrScanner from '../Components/QrScanner';

import UsersList from '../Components/UsersList';
import UserEdit from '../Components/UserEdit';

import ProductList from '../Components/ProductList';
import ProductDetails from '../Components/ProductDetails';
import Announcements from '../Components/Announcements';
import FaqView from '../Components/FaqView';
import StoragesList from '../Components/StoragesList';
import StorageEdit from '../Components/StorageEdit';
import AddItem from '../Components/AddItem';
import ShoppingCart from '../Components/ShoppingCart/ShoppingCart';
import CartView from '../Components/ShoppingCart/CartView';
import ContactsAndDelivery from '../Components/ShoppingCart/ContactsAndDelivery';
import Confirmation from '../Components/ShoppingCart/Confirmation';
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
            id: 'base',
            loader: async () => {
                const { data: contacts } = await axios.get('http://localhost:3001/contacts');
                const { data: products } = await axios.get('http://localhost:8000/products/');
                const { data: cart } = await axios.get('http://localhost:8000/shopping_carts/3');
                return { contacts, cart, products };
            },

            children: [
                {
                    path: '/',
                    element: <ProductList />,
                    action: async ({ request }) => {
                        const formData = await request.formData();
                        const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
                        const products = formData.get('products');
                        if (request.method === 'POST') {
                            await axios.post('http://localhost:8000/shopping_carts', { id, products });
                        } else if (request.method === 'DELETE') {
                            await axios.delete(`http://localhost:8000/shopping_carts/${id}`);
                        }
                        return null;
                    },
                    loader: async () => {
                        try {
                            const { data: products } = await axios.get('http://localhost:3001/products/');
                            return { products };
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
                    path: '/ostoskori',
                    element: <ShoppingCart />,
                    // loader: async ({ params }) => {
                    //     try {
                    //         const { data: cart } = await axios.get(`http://localhost:8000/shopping_carts/${params.id}`);
                    //         return cart;
                    //     } catch (error) {
                    //         return error;
                    //     }
                    // },
                    children: [
                        { path: '/ostoskori/', element: <CartView /> },
                        { path: '/ostoskori/vaihe2', element: <ContactsAndDelivery /> },
                        { path: '/ostoskori/vaihe3', element: <Confirmation /> },
                    ],
                },

                {
                    path: '/tiedotteet',
                    element: <Announcements />,
                    loader: async () => {
                        try {
                            const { data } = await axios.get('http://localhost:3001/announcements');
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
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
