import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DefaultAppBar from '../Components/AppBar/Default/DefaultAppBar';

// default Layout

function Base({ children }) {
    return (
        <>
            <Header />
            <DefaultAppBar />
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
