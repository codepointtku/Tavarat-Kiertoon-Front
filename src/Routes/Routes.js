import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import axios from 'axios';

// import StorageView from './StorageView';
// import AdminView from './AdminView';

import storageTheme from '../Themes/storageTheme';
import adminTheme from '../Themes/adminTheme';
import BaseLayout from '../Layouts/BaseLayout';
import StorageLayout from '../Layouts/StorageLayout';
import AdminLayout from '../Layouts/AdminLayout';
import RootLayout from '../Layouts/RootLayout';

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
import DeliveryView from '../Components/DeliveryView';
import BackgroundInfo from '../Components/Backgroundinfo';
import StatsPage from '../Components/Stats/StatsPage';
import ErrorBoundary from '../Components/ErrorBoundary';

import SignupLandingPage from '../Components/Signup/SignupLandingPage';
import SignupPage from '../Components/Signup/SignupPage';
import ContactPage from '../Components/ContactPage';

import PDFView from '../Components/PDFView';
import {
    addItemLoader,
    orderEditLoader,
    ordersListLoader,
    orderViewLoader,
    pdfViewLoader,
    productDetailsLoader,
    productListLoader,
    rootLoader,
    storagesListLoader,
    userEditLoader,
    usersListLoader
} from './Loaders';

function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <ErrorBoundary />,
            id: 'root',
            loader: rootLoader,
            children: [
                {
                    path: '/',
                    element: <BaseLayout />,
                    children: [
                        {
                            index: true,
                            element: <ProductList />,
                            loader: productListLoader
                        },
                        {
                            // Redirect if no id is given
                            path: 'tuotteet',
                            element: <Navigate to="/" />,
                        },
                        {
                            path: '/tuotteet/:id',
                            element: <ProductDetails />,
                            loader: productDetailsLoader,
                        },
                        {
                            path: 'faq',
                            element: <FaqView />,
                        },
                        {
                            path: 'toimitus',
                            element: <DeliveryView />,
                        },
                        {
                            path: 'taustatietoa',
                            element: <BackgroundInfo />,
                        },
                        {
                            path: 'stats',
                            element: <StatsPage />,
                        },
                        {
                            path: 'tiedotteet',
                            element: <Announcements />,
                        },
                        {
                            path: 'rekisteroidy',
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
                            path: 'otayhteytta',
                            element: <ContactPage />,
                            action: async ({ request }) => {
                                const formData = await request.formData();
                                const response = await axios.post('http://localhost:8000/contact_forms/', formData);
                                console.log(response);
                                return response.data || null;
                            },
                        },
                    ]
                },
                {
                    path: 'varasto',
                    element: (
                        <ThemeProvider theme={storageTheme}>
                            <StorageLayout />
                        </ThemeProvider>
                    ),
                    errorElement: (
                        <ThemeProvider theme={storageTheme}>
                            <StorageLayout />
                        </ThemeProvider>
                    ),
                    children: [
                        {
                            path: ':num/:view',
                            element: <OrdersList />,
                            loader: ordersListLoader,
                        },
                        {
                            path: 'tilaus/:id',
                            element: <OrderView />,
                            loader: orderViewLoader,
                        },
                        {
                            path: 'tilaus/:id/muokkaa',
                            element: <OrderEdit />,
                            action: async ({ params, request }) => {
                                const formData = await request.formData();
                                // const id = Number(formData.get(formData.has('id') ? 'id' : 'index'));
                                // const productName = formData.get('productName');
                                if (request.method === 'POST') {
                                    if (formData.get('type') === 'delete') {
                                        const response = await axios.delete(
                                            `http://localhost:8000/orders/${params.id}`,
                                            {
                                                data: {
                                                    product: Number(formData.get('product')),
                                                    productId: Number(formData.get('productId')),
                                                },
                                            }
                                        );
                                        if (response.status === 202) {
                                            return { type: 'delete', status: true };
                                        }
                                        return { type: 'delete', status: false };
                                    }
                                    if (formData.get('type') === 'put') {
                                        const response = await axios.put(`http://localhost:8000/orders/${params.id}`, {
                                            contact: formData.get('contact'),
                                            delivery_address: formData.get('delivery_address'),
                                            status: formData.get('status'),
                                            order_info: formData.get('order_info'),
                                        });
                                        if (response.status === 200) {
                                            return { type: 'update', status: true };
                                        }
                                        return { type: 'update', status: false };
                                    }
                                }

                                return null;
                            },
                            loader: orderEditLoader,
                        },
                        {
                            path: 'luo',
                            element: <AddItem />,
                            loader: addItemLoader,
                        },
                        {
                            path: 'koodinlukija',
                            element: <QrScanner />,
                        },
                        {
                            path: 'pdf/:id',
                            element: <PDFView />,
                            loader: pdfViewLoader,
                        },
                    ],
                },
                {
                    path: '/admin',
                    element: (
                        <ThemeProvider theme={adminTheme}>
                            <AdminLayout />
                        </ThemeProvider>
                    ),
                    errorElement: (
                        <ThemeProvider theme={adminTheme}>
                            <AdminLayout />
                        </ThemeProvider>
                    ),
                    children: [
                        {
                            index: true,
                            element: <StoragesList />,
                            loader: storagesListLoader,
                        },
                        {
                            path: 'users',
                            element: <UsersList />,
                            loader: usersListLoader,
                        },
                        {
                            path: 'users/:id',
                            element: <UserEdit />,
                            loader: userEditLoader,
                        },
                        {
                            path: 'varastot/:id',
                            element: <StorageEdit />,
                        },
                        {
                            path: 'hakemukset',
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
