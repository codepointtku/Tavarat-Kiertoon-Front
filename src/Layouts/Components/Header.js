/* import { Button } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext'; */
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import logo from "../../Assets/Turku_vaaka_300ppi_viiva_white.png";

    // JTo: Commented while TestButtons are in use.
    // const { auth, setAuth } = useContext(AuthContext);
function Header() {
    return (
        <header style={{ backgroundColor: "#009bd8", marginBottom: 20}}>
                <Container>
                    <Link to="/">
                        <img src={logo} alt="Turku logo ja teksti valkoinen" style={{ width: 200 }} />
                    </Link>
                </Container>
        </header>
    )
}

/*
 * JTo: This is for TESTING page navigation and Auth Context.
 * Remove this when real Login and Navigation codes are done
 * @returns
 * 
function TestButtons() {
    const { auth, setAuth } = useContext(AuthContext);

    // admin, storage, user
    const loginUserButtonHandler = () => {
        const newAuth = { user: !auth.user, storage: false, admin: false };
        setAuth(newAuth);
    };
    const loginStorageButtonHandler = () => {
        const newAuth = { user: false, storage: !auth.storage, admin: false };
        setAuth(newAuth);
    };
    const loginAdminButtonHandler = () => {
        const newAuth = { user: false, storage: false, admin: !auth.admin };
        setAuth(newAuth);
    };

    return (
        <div>
            <hr />
            <Container maxWidth="sm">

                <div style={{ marginBottom: '5px' }}>
                    <b>Links to pages: </b>
                    <Link to="/">Home</Link> <Link to="/varasto/0/delivery?page=0&rows=5">Varasto</Link>{' '}
                    <Link to="/varasto/tilaus">Varasto/Tilaus</Link>{' '}
                    <Link to="/varasto/koodinlukija">Varasto/Koodinlukija</Link>
                    <br />
                    <Link to="/admin">Admin</Link> <Link to="/admin/user">Admin/Käyttäjä</Link>{' '}
                    <Link to="/admin/varastot">Admin/Varastot</Link>{' '}
                    <Link to="/admin/varastot/varasto">Admin/Varastot/Varasto</Link>{' '}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <b>Logins:</b>
                    <button
                        type="button"
                        onClick={loginUserButtonHandler}
                        style={{
                            marginLeft: '5px',
                            marginRight: '5px',
                            background: auth.user ? 'lightgreen' : 'lightsalmon',
                        }}
                    >
                        Käyttäjä: {auth.user ? 'Log Out' : 'Log In'}
                    </button>
                    <button
                        type="button"
                        onClick={loginStorageButtonHandler}
                        style={{ marginRight: '5px', background: auth.storage ? 'lightgreen' : 'lightsalmon' }}
                    >
                        Varasto: {auth.storage ? 'Log Out' : 'Log In'}
                    </button>
                    <button
                        type="button"
                        onClick={loginAdminButtonHandler}
                        style={{ background: auth.admin ? 'lightgreen' : 'lightsalmon' }}
                    >
                        Admin: {auth.admin ? 'Log Out' : 'Log In'}
                    </button>
                </div>
            </Container>
            <hr />
        </div>
    );
}

*/

export default Header;
