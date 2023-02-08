import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function Bikes({ children }) {
    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <main>{children}</main>
            </Container>
            <Footer />
        </>
    );
}

Bikes.propTypes = {
    children: PropTypes.element.isRequired,
};
