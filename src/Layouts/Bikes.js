import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DefaultAppBar from '../Components/AppBar/Default/DefaultAppBar';

export default function Bikes({ children }) {
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

Bikes.propTypes = {
    children: PropTypes.element.isRequired,
};
