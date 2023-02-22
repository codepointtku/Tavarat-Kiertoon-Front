import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

function RootLayout() {
    return (
        <div>
            <header>
                <Header />
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

export default RootLayout;
