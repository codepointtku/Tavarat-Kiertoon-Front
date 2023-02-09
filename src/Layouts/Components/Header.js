// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box } from '@mui/material';
// import AuthContext from '../../Context/AuthContext';
import logo from '../../Assets/Turku_vaaka_300ppi_viiva_white.png';
import TestButtons from '../../Components/TestButtons';

// const { auth, setAuth } = useContext(AuthContext);

function Header() {
    return (
        <header>
            <Box sx={{ backgroundColor: 'primary.main' }}>
                <Container sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Link to="/">
                        <img src={logo} alt="Turku logo ja teksti valkoinen" style={{ width: 200 }} />
                    </Link>
                    <TestButtons />
                </Container>
            </Box>
        </header>
    );
}

export default Header;
