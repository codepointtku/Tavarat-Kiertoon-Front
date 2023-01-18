import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function AdminView() {
    const navigate = useNavigate();

    // replace this with authcontext later
    const auth = { admin: true, storage: true };

    useEffect(() => {
        if (!auth.admin) {
            navigate('/tavaratkiertoon');
        }
    }, [auth]);

    return (
        <>
            <div>Extra admin navbar will ne here</div>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default AdminView;
