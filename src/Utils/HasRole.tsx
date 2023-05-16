import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

import type { Role } from '../App';

interface Props {
    role: Role;
    fallback?: JSX.Element | null;
    children?: JSX.Element | null;
}

function HasRole({ children = null, role, fallback = null }: Props) {
    const { auth } = useContext(AuthContext);

    // console.log('käytiin hasrole');
    // console.log(auth);
    return auth[role] ? children : fallback;
}

// tyypit inline:

// function HasRole({
//     children = null,
//     role,
//     fallback = null,
// }: React.PropsWithChildren<{ role: string; fallback?: React.ReactNode }>) {
//     const { auth } = useContext(AuthContext);

//     return <>{auth[role] ? children : fallback}</>;
// }

export default HasRole;
