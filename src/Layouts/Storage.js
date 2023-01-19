import PropTypes from 'prop-types';
import { Button } from '@mui/material';

import Header from './Components/Header';
import Footer from './Components/Footer';

// storage Layout

function Storage({ children }) {
    return (
        <>
            <Header />
            <Button>What</Button>
            <main>{children}</main>
            <Footer />
        </>
    );
}

Storage.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Storage;
