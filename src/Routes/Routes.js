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
import AddItem from '../Components/AddItem';
import DeliveryView from '../Components/DeliveryView';
import BackgroundInfo from '../Components/Backgroundinfo';
import StatsPage from '../Components/Stats/StatsPage';
import ErrorBoundary from '../Components/ErrorBoundary';
import AddStorage from '../Components/AddStorage';

import SignupLandingPage from '../Components/Signup/SignupLandingPage';
import SignupPage from '../Components/Signup/SignupPage';
import ContactPage from '../Components/ContactPage';

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

import { userSignupAction, contactAction, orderEditAction, storageCreateAction, storageEditAction } from './actions';

import InstructionsPage from '../Components/Instructions/InstructionsPage';
import GuideCommon from '../Components/Instructions/GuideCommon';
import GuideAccount from '../Components/Instructions/GuideAccount';
import GuideOrdering from '../Components/Instructions/GuideOrdering';
import GuideShipping from '../Components/Instructions/GuideShipping';
import GuideBikes from '../Components/Instructions/GuideBikes';
import StorageProducts from '../Components/StorageProducts';

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
                            loader: productListLoader,
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
                                    loader: productDetailsLoader,
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
                                    action: userSignupAction,
                                },
                                {
                                    path: 'toimipaikka',
                                    element: <SignupPage isLocationForm />,
                                    loader: userSignupLoader,
                                    action: userSignupAction,
                                },
                            ],
                        },
                        {
                            path: 'otayhteytta',
                            element: <ContactPage />,
                            action: contactAction,
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
                                            loader: orderViewLoader,
                                        },
                                        {
                                            path: 'muokkaa',
                                            element: <OrderEdit />,
                                            action: orderEditAction,
                                            loader: orderEditLoader,
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
                                    loader: pdfViewLoader,
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
                            <AdminLayout />
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
                                    loader: storagesListLoader,
                                },
                                {
                                    path: ':id',
                                    element: <StorageEdit />,
                                    loader: storageEditLoader,
                                    action: storageEditAction,
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
                                    loader: usersListLoader,
                                },
                                {
                                    path: ':id',
                                    element: <UserEdit />,
                                    loader: userEditLoader,
                                },
                            ],
                        },
                        {
                            path: 'varastot/luo',
                            element: <AddStorage />,
                            action: storageCreateAction,
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
