import PropTypes from 'prop-types';
import Header from './Components/Header';
import Footer from './Components/Footer';

// default Layout

function Base({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

Base.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Base;
