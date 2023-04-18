/* eslint-disable */

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Avatar, Box, Container, Grid, Link as MuiLink, Tab, Tabs, Typography } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import BackButton from '../../BackButton';

function Ordering() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Tuotteiden hakeminen ja lisääminen koriin
            </Typography>
            <Typography>
                Tuotteita selataan, ja haetaan{' '}
                <MuiLink component={Link} to="/">
                    Etusivulta,{' '}
                </MuiLink>
                vasemmasta sivupalkista löytyvien kategorioiden avulla, tai hakukenttään kirjoittamalla sanahaulla.
            </Typography>
            <Typography variant="body2" gutterBottom>
                Tuotteen yksityiskohtaisemmat tiedot ja lisäkuvat löytyvät tuotekorttia napauttamalla.
            </Typography>
            <Typography gutterBottom>
                Tilataksesi tuotteita sinun tulee{' '}
                <MuiLink component={Link} to="/signup">
                    {' '}
                    rekisteröityä järjestelmään
                </MuiLink>
                .
            </Typography>
            <Typography gutterBottom>
                Voit lisätä tuotteita ostoskoriin suoraan tuotekortilla olevasta "Lisää koriin"-painikkeesta.
            </Typography>
            <Typography gutterBottom>
                Tuotteen lisäys ostoskoriin onnistuu myös tuotteen yksityiskohtaisemmasta näkymästä.
            </Typography>
            <Typography gutterBottom>
                Kun olet löytänyt tarvitsemasi tuotteet, ja lisännyt ne ostoskoriisi, mene omaan ostoskoriisi sivuston
                yläpalkista löytyvästä Ostoskori <ShoppingCartOutlinedIcon fontSize="24" /> -painikkeesta.
            </Typography>
            <Typography variant="body2" gutterBottom>
                Voit tarkastella ja muokata korisi sisältöä. Kun olet valmis, napauta "Siirry kassalle".
            </Typography>
            <Typography variant="h5" color="primary.main">
                Tuotteiden tilaaminen
            </Typography>
            <Typography gutterBottom>Lisää ohje steppejä.</Typography>
            <Typography gutterBottom>Lisää tekstiä</Typography>
        </>
    );
}

function Shipping() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Tilaaminen
            </Typography>
            <Typography gutterBottom>Ohjeita</Typography>
            <Typography gutterBottom variant="body2">
                Ohjeita
            </Typography>
            <Typography gutterBottom>Ohjeita</Typography>
            <Typography gutterBottom variant="body2">
                Ohjeita
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Ohjeita
            </Typography>
            <Typography gutterBottom>Mitäs sit?</Typography>
            <Typography gutterBottom variant="body2">
                Toimitusjohtajamme tuovat sinulle suklaata ja kukkia, kun varastomiehet toimittavat jakkarasi perille.
            </Typography>
        </>
    );
}

function Hero() {
    return (
        <>
            <Grid container>
                <Grid item xs={6} md={6} mt={2} mb={2}>
                    <BackButton />
                </Grid>
                <Grid item xs={6} md={6} mt={2} mb={2}>
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.dark',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <ShoppingCartCheckoutIcon fontSize="large" />
                    </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" color="primary.main" mb={2}>
                    Tilaaminen & Kuljetus
                </Typography>

                <Typography variant="subtitle2">
                    Alla on ohjeet tilaamiseen, sekä tietoa kuljetuksesta. Jos etsimäsi tietoa ei löydy tästä tai{' '}
                    <MuiLink component={Link} to="/ohjeet">
                        Ohje
                    </MuiLink>
                    -sivulta, voit olla meihin yhteydessä{' '}
                    <MuiLink component={Link} to="/otayhteytta">
                        täältä
                    </MuiLink>
                    .
                </Typography>
            </Box>
        </>
    );
}

function TabPage(props) {
    const { children, value, name, ...other } = props;

    return (
        <Box mt={2} hidden={value !== name} id={`tabpage-${name}`} aria-labelledby={`tab-${name}`} {...other}>
            {value === name && children}
        </Box>
    );
}

TabPage.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

function tabProps(value) {
    return {
        id: `tab-${value}`,
        'aria-controls': `tabpanel-${value}`,
        value,
        component: Link,
        to: `/ohjeet/tilaus/${value}`,
        replace: true,
    };
}

function TitleTabs() {
    const params = useParams();
    const value = params.value ?? 'tilaaminen';

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs centered value={value} aria-label="title tabs">
                    <Tab label="Tilaaminen" {...tabProps('tilaaminen')} icon={<ShoppingCartCheckoutIcon />} />
                    <Tab label="Kuljetus" {...tabProps('kuljetus')} icon={<LocalShippingIcon />} />
                </Tabs>
            </Box>
            <TabPage value={value} name="tilaaminen">
                <Ordering />
            </TabPage>
            <TabPage value={value} name="kuljetus">
                <Shipping />
            </TabPage>
        </Box>
    );
}

function GuideOrdering() {
    return (
        <Container maxWidth="lg">
            <Hero />
            <TitleTabs />
        </Container>
    );
}

export default GuideOrdering;
