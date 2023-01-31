import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import AuthContext from '../Context/AuthContext';

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
            <Container maxWidth="md">
                <div style={{ marginBottom: '5px' }}>
                    <b>Links to pages: </b>
                    <Link to="/">Home --- </Link> <Link to="/varasto/0/delivery?page=0&rows=5">Varasto --- </Link>
                    <Link to="/varasto/koodinlukija">Varasto/Koodinlukija --- </Link>
                    <br />
                    <Link to="/admin">Admin --- </Link> <Link to="/admin/users?page=0&rows=5">/Käyttäjä --- </Link>
                    <Link to="/admin/varastot">/Varastot --- </Link>
                    <Link to="/admin/varastot/varasto">/Varastot/Varasto --- </Link>
                    <Link to="/stats">Stats --- </Link>
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
        </div>
    );
}

export default TestButtons;
