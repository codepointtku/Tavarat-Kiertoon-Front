import { Button } from '@mui/material';
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

function StorageView() {
    const { auth } = useContext(AuthContext);

    return (
        <>
            <Button>Varastonäkymä (tää on testinappula, poista myöhemmin)</Button>
            {auth.storage ? <Outlet /> : <Navigate to="/" />}
        </>
    );
}

export default StorageView;
