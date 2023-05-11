import { useContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router-dom';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { ThemeProvider } from '@mui/material';

import AuthContext from '../Context/AuthContext';
import ErrorBoundary from './ErrorBoundary';

import DefaultView from '../Views/DefaultView';

import storageTheme from '../Themes/storageTheme';
import adminTheme from '../Themes/adminTheme';
import bikeTheme from '../Themes/bikeTheme';

import RootLayout from '../Layouts/RootLayout';
import BaseLayout from '../Layouts/BaseLayout';
import StorageLayout from '../Layouts/StorageLayout';
import AdminLayout from '../Layouts/AdminLayout';
import BikesLayout from '../Layouts/BikesLayout';

import OrdersList from '../Components/Storage/OrdersList';
import OrderView from '../Components/Storage/OrderView';
import OrderEdit from '../Components/Storage/OrderEdit';
import QrScanner from '../Components/Storage/QrScanner';

import UsersList from '../Components/Admin/UsersList';
import UserEdit from '../Components/Admin/UserEdit';
import NewAnnouncement from '../Components/Admin/NewAnnouncement';

import StoragesList from '../Components/Admin/StoragesList';
import StorageEdit from '../Components/Admin/StorageEdit';
import AddStorage from '../Components/Admin/AddStorage';
import AddItem from '../Components/Storage/AddItem';

import PDFView from '../Components/Storage/PDFView';

import ProductDetails from '../Components/Default/ProductDetails';
import ShoppingCart from '../Components/Default/ShoppingCart/ShoppingCart';
import ContactsAndDelivery from '../Components/Default/ShoppingCart/ContactsAndDelivery';
import CartView from '../Components/Default/ShoppingCart/CartView';
import Confirmation from '../Components/Default/ShoppingCart/Confirmation';

import SignupLandingPage from '../Components/Default/Signup/SignupLandingPage';
import SignupPage from '../Components/Default/Signup/SignupPage';
import ContactPage from '../Components/Default/ContactPage';
import Stats from '../Components/Admin/Stats/Stats';
import BackgroundInfo from '../Components/Default/Backgroundinfo';
import Announcements from '../Components/Default/Announcements';
import DeliveryView from '../Components/DeliveryView';

import ForgotPassword from '../Components/Default/ResetPassword/ForgotPassword';
import ResetPassword from '../Components/Default/ResetPassword/ResetPassword';
import ResetSuccessful from '../Components/Default/ResetPassword/ResetSuccessful';
import LinkExpired from '../Components/Default/ResetPassword/LinkExpired';
import PasswordResetNavigate from '../Components/Default/ResetPassword/PasswordResetNavigate';

import InstructionsPage from '../Components/Default/Instructions/InstructionsPage';
import GuideCommon from '../Components/Default/Instructions/GuideCommon';
import GuideAccount from '../Components/Default/Instructions/GuideAccount';
import GuideOrdering from '../Components/Default/Instructions/GuideOrdering';
import GuideShipping from '../Components/Default/Instructions/GuideShipping';
import GuideBikes from '../Components/Default/Instructions/GuideBikes';

import ModifyBikeOrder from '../Components/Bikes/ModifyBikeOrder';
import BikesPage from '../Components/Bikes/BikesPage';
import Bikes from '../Components/Bikes/Bikes';
import BikeWarehouse from '../Components/Bikes/BikeWarehouse';
import BikePackets from '../Components/Bikes/BikePackets';
import BikeRentals from '../Components/Bikes/BikeRentals';
import ModifyBikePage from '../Components/Bikes/ModifyBikePage';

import {
    bikesPacketLoader,
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
    bikesDefaultLoader,
    bikesListLoader,
    bikeLoader,
    shoppingProcessLoader,
    bulletinSubjectLoader,
    modifyBikeOrderLoader,
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
    createBulletinAction,
    bikeOrderAction,
    confirmationAction,
    resetEmailAction,
    resetPasswordAction,
    modifyBikeAction,
} from './actions';

createStore({});

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
                // main routes
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
                            path: 'tilastot',
                            element: <Stats />,
                        },
                        {
                            path: '/ostoskori',
                            element: (
                                <StateMachineProvider>
                                    <ShoppingCart />
                                </StateMachineProvider>
                            ),
                            id: 'shoppingCart',
                            loader: shoppingProcessLoader,
                            children: [
                                {
                                    path: '/ostoskori/',
                                    element: <CartView />,
                                    action: async ({ request }) => cartViewAction(auth, setAuth, request),
                                },
                                {
                                    path: '/ostoskori/vaihe2',
                                    element: <ContactsAndDelivery />,
                                },
                                {
                                    path: '/ostoskori/vaihe3',
                                    element: <Confirmation />,
                                    action: async ({ request }) => confirmationAction(auth, setAuth, request),
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
                        {
                            path: 'unohtunutsalasana',
                            element: <ForgotPassword />,
                            action: async ({ request }) => resetEmailAction(auth, setAuth, request),
                        },
                        {
                            path: 'salasananpalautus',
                            element: <Outlet />,
                            children: [
                                {
                                    index: true,
                                    element: <ResetPassword />,
                                },
                                {
                                    path: 'salasanapalautettu',
                                    element: <ResetSuccessful />,
                                    action: async ({ request }) => resetPasswordAction(auth, setAuth, request),
                                },
                                {
                                    path: 'linkexpired',
                                    element: <LinkExpired />,
                                },
                                {
                                    path: ':uid/:token',
                                    element: <PasswordResetNavigate />,
                                },
                            ],
                        },
                    ],
                },
                // storage routes
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
                // admin routes
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
                            path: 'tiedotteet/luo',
                            element: <NewAnnouncement />,
                            loader: bulletinSubjectLoader,
                            action: async ({ request }) => createBulletinAction(auth, setAuth, request),
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
                                    id: 'users',
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
                    element: (
                        <ThemeProvider theme={bikeTheme}>
                            <BikesLayout />
                        </ThemeProvider>
                    ),
                    children: [
                        {
                            index: true,
                            element: <BikesPage />,
                            loader: bikesDefaultLoader,
                            action: async ({ request }) => bikeOrderAction(auth, setAuth, request),
                        },
                        {
                            path: 'pyoravarasto',
                            element: <BikeWarehouse />,
                            children: [
                                {
                                    index: true,
                                    loader: async () => bikesListLoader(auth, setAuth),
                                    element: <Bikes />,
                                },
                                {
                                    path: 'pyoratilaukset',
                                    element: <BikeRentals />,
                                },
                                {
                                    path: 'pyorapaketit',
                                    loader: async () => bikesPacketLoader(auth, setAuth),
                                    element: <BikePackets />,
                                },

                                {
                                    path: 'muokkaapaketti',
                                    element: <Outlet />,
                                    children: [
                                        {
                                            index: true,
                                            element: <Navigate to="/pyorat/pyoravarasto/muokkaapaketti" />,
                                        },
                                        {
                                            path: ':id',
                                            element: <ModifyBikeOrder />,
                                            loader: async ({ params }) => modifyBikeOrderLoader(auth, setAuth, params),
                                        },
                                    ],
                                },

                                {
                                    path: 'muokkaa',
                                    element: <Outlet />,
                                    children: [
                                        {
                                            index: true,
                                            element: <Navigate to="/pyorat/pyoravarasto" />,
                                        },
                                        {
                                            path: ':id',
                                            element: <ModifyBikePage />,
                                            loader: async ({ params }) => bikeLoader(auth, setAuth, params),
                                            action: async ({ request, params }) =>
                                                modifyBikeAction(auth, setAuth, request, params),
                                        },
                                    ],
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
