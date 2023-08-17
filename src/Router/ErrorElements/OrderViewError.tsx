import { Link } from 'react-router-dom';

import { Container, Link as MuiLink, Typography } from '@mui/material';

import SearchOffIcon from '@mui/icons-material/SearchOff';

import HeroHeader from '../../Components/HeroHeader';
import HeroText from '../../Components/HeroText';

const SuperLink = MuiLink as typeof MuiLink | typeof Link;

function HeroFooter() {
    return (
        <Typography>
            <SuperLink component={Link} to={-1 as unknown as string}>
                Palaa takaisin
            </SuperLink>{' '}
            |{' '}
            <SuperLink component={Link} to="/otayhteytta">
                Ota yhteyttä
            </SuperLink>
        </Typography>
    );
}

function OrderViewError() {
    return (
        <Container id="error-element" maxWidth="xl">
            <HeroHeader Icon={<SearchOffIcon />} />
            <HeroText title="Tilausnumeroa ei löytynyt." footer={<HeroFooter />} />
        </Container>
    );
}

export default OrderViewError;
