import { Outlet } from 'react-router';
import { useContext } from 'react';

import AuthContext from '../Context/AuthContext';

function DefaultView() {
    /* eslint-disable-next-line */
    const { auth } = useContext(AuthContext);

    return <Outlet />;
}

export default DefaultView;
