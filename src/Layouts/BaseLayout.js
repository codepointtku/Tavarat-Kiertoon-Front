import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import DefaultAppBar from '../Components/AppBar/Default/DefaultAppBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// default Layout
function BaseLayout() {
    return (
        <div>
            <header>
                <Header />
                <DefaultAppBar />
            </header>
            <main>
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default BaseLayout;
