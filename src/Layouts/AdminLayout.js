import { Outlet } from 'react-router';
import Container from '@mui/material/Container';
import AdminBar from '../Components/AdminBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// admin Layout

function AdminLayout() {
    return (
        <div>
            <header>
                <Header />
                <AdminBar />
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

export default AdminLayout;
