import { Outlet } from 'react-router';
import StorageBar from '../Components/StorageBar';

// storage Layout
function StorageLayout() {
    return (
        <>
            <StorageBar />
            <Outlet />
        </>
    );
}

export default StorageLayout;
