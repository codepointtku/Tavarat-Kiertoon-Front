import { useContext, useMemo } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router-dom';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { ThemeProvider } from '@mui/material';

import AuthContext from '../Context/AuthContext';
// import ErrorBoundary from './ErrorBoundary_NewStash';
import ErrorBoundary from './ErrorBoundary';
import BaseBoundary from './BaseBoundary';
// import AdminViewBoundary from './AdminViewBoundary';
// import UserError from './ErrorElements/UserError';

import HasRole from '../Utils/HasRole';

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

import Overview from '../Components/Admin/Panel/Overview/Overview';
import OrdersGrid from '../Components/Admin/OrdersGrid';
import AdminOrderEdit from '../Components/Admin/AdminOrderEdit';
import AdminOrderCreate from '../Components/Admin/AdminOrderCreate';
import ProductsGrid from '../Components/Admin/ProductsGrid';
import AdminProductEdit from '../Components/Admin/AdminProductEdit';
import AdminProductCreate from '../Components/Admin/AdminProductCreate';
import AdminOrderEmailList from '../Components/Admin/AdminOrderEmailList';

import AdminInbox from '../Components/Admin/AdminInbox';

import UsersList from '../Components/Admin/UsersList';
import UserEdit from '../Components/Admin/UserEdit';
import UserAddressEdit from '../Components/Admin/UserAddressEdit';
import UserAddressCreate from '../Components/Admin/UserAddressCreate';

import BulletinPosts from '../Components/Admin/BulletinPosts';
import BulletinPostCreate from '../Components/Admin/BulletinPostCreate';
import ModifyBulletinPost from '../Components/Admin/ModifyBulletinPost';

import Stats from '../Components/Admin/Stats/Stats';

import StoragesList from '../Components/Admin/StoragesList';
import StorageEdit from '../Components/Admin/StorageEdit';
import StorageDelete from '../Components/Admin/StorageDelete';
import StorageCreate from '../Components/Admin/StorageCreate';
import StorageProductsTransfer from '../Components/Admin/StorageProductsTransfer';
import StorageProductsHandleItemsTransfer from '../Components/Admin/StorageProductsHandleItemsTransfer';

import AddItem from '../Components/Storage/AddItem';
import PDFView from '../Components/Storage/PDFView';

import ProductDetails from '../Components/Default/ProductDetails';
import ShoppingCart from '../Components/Default/ShoppingCart/ShoppingCart';
import ContactsAndDelivery from '../Components/Default/ShoppingCart/ContactsAndDelivery';
import CartView from '../Components/Default/ShoppingCart/CartView';
import Confirmation from '../Components/Default/ShoppingCart/Confirmation';

import SignupLandingPage from '../Components/Default/Signup/SignupLandingPage';
import SignupPage from '../Components/Default/Signup/SignupPage';
import Activation from '../Components/Default/Signup/Activation';
import EmailChangeSuccessful from '../Components/EmailChangeSuccessful';
import ChangeEmail from '../Components/ChangeEmail';

import UserProfilePage from '../Components/Default/Profilepage/UserProfilePage';
import OrderPage from '../Components/Default/Profilepage/OrderPage';
import ProfileInfo from '../Components/Default/Profilepage/ProfileInfo';
import ModifyAddressInfo from '../Components/Default/Profilepage/ModifyAddressInfo';
import OrdersHistory from '../Components/Default/Profilepage/OrdersHistory';
import OrdersActive from '../Components/Default/Profilepage/OrdersActive';

import ContactPage from '../Components/Default/ContactPage';
import Bulletins from '../Components/Default/BulletinsPage';
import DeliveryView from '../Components/DeliveryView';
import BgInfo from '../Components/Default/BgInfo';

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

import ModifyBikePacket from '../Components/Bikes/ModifyBikePacket';
import BikesPage from '../Components/Bikes/BikesPage';
import Bikes from '../Components/Bikes/Bikes';
import BikeWarehouse from '../Components/Bikes/BikeWarehouse';
import BikePackets from '../Components/Bikes/BikePackets';
import BikeRentals from '../Components/Bikes/BikeRentals';
import ModifyBikePage from '../Components/Bikes/ModifyBikePage';
import BikeModels from '../Components/Bikes/BikeModels';
import ModifyBikeModelPage from '../Components/Bikes/ModifyBikeModelPage';

