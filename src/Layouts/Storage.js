import PropTypes from 'prop-types';
// import Container from '@mui/material/Container';

import Header from './Components/Header';
import StorageBar from '../Components/StorageBar';
import Footer from './Components/Footer';

// storage Layout

function Storage({ children }) {
    return (
        <>
            <Header />
            <StorageBar />
            {/* <Container> */}
            <main>{children}</main>
            {/* </Container> */}
            <Footer />
        </>
    );
}

Storage.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Storage;
