import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../Context/AuthContext';

export default function BikesView() {
    const { auth } = useContext(AuthContext);

    return auth.admin ? <Outlet /> : <Navigate to="/" />;
}
