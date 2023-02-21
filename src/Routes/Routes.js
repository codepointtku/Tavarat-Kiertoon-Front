import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
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
import DeliveryView from '../Components/DeliveryView';
import BackgroundInfo from '../Components/Backgroundinfo';
import StatsPage from '../Components/Stats/StatsPage';
import ErrorBoundary from '../Components/ErrorBoundary';

import SignupLandingPage from '../Components/Signup/SignupLandingPage';
import SignupPage from '../Components/Signup/SignupPage';
import ContactPage from '../Components/ContactPage';

import PDFView from '../Components/PDFView';

function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Outlet />,
            id: 'root',
            errorElement: <ErrorBoundary />,
            loader: async () => {
                const { data: contacts } = await axios.get('http://localhost:8000/contacts/');
                const { data: colors } = await axios.get('http://localhost:8000/colors/');
                const { data: categories } = await axios.get('http://localhost:8000/categories/');
                const { data: bulletins } = await axios.get('http://localhost:8000/bulletins/');
                const { data: cart } = await axios.get('http://localhost:8000/shopping_carts/8');
                /* eslint-disable no-shadow */
                const cartItems = cart.products.reduce((cartItems, product) => {
                    let cartItem = cartItems.find((cartItem) => cartItem.group_id === product.group_id);

                    if (!cartItem) {
                        cartItem = {
                            ...product,
                            count: 0,
                        };
                        cartItems.push(cartItem);
                    }

                    cartItem.count += 1;

                    return cartItems;
                }, []);
                return { contacts, cart, colors, categories, bulletins, cartItems };
            },
            children: [
                {
                    path: '/',
                    element: (
                        <Base>
                            <DefaultView />
                        </Base>
                    ),
                    errorElement: (
                        <Base>
                            <ErrorBoundary />
                        </Base>
                    ),
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
                                    const { data } = await axios.get('http://localhost:8000/products/');
                                    return data.results;
                                } catch {
                                    return null;
                                }
                            },
                        },
                        {
                            // Redirect if no id is given
                            path: '/tuotteet',
                            element: <Navigate to="/" />,
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
                            path: '/faq',
                            element: <FaqView />,
                        },
                        {
                            path: '/toimitus',
                            element: <DeliveryView />,
                        },
                        {
                            path: '/taustatietoa',
                            element: <BackgroundInfo />,
                        },
                        {
                            path: '/stats',
                            element: <StatsPage />,
                        },
                        {
                            path: '/ostoskori',
                            element: <ShoppingCart />,
                            children: [
                                { path: '/ostoskori/', element: <CartView /> },
                                { path: '/ostoskori/vaihe2', element: <ContactsAndDelivery /> },
                                { path: '/ostoskori/vaihe3', element: <Confirmation /> },
                            ],
                        },
                        {
                            path: '/tiedotteet',
                            element: <Announcements />,
                        },
                        {
                            path: '/rekisteroidy',
                            element: <SignupLandingPage />,
                        },
                        {
                            path: '/rekisteroidy/kayttaja',
                            element: <SignupPage isLocationForm={false} />,
                        },
                        {
                            path: '/rekisteroidy/toimipaikka',
                            element: <SignupPage isLocationForm />,
                        },
                        {
                            path: '/otayhteytta',
                            element: <ContactPage />,
                            action: async ({ request }) => {
                                const formData = await request.formData();
                                const response = await axios.post('http://localhost:8000/contact_forms/', formData);
                                console.log(response);
                                return response.data || null;
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
                    errorElement: (
                        <ThemeProvider theme={storageTheme}>
                            <Storage>
                                <ErrorBoundary />
                            </Storage>
                        </ThemeProvider>
                    ),
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
                            action: async ({ params, request }) => {
                                const formData = await request.formData();
                                // const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
                                // const productName = formData.get('productName');
                                if (request.method === 'POST') {
                                    if (formData.get('type') === 'delete') {
                                        await axios.delete(`http://localhost:8000/orders/${params.id}`, {
                                            data: {
                                                product: Number(formData.get('product')),
                                                productId: Number(formData.get('productId')),
                                            },
                                        });
                                    } else if (formData.get('type') === 'put') {
                                        await axios.put(`http://localhost:8000/orders/${params.id}`, {
                                            contact: formData.get('contact'),
                                            delivery_address: formData.get('delivery_address'),
                                            status: formData.get('status'),
                                            order_info: formData.get('order_info'),
                                        });
                                    }
                                }

                                return null;
                            },
                            loader: async ({ params }) => {
                                const { data } = await axios.get(`http://localhost:8000/orders/${params.id}`);
                                const productFind = async (id) => {
                                    const product = await axios.get(`http://localhost:8000/products/${id}`);
                                    return product.data;
                                };
                                const newProducts = await Promise.all(data.products.map((entry) => productFind(entry)));

                                if (data) {
                                    data.products = newProducts;
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
                        {
                            path: '/varasto/pdf/:id',
                            element: <PDFView />,
                            loader: async ({ params }) => {
                                const { data } = await axios.get(`http://localhost:8000/orders/${params.id}`);
                                return data || null;
                            },
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
                    errorElement: (
                        <ThemeProvider theme={adminTheme}>
                            <Admin>
                                <ErrorBoundary />
                            </Admin>
                        </ThemeProvider>
                    ),
                    children: [
                        {
                            path: '/admin',
                            element: <StoragesList />,
                            loader: async () => {
                                const { data } = await axios.get('http://localhost:8000/storages');
                                return data;
                            },
                        },
                        {
                            path: '/admin/users',
                            element: <UsersList />,
                            loader: async () => {
                                const { data } = await axios.get('http://localhost:8000/users');
                                return data;
                            },
                        },
                        {
                            path: '/admin/users/:id',
                            element: <UserEdit />,
                            loader: async ({ params }) => {
                                const { data } = await axios.get(`http://localhost:8000/users/${params.id}`);
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
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
