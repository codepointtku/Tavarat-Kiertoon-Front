import { useContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

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

import StoragesList from '../Components/StoragesList';
import StorageEdit from '../Components/StorageEdit';
import DeliveryView from '../Components/DeliveryView';
import BackgroundInfo from '../Components/Backgroundinfo';
import StatsPage from '../Components/Stats/StatsPage';
import ErrorBoundary from '../Components/ErrorBoundary';
import AddStorage from '../Components/AddStorage';

import SignupLandingPage from '../Components/Signup/SignupLandingPage';
import SignupPage from '../Components/Signup/SignupPage';
import ContactPage from '../Components/ContactPage';

import AuthContext from '../Context/AuthContext';

import PDFView from '../Components/PDFView';
import {
    orderEditLoader,
    ordersListLoader,
    orderViewLoader,
    pdfViewLoader,
    productDetailsLoader,
    productListLoader,
    rootLoader,
    storagesListLoader,
    storageEditLoader,
    userEditLoader,
    usersListLoader,
    userSignupLoader,
    storageProductsLoader,
} from './loaders';

import {
    userSignupAction,
    contactAction,
    orderEditAction,
    storageCreateAction,
    storageEditAction,
    addProductAction,
    userLoginAction,
} from './actions';

import InstructionsPage from '../Components/Instructions/InstructionsPage';
import GuideCommon from '../Components/Instructions/GuideCommon';
import GuideAccount from '../Components/Instructions/GuideAccount';
import GuideOrdering from '../Components/Instructions/GuideOrdering';
import GuideShipping from '../Components/Instructions/GuideShipping';
import GuideBikes from '../Components/Instructions/GuideBikes';
import StorageProducts from '../Components/StorageProducts';
import AddNewItem from '../Components/AddNewItem';

function Routes() {
    const { auth, setAuth } = useContext(AuthContext);
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <ErrorBoundary />,
            id: 'root',
            loader: async () => rootLoader(auth, setAuth),
            shouldRevalidate: () => false,
            children: [
                {
                    path: '/',
                    element: <BaseLayout />,
                    action: async ({ request }) => userLoginAction(auth, setAuth, request),
                    children: [
                        {
                            index: true,
                            element: <ProductList />,
                            loader: async () => productListLoader(auth, setAuth),
                        },
                        {
                            path: 'tuotteet',
                            element: <Outlet />,
                            children: [
                                {
                                    // Redirect if no id is given
                                    index: true,
                                    element: <Navigate to="/" />,
                                },
                                {
                                    path: ':id',
                                    element: <ProductDetails />,
                                    loader: async ({ params }) => productDetailsLoader(auth, setAuth, params),
                                },
                            ],
                        },
                        {
                            path: 'ohjeet',
                            element: <Outlet />,
                            children: [
                                {
                                    index: true,
                                    element: <InstructionsPage />,
                                },
                                {
                                    path: 'ukk',
                                    element: <GuideCommon />,
                                },
                                {
                                    path: 'tili',
                                    element: <GuideAccount />,
                                    children: [
                                        {
                                            path: ':value',
                                            element: <GuideAccount />,
                                        },
                                    ],
                                },
                                {
                                    path: 'tilaus',
                                    element: <GuideOrdering />,
                                    children: [
                                        {
                                            path: ':value',
                                            element: <GuideOrdering />,
                                        },
                                    ],
                                },
                                {
                                    path: 'nouto',
                                    element: <GuideShipping />,
                                },
                                {
                                    path: 'pyorat',
                                    element: <GuideBikes />,
                                    children: [
                                        {
                                            path: ':value',
                                            element: <GuideBikes />,
                                        },
                                    ],
                                },
                            ],
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
                            element: <Outlet />,
                            children: [
                                {
                                    index: true,
                                    element: <SignupLandingPage />,
                                },
                                {
                                    path: 'kayttaja',
                                    element: <SignupPage isLocationForm={false} />,
                                    loader: userSignupLoader,
                                    action: async ({ request }) => userSignupAction(auth, setAuth, request),
                                },
                                {
                                    path: 'toimipaikka',
                                    element: <SignupPage isLocationForm />,
                                    loader: userSignupLoader,
                                    action: async ({ request }) => userSignupAction(auth, setAuth, request),
                                },
                            ],
                        },
                        {
                            path: 'otayhteytta',
                            element: <ContactPage />,
                            action: async ({ request }) => contactAction(auth, setAuth, request),
                        },
                    ],
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
                            <ErrorBoundary />,
                        </ThemeProvider>
                    ),
                    children: [
                        {
                            path: ':num/:view',
                            element: <OrdersList />,
                            loader: async ({ params }) => ordersListLoader(auth, setAuth, params),
                        },
                        {
                            path: 'tilaus',
                            element: <Outlet />,
                            children: [
                                {
                                    index: true,
                                    element: <Navigate to="/varasto" />,
                                },
                                {
                                    path: ':id',
                                    element: <Outlet />,
                                    children: [
                                        {
                                            index: true,
                                            element: <OrderView />,

                                            loader: async ({ params }) => orderViewLoader(auth, setAuth, params),
                                        },
                                        {
                                            path: 'muokkaa',
                                            element: <OrderEdit />,
                                            action: async ({ request, params }) =>
                                                orderEditAction(auth, setAuth, request, params),
                                            loader: async ({ params }) => orderEditLoader(auth, setAuth, params),
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            path: 'tuotteet',
                            id: 'storageProducts',
                            element: <StorageProducts />,
                            loader: storageProductsLoader,
                        },
                        {
                            path: 'tuotteet/luo',
                            element: <AddNewItem />,
                            loader: storageProductsLoader,
                            action: async ({ request }) => addProductAction(auth, setAuth, request),
                        },
                        {
                            path: 'koodinlukija',
                            element: <QrScanner />,
                        },
                        {
                            path: 'pdf',
                            element: <Outlet />,
                            children: [
                                {
                                    index: true,
                                    element: <Navigate to="/varasto" />,
                                },
                                {
                                    path: ':id',
                                    element: <PDFView />,
                                    loader: ({ params }) => pdfViewLoader(auth, setAuth, params),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'admin',
                    element: (
                        <ThemeProvider theme={adminTheme}>
                            <AdminLayout />
                        </ThemeProvider>
                    ),
                    errorElement: (
                        <ThemeProvider theme={adminTheme}>
                            <ErrorBoundary />,
                        </ThemeProvider>
                    ),
                    children: [
                        {
                            index: true,
                            element: <Navigate to="varastot" />,
                        },
                        {
                            path: 'varastot',
                            element: <Outlet />,
                            children: [
                                {
                                    index: true,
                                    element: <StoragesList />,
                                    loader: async () => storagesListLoader(auth, setAuth),
                                },
                                {
                                    path: ':id',
                                    element: <StorageEdit />,
                                    loader: async ({ params }) => storageEditLoader(auth, setAuth, params),
                                    action: async ({ request, params }) =>
                                        storageEditAction(auth, setAuth, request, params),
                                },
                            ],
                        },
                        // NOTE : JTo : 'users' paths need to be checked once users are enabled in back-end
                        {
                            path: 'users',
                            element: <UsersList />,
                            children: [
                                {
                                    index: true,
                                    element: <UsersList />,
                                    loader: async () => usersListLoader(auth, setAuth),
                                },
                                {
                                    path: ':id',
                                    element: <UserEdit />,
                                    loader: async ({ params }) => userEditLoader(auth, setAuth, params),
                                },
                            ],
                        },
                        {
                            path: 'varastot/luo',
                            element: <AddStorage />,
                            action: async ({ request }) => storageCreateAction(auth, setAuth, request),
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
