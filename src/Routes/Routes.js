import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
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
    addItemLoader,
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
} from './loaders';

import { userSignupAction, contactAction, orderEditAction, storageCreateAction, storageEditAction } from './actions';

import InstructionsPage from '../Components/Instructions/InstructionsPage';
import GuideCommon from '../Components/Instructions/GuideCommon';
import GuideAccount from '../Components/Instructions/GuideAccount';
import GuideOrdering from '../Components/Instructions/GuideOrdering';
import GuideShipping from '../Components/Instructions/GuideShipping';
import GuideBikes from '../Components/Instructions/GuideBikes';

function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Outlet />,
            id: 'root',
            errorElement: <ErrorBoundary />,
            loader: rootLoader,
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
                            loader: productListLoader,
                        },
                        {
                            // Redirect if no id is given
                            path: '/tuotteet',
                            element: <Navigate to="/" />,
                        },
                        {
                            path: '/tuotteet/:id',
                            element: <ProductDetails />,
                            loader: productDetailsLoader,
                        },
                        {
                            path: '/ohjeet',
                            element: <InstructionsPage />,
                        },
                        {
                            path: '/ohjeet/ukk',
                            element: <GuideCommon />,
                        },
                        {
                            path: '/ohjeet/tili',
                            element: <GuideAccount />,
                        },
                        {
                            path: '/ohjeet/tili/:value',
                            element: <GuideAccount />,
                        },
                        {
                            path: '/ohjeet/tilaus',
                            element: <GuideOrdering />,
                        },
                        {
                            path: '/ohjeet/tilaus/:value',
                            element: <GuideOrdering />,
                        },
                        {
                            path: '/ohjeet/nouto',
                            element: <GuideShipping />,
                        },
                        {
                            path: '/ohjeet/pyorat',
                            element: <GuideBikes />,
                        },
                        {
                            path: '/ohjeet/pyorat/:value',
                            element: <GuideBikes />,
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
                            loader: userSignupLoader,
                            action: userSignupAction,
                        },
                        {
                            path: '/rekisteroidy/toimipaikka',
                            element: <SignupPage isLocationForm />,
                            loader: userSignupLoader,
                            action: userSignupAction,
                        },
                        {
                            path: '/otayhteytta',
                            element: <ContactPage />,
                            action: contactAction,
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
                            loader: ordersListLoader,
                        },
                        {
                            path: '/varasto/tilaus/:id',
                            element: <OrderView />,
                            loader: orderViewLoader,
                        },
                        {
                            path: '/varasto/tilaus/:id/muokkaa',
                            element: <OrderEdit />,
                            action: orderEditAction,
                            loader: orderEditLoader,
                        },
                        {
                            path: '/varasto/luo',
                            element: <AddItem />,
                            loader: addItemLoader,
                        },
                        {
                            path: '/varasto/koodinlukija',
                            element: <QrScanner />,
                        },
                        {
                            path: '/varasto/pdf/:id',
                            element: <PDFView />,
                            loader: pdfViewLoader,
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
                            loader: storagesListLoader,
                        },
                        {
                            path: '/admin/users',
                            element: <UsersList />,
                            loader: usersListLoader,
                        },
                        {
                            path: '/admin/users/:id',
                            element: <UserEdit />,
                            loader: userEditLoader,
                        },
                        {
                            path: '/admin/varastot/:id',
                            element: <StorageEdit />,
                            action: storageEditAction,
                            loader: storageEditLoader,
                        },
                        {
                            path: '/admin/varastot/luo',
                            element: <AddStorage />,
                            action: storageCreateAction,
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
