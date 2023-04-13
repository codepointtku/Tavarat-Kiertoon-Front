import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

function AdminView() {
    const { auth } = useContext(AuthContext);

    return <main>{auth.admin ? <Outlet /> : <Navigate to="/" />}</main>;
}

export default AdminView;
