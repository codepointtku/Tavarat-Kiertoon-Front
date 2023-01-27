import PropTypes from 'prop-types';
import { useLoaderData } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminBar from '../Components/AdminBar';
import Storages from '../Components/Storages';

// admin Layout

function Admin({ children }) {
    const loader = useLoaderData();
    return (
        <>
            <Header />
            <AdminBar />
            <Storages storages={loader} />
            {console.log(loader)}
            <main>{children}</main>
            <Footer />
        </>
    );
}

Admin.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Admin;
