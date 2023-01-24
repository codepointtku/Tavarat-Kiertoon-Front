import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Header from './Components/Header';
import Footer from './Components/Footer';
import StickyNavigationBar from '../Components/StickyNavigationBar';

// default Layout

function Base({ children }) {
    return (
        <>
            <Header />
            <StickyNavigationBar />
            <Container maxWidth="lg">
                <main>{children}</main>
            </Container>
            <Footer />
        </>
    );
}

Base.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Base;
