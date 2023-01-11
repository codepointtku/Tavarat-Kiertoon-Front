import { useEffect } from 'react';
import { redirect, Outlet } from 'react-router-dom';

function StorageView() {
    // replace this with authcontext later
    const auth = { admin: false, storage: false };

    useEffect(() => {
        if (!auth.storage) {
            return redirect('/tavaratkiertoon');
        }
        return null;
    }, [auth]);

    return (
        <main>
            <Outlet />
        </main>
    );
}

export default StorageView;
