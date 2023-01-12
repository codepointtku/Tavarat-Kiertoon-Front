import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminView() {
    const navigate = useNavigate();

    // replace this with authcontext later
    const auth = { admin: true, storage: true };

    useEffect(() => {
        if (!auth.admin) {
            navigate('/tavaratkiertoon');
        }
    }, [auth]);

    return <div>ToniPal juo energiavettä!</div>;
}

export default AdminView;
