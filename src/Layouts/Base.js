import PropTypes from 'prop-types';

import { Container, Stack } from '@mui/material';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DefaultAppBar from '../Components/AppBar/Default/DefaultAppBar';

// default Layout

function Base({ children }) {
    return (
        <Stack sx={{ minHeight: ['100vh', '100svh'] }}>
            <Header />
            <DefaultAppBar />
            <Container maxWidth="xl" sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <main>{children}</main>
            </Container>
            <Footer />
        </Stack>
    );
}

Base.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Base;
