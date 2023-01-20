import { Outlet } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

function DefaultView() {
    const { auth } = useContext(AuthContext);
    console.log('Auth', auth); // JTo: console log to get rid of ESLint error. Remove once context is taken into use

    return <Outlet />;
}

export default DefaultView;
