
import { Outlet } from 'react-router-dom';
import DefaultAppBar from '../Components/AppBar/Default/DefaultAppBar';

// default Layout
function BaseLayout() {
    return (
        <>
            <DefaultAppBar />
            <Outlet />
        </>
    );

}

export default BaseLayout;
