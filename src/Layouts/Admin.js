import PropTypes from 'prop-types';

import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminBar from '../Components/AdminBar';

// admin Layout

function Admin({ children }) {
    return (
        <>
            <Header />
            <AdminBar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

Admin.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Admin;
