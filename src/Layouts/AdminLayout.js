import { Outlet } from 'react-router';
import AdminBar from '../Components/AdminBar';

// admin Layout

function AdminLayout() {
    return (
        <>
            <AdminBar />
            <Outlet />
        </>
    );
}

export default AdminLayout;
