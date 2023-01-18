import { Outlet } from 'react-router';

function DefaultView() {
    return (
        <>
            <h1>Tavarat Kiertoon</h1>
            <div>tähän komponentteja, ei divejä yms</div>
            <Outlet />
        </>
    );
}

export default DefaultView;
