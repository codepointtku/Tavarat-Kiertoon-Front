import { Outlet } from 'react-router';
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
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default AdminLayout;
