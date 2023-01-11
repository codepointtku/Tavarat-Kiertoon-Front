import { useEffect } from 'react';
import { redirect } from 'react-router-dom';

function AdminView() {
    // replace this with authcontext later
    const auth = { admin: true, storage: true };

    useEffect(() => {
        if (!auth.admin) {
            return redirect('/tavaratkiertoon');
        }
        return null;
    }, [auth]);

    return <div>ToniPal juo energiavettä!</div>;
}

export default AdminView;
