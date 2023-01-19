import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

function AdminView() {
    const { auth } = useContext(AuthContext);

    return (
        <>
            <div>Extra admin navbar will ne here</div>
            <main>{auth.admin ? <Outlet /> : <Navigate to="/" />}</main>
        </>
    );
}

export default AdminView;