import {
    bikesPacketLoader,
    addItemLoader,
    orderEditLoader,
    ordersListLoader,
    orderViewLoader,
    pdfViewLoader,
    productDetailsLoader,
    productListLoader,
    productTransferLoader,
    rootLoader,
    storagesListLoader,
    storageEditLoader,
    userEditLoader,
    userAddressEditLoader,
    userAddressCreateLoader,
    usersListLoader,
    userInfoLoader,
    shoppingCartLoader,
    bikesDefaultLoader,
    bikesListLoader,
    modifyBikeLoader,
    createNewBikeLoader,
    bikeModelsLoader,
    bikeSingleModelLoader,
    shoppingProcessLoader,
    modifyBikePacketLoader,
    adminLoader,
    adminInboxLoader,
    emailRecipientsLoader,
    bikeNewModelLoader,
    createBikePacketLoader,
    createBulletinLoader,
} from './loaders';

import {
    userSignupAction,
    contactAction,
    orderEditAction,
    storageEditAction,
    storageCreateAction,
    storageDeleteAction,
    productsTransferAction,
    frontPageActions,
    userEditAction,
    adminUserAddressEditAction,
    adminUserAddressCreateAction,
    cartViewAction,
    createBulletinAction,
    bikeOrderAction,
    confirmationAction,
    resetEmailAction,
    resetPasswordAction,
    modifyBikeAction,
    createNewBikeAction,
    activationAction,
    adminLogOut,
    modifyBikePacketAction,
    deleteBikeAction,
    adminInboxAction,
    modifyBikeModelAction,
    createBikeModelAction,
    deleteBikeModelAction,
    emailChangeSuccessfulAction,
    changeEmailAction,
    adminBulletinsAction,
    adminEmailRecipientsAction,
    createNewPacketAction,
    deletePacketAction,
    userProfilePageAction,
    modifyUserAddressesAction,
} from './actions';

import useLoginAxiosInterceptor from '../Utils/useLoginAxiosInterceptor';
import { getRandomInt } from '../Utils/getRandomInt';

import BikesHomePage from '../Components/Bikes/BikesHomePage';

createStore({});

