import { Outlet } from 'react-router';
import StorageBar from '../Components/StorageBar';
import Header from './Components/Header';
import Footer from './Components/Footer';

// storage Layout
function StorageLayout() {
    return (
        <div>
            <header>
                <Header />
                <StorageBar />
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

export default StorageLayout;
