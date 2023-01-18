import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function StorageView() {
    const navigate = useNavigate();

    // replace this with authcontext later
    const auth = { admin: true, storage: true };

    useEffect(() => {
        if (!auth.storage) {
            navigate('/tavaratkiertoon');
        }
    }, [auth]);

    return (
        <>
            <Button variant="contained">Varastonäkymä (tää on testinappula, poista myöhemmin)</Button>
            <Outlet />
        </>
    );
}

export default StorageView;