function Routes() {
    const { auth, setAuth } = useContext(AuthContext);

    useLoginAxiosInterceptor();

    const router = useMemo(
        () =>
            createBrowserRouter([
                {
                    path: '/',
                    element: <RootLayout />,
                    errorElement: <ErrorBoundary />,
                    id: 'root',
                    loader: rootLoader,
                    // Loads data only at first page load, not with every route
                    shouldRevalidate: ({ currentUrl }) => {
                        return (
                            currentUrl.pathname === '/admin/tiedotteet' ||
                            currentUrl.pathname === '/admin/tiedotteet/' ||
                            currentUrl.pathname === '/admin/tiedotteet/luo'
                        );
                    },
                    children: [
                        // main routes
                        {
                            path: '/',
                            element: <BaseLayout />,
                            errorElement: <BaseBoundary />,
                            id: 'frontPage',
                            loader: shoppingCartLoader,
                            action: frontPageActions,
                            children: [
                                {
                                    index: true,
                                    element: <DefaultView />,
                                    id: 'products',
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
                                            errorElement: <BaseBoundary />,
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
                                    element: <BgInfo />,
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
                                            action: cartViewAction,
                                        },
                                        {
                                            path: '/ostoskori/vaihe2',
                                            element: <ContactsAndDelivery />,
                                        },
                                        {
                                            path: '/ostoskori/vaihe3',
                                            element: <Confirmation />,
                                            action: confirmationAction,
                                        },
                                    ],
                                },
                                {
                                    path: '/tiedotteet',
                                    element: <Bulletins />,
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
                                            action: async ({ request }) => userSignupAction(request),
                                        },
                                        {
                                            path: 'toimipaikka',
                                            element: <SignupPage isLocationForm />,
                                            action: async ({ request }) => userSignupAction(request),
                                        },
                                    ],
                                },
                                {
                                    path: 'otayhteytta',
                                    element: <ContactPage />,
                                    action: async ({ request }) => contactAction(auth, setAuth, request),
                                },
                                {
                                    path: 'sahkopostinvaihto',
                                    element: <ChangeEmail />,
                                    action: async ({ request }) => changeEmailAction(auth, setAuth, request),
                                },
                                {
                                    path: 'emailvaihto/:uid/:token/:newEmail',
                                    element: <EmailChangeSuccessful />,
                                    action: async ({ request }) => emailChangeSuccessfulAction(auth, setAuth, request),
                                },
                                {
                                    path: 'salasananvaihto',
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
                                {
                                    path: 'aktivointi/:uid/:token',
                                    element: <Activation />,
                                    action: async ({ request }) => activationAction(auth, setAuth, request),
                                },
                                {
                                    path: 'profiili',
                                    element: <UserProfilePage />,
                                    id: 'profile',
                                    loader: async ({ request }) => userInfoLoader(request),
                                    action: async ({ request }) => userProfilePageAction(request),
                                    children: [
                                        {
                                            index: true,
                                            element: <ProfileInfo />,
                                        },
                                        {
                                            path: 'osoitetiedot/:id',
                                            element: <ModifyAddressInfo />,
                                            action: async ({ request }) => modifyUserAddressesAction(request),
                                        },
                                        {
                                            path: 'aktiivisettilaukset',
                                            element: <OrdersActive />,
                                        },
                                        {
                                            path: 'tilaushistoria',
                                            element: <OrdersHistory />,
                                        },
                                    ],
                                },
                                {
                                    path: 'profiili/:tilaustila/tilaus/:id',
                                    element: <OrderPage />,
                                },
                            ],
                        },
                        // storage routes
                        {
                            path: 'varasto',
                            element: (
                                <HasRole role="storage_group" fallback={<Navigate to="/" />}>
                                    <ThemeProvider theme={storageTheme}>
                                        <StorageLayout />
                                    </ThemeProvider>
                                </HasRole>
                            ),
                            errorElement: (
                                <ThemeProvider theme={storageTheme}>
                                    <ErrorBoundary />
                                </ThemeProvider>
                            ),
                            children: [
                                {
                                    index: true,
                                    // path: ':num/:view',
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
                                                    loader: async ({ params }) =>
                                                        orderViewLoader(auth, setAuth, params),
                                                },
                                                {
                                                    path: 'muokkaa',
                                                    element: <OrderEdit />,
                                                    action: async ({ request, params }) =>
                                                        orderEditAction(auth, setAuth, request, params),
                                                    loader: async ({ params }) =>
                                                        orderEditLoader(auth, setAuth, params),
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
                                <HasRole role="admin_group" fallback={<Navigate to="/" />}>
                                    <ThemeProvider theme={adminTheme}>
                                        <AdminLayout />
                                    </ThemeProvider>
                                </HasRole>
                            ),
                            id: 'admin',
                            // errorElement: (
                            //     <ThemeProvider theme={adminTheme}>
                            //         <AdminViewBoundary />,
                            //     </ThemeProvider>
                            // ),
                            loader: adminLoader,
                            action: adminLogOut,
                            children: [
                                {
                                    index: true,
                                    element: <Overview />,
                                },
                                {
                                    path: 'tilastot',
                                    element: <Stats />,
                                },
                                {
                                    path: 'tilaukset',
                                    element: <Outlet />,
                                    children: [
                                        {
                                            index: true,
                                            element: <OrdersGrid />,
                                            loader: ordersListLoader,
                                        },
                                        {
                                            path: ':id',
                                            element: <AdminOrderEdit />,
                                        },
                                        {
                                            path: 'uusi',
                                            element: <AdminOrderCreate />,
                                        },
                                        {
                                            path: 'sahkopostilista',
                                            element: <AdminOrderEmailList />,
                                            loader: emailRecipientsLoader,
                                            action: adminEmailRecipientsAction,
                                        },
                                    ],
                                },
                                {
                                    path: 'tuotteet',
                                    element: <Outlet />,
                                    children: [
                                        {
                                            index: true,
                                            element: <ProductsGrid />,
                                            loader: productListLoader,
                                        },
                                        {
                                            path: ':id',
                                            element: <AdminProductEdit />,
                                            // loader: productDetailsLoader,
                                            // action: undefined,
                                        },
                                        {
                                            path: 'uusi',
                                            element: <AdminProductCreate />,
                                            // loader: undefined,
                                            // action: undefined,
                                        },
                                    ],
                                },
                                {
                                    path: 'kayttajat',
                                    element: <Outlet />,
                                    children: [
                                        {
                                            index: true,
                                            element: <UsersList />,
                                            // errorElement: <UserError />,
                                            id: 'kayttajat',
                                            loader: usersListLoader,
                                        },
                                        {
                                            path: ':userid',
                                            element: <UserEdit />,
                                            // errorElement: <UserError />,
                                            loader: userEditLoader,
                                            action: userEditAction,
                                        },
                                        {
                                            path: ':userid/osoitteet/:aid',
                                            element: <UserAddressEdit />,
                                            // errorElement: <UserError />,
                                            loader: userAddressEditLoader,
                                            action: adminUserAddressEditAction,
                                        },
                                        {
                                            path: ':userid/osoitteet/luo',
                                            element: <UserAddressCreate />,
                                            // errorElement: <UserError />,
                                            loader: userAddressCreateLoader,
                                            action: adminUserAddressCreateAction,
                                        },
                                    ],
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
                                        {
                                            path: ':id/poista',
                                            element: <StorageDelete randomInt={getRandomInt()} />,
                                            loader: storageEditLoader,
                                            action: storageDeleteAction,
                                        },
                                        {
                                            path: ':id/siirto',
                                            element: <StorageProductsTransfer />,
                                            loader: productTransferLoader,
                                            action: productsTransferAction,
                                        },
                                        {
                                            path: ':id/siirtotemp',
                                            element: <StorageProductsHandleItemsTransfer />,
                                            loader: productTransferLoader,
                                            action: productsTransferAction,
                                        },
                                        {
                                            path: 'luo',
                                            element: <StorageCreate />,
                                            action: storageCreateAction,
                                        },
                                    ],
                                },
                                {
                                    path: 'tiedotteet',
                                    element: <BulletinPosts />,
                                    action: adminBulletinsAction,
                                },
                                {
                                    path: 'tiedotteet/:id/muokkaa',
                                    element: <ModifyBulletinPost />,
                                },
                                {
                                    path: 'tiedotteet/luo',
                                    element: <BulletinPostCreate />,
                                    loader: createBulletinLoader,
                                    action: createBulletinAction,
                                },
                                {
                                    path: ':saapuneet',
                                    element: <AdminInbox />,
                                    loader: adminInboxLoader,
                                    action: adminInboxAction,
                                },
                            ],
                        },
                        // bikes routes
                        {
                            path: 'pyorat',
                            element: (
                                <HasRole role="bicycle_group" fallback={<Navigate to="/" />}>
                                    <ThemeProvider theme={bikeTheme}>
                                        <BikesLayout />
                                    </ThemeProvider>
                                </HasRole>
                            ),
                            children: [
                                {
                                    index: true,
                                    element: <BikesPage />,
                                    loader: async () => bikesDefaultLoader(auth, setAuth),
                                    action: async ({ request }) => bikeOrderAction(auth, setAuth, request),
                                },
                                {
                                    path: 'pyoravarasto',
                                    element: <BikeWarehouse />,
                                    children: [
                                        {
                                            index: 'true',
                                            element: <BikesHomePage />,
                                        },
                                        {
                                            path: 'pyoralista',
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
                                                    element: <ModifyBikePacket createNewPacket={false} />,
                                                    loader: async ({ params }) =>
                                                        modifyBikePacketLoader(auth, setAuth, params),
                                                    action: async ({ request, params }) =>
                                                        modifyBikePacketAction(request, params),
                                                    children: [
                                                        {
                                                            path: 'poista',
                                                            action: async ({ params }) => deletePacketAction(params),
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            path: 'lisaapaketti',
                                            element: <ModifyBikePacket createNewPacket={true} />,
                                            loader: async ({ params }) => createBikePacketLoader(auth, setAuth, params),
                                            action: async ({ request, params }) =>
                                                createNewPacketAction(request, params),
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
                                                    element: <ModifyBikePage createNewBike={false} />,
                                                    loader: async ({ params }) =>
                                                        modifyBikeLoader(auth, setAuth, params),
                                                    action: async ({ request, params }) =>
                                                        modifyBikeAction(auth, setAuth, request, params),
                                                    children: [
                                                        {
                                                            path: 'poista',
                                                            action: async ({ params }) =>
                                                                deleteBikeAction(auth, setAuth, params),
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            path: 'lisaa',
                                            element: <ModifyBikePage createNewBike={true} />,
                                            loader: async () => createNewBikeLoader(auth, setAuth),
                                            action: async ({ request }) => createNewBikeAction(auth, setAuth, request),
                                        },
                                        {
                                            path: 'pyoramallit',
                                            element: <BikeModels />,
                                            loader: async () => bikeModelsLoader(auth, setAuth),
                                        },
                                        {
                                            path: 'muokkaapyoramalli',
                                            element: <Outlet />,
                                            children: [
                                                {
                                                    index: true,
                                                    element: <Navigate to="pyorat/pyoravarasto/pyoramallit" />,
                                                },
                                                {
                                                    path: ':id',
                                                    element: <ModifyBikeModelPage createNewBikeModel={false} />,
                                                    loader: async ({ params }) =>
                                                        bikeSingleModelLoader(auth, setAuth, params),
                                                    action: async ({ request, params }) =>
                                                        modifyBikeModelAction(auth, setAuth, request, params),
                                                    children: [
                                                        {
                                                            path: 'poista',
                                                            action: async ({ params }) =>
                                                                deleteBikeModelAction(auth, setAuth, params),
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            path: 'lisaapyoramalli',
                                            element: <ModifyBikeModelPage createNewBikeModel={true} />,
                                            loader: async ({ params }) => bikeNewModelLoader(auth, setAuth, params),
                                            action: async ({ request, params }) =>
                                                createBikeModelAction(auth, setAuth, request, params),
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ]),
        []
    );

    return <RouterProvider router={router} />;
}

export default Routes;
