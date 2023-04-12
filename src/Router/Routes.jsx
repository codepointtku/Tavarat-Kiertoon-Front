import { useContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import AuthContext from '../Context/AuthContext';
import ErrorBoundary from '../Components/ErrorBoundary';

import DefaultView from '../Views/DefaultView';

import storageTheme from '../Themes/storageTheme';
import adminTheme from '../Themes/adminTheme';

import BaseLayout from '../Layouts/BaseLayout';
import StorageLayout from '../Layouts/StorageLayout';
import AdminLayout from '../Layouts/AdminLayout';
import RootLayout from '../Layouts/RootLayout';
import BikesLayout from '../Layouts/BikesLayout';

import OrdersList from '../Components/OrdersList';
import OrderView from '../Components/OrderView';
import OrderEdit from '../Components/OrderEdit';
import QrScanner from '../Components/QrScanner';

import UsersList from '../Components/UsersList';
import UserEdit from '../Components/UserEdit';

import StoragesList from '../Components/StoragesList';
import StorageEdit from '../Components/StorageEdit';
import AddStorage from '../Components/AddStorage';
import AddItem from '../Components/AddItem';

import PDFView from '../Components/PDFView';

import ProductDetails from '../Components/ProductDetails';
import ShoppingCart from '../Components/ShoppingCart/ShoppingCart';
import ContactsAndDelivery from '../Components/ShoppingCart/ContactsAndDelivery';
import CartView from '../Components/ShoppingCart/CartView';
import Confirmation from '../Components/ShoppingCart/Confirmation';

import SignupLandingPage from '../Components/Signup/SignupLandingPage';
import SignupPage from '../Components/Signup/SignupPage';
import ContactPage from '../Components/ContactPage';
import Stats from '../Components/Stats/Stats';
import BackgroundInfo from '../Components/Backgroundinfo';
import Announcements from '../Components/Announcements';
import DeliveryView from '../Components/DeliveryView';

import InstructionsPage from '../Components/Instructions/InstructionsPage';
import GuideCommon from '../Components/Instructions/GuideCommon';
import GuideAccount from '../Components/Instructions/GuideAccount';
import GuideOrdering from '../Components/Instructions/GuideOrdering';
import GuideShipping from '../Components/Instructions/GuideShipping';
import GuideBikes from '../Components/Instructions/GuideBikes';

import BikesPage from '../Components/Bikes/BikesPage';
import Bikes from '../Components/Bikes/Bikes';
import BikeWarehouse from '../Components/Bikes/BikeWarehouse';
import BikePackets from '../Components/Bikes/BikePackets';
import BikeRentals from '../Components/Bikes/BikeRentals';

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
    shoppingCartLoader,
    bikesListLoader,
    contactsAndDeliveryLoader,
} from './loaders';

import {
    userSignupAction,
    contactAction,
    orderEditAction,
    storageEditAction,
    storageCreateAction,
    frontPageActions,
    userEditAction,
    cartViewAction,
    bikeOrderAction,
} from './actions';

function Routes() {
    const { auth, setAuth } = useContext(AuthContext);
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <ErrorBoundary />,
            id: 'root',
            loader: async () => rootLoader(auth, setAuth),
            // Loads data only at first page load, not with every route
            shouldRevalidate: () => false,
            children: [
                {
                    path: '/',
                    element: <BaseLayout />,
                    id: 'frontPage',
                    loader: async () => shoppingCartLoader(auth, setAuth),
                    action: async ({ request }) => frontPageActions(auth, setAuth, request),
                    children: [
                        {
                            index: true,
                            element: <DefaultView />,
                            loader: async ({ request }) => productListLoader(auth, setAuth, request),
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
                            element: <Stats />,
                        },
                        {
                            path: '/ostoskori',
                            element: <ShoppingCart />,
                            children: [
                                {
                                    path: '/ostoskori/',
                                    element: <CartView />,
                                    action: async ({ request }) => cartViewAction(auth, setAuth, request),
                                },
                                {
                                    path: '/ostoskori/vaihe2',
                                    element: <ContactsAndDelivery />,
                                    loader: contactsAndDeliveryLoader,
                                },
                                {
                                    path: '/ostoskori/vaihe3',
                                    element: <Confirmation />,
                                },
                            ],
                        },
                        {
                            path: '/tiedotteet',
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
                            index: true,
                            element: <Navigate to="0/delivery?page=0&rows=5" />,
                        },
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
                            path: 'luo',
                            element: <AddItem />,
                            loader: addItemLoader,
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
                            element: <Outlet />,
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
                                    action: async ({ request, params }) =>
                                        userEditAction(auth, setAuth, request, params),
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
                // bikes routes
                {
                    path: 'pyorat',
                    element: <BikesLayout />,
                    children: [
                        {
                            index: true,
                            element: <BikesPage />,
                            action: async ({ request }) => bikeOrderAction(auth, setAuth, request),
                            loader: bikesListLoader,
                            shouldRevalidate: () => false,
                        },
                        {
                            path: 'pyoravarasto',
                            element: <BikeWarehouse />,
                            action: async ({ request }) => bikeOrderAction(auth, setAuth, request),

                            children: [
                                {
                                    index: true,
                                    element: <Bikes />,
                                },
                                {
                                    path: 'pyoratilaukset',
                                    element: <BikeRentals />,
                                },
                                {
                                    path: 'pyorapaketit',
                                    element: <BikePackets />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
