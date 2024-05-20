import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Box, Container, Link as MuiLink, Tab, Tabs, Typography } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

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
            <Typography gutterBottom>
                Tuotteen yksityiskohtaisemmat tiedot ja lisäkuvat löytyvät tuotekorttia napauttamalla.
            </Typography>
            <Typography gutterBottom>
                Tilataksesi tuotteita sinun tulee{' '}
                <MuiLink component={Link} to="/rekisteroidy">
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
            <Typography gutterBottom>
                Voit tarkastella ja muokata korisi sisältöä. Kun olet valmis, napauta "Siirry kassalle".
            </Typography>
            <Typography variant="h5" color="primary.main">
                Tuotteiden tilaaminen
            </Typography>
            <Typography gutterBottom>
                Voit hakea tavaroita tuotteet -sivun yläreunassa olevan hakutoiminnon avulla mm. tuotenimikkeen,
                materiaalin tai värin perusteella. Voit myös yhdistellä eri hakusanoja mielesi mukaan.
            </Typography>
            <Typography gutterBottom>
                Voit tilata tuotteita vain, jos olet rekisteröitynyt järjestelmään. Selailu- ja hakutoiminnot ovat
                avoimia kaikille ja ne toimivat ilman rekisteröitymistä
            </Typography>
            <Typography gutterBottom>
                Lisää tuote ostoskoriin klikkaamalla tuotekortilla olevaa ”lisää koriin” -painiketta tai tuotteen
                yksityiskohtaisempaa näkymää.
            </Typography>
            <Typography gutterBottom>
                Ostoskorissa näet kaikki valitsemasi tuotteet, voit vielä tarkistaa ne ja muokata ostoskorisi sisältöä.
            </Typography>
            <Typography gutterBottom>
                Pääset jatkamaan tilauksen tekemistä klikkaamalla painiketta ”Kassalle.” Tavarat kiertoon
                -järjestelmästä tilatuista tuotteista ei peritä maksua.
            </Typography>
            <Typography gutterBottom>Täytä tilauksen toimitustiedot huolellisesti.</Typography>
            <Typography gutterBottom>
                Valitse haluatko tuotteellesi kuljetuksen Työpisteeltä vai noudatko tilauksen itse.
            </Typography>
            <Typography gutterBottom>Vahvista tilaus</Typography>
            <Typography gutterBottom>
                Lähetettyäsi tilauksen saat automaattisen tilausvahvistuksen sähköpostitse, kun olemme vastaanottaneet
                tilauksesi. Tilausvahvistuksesta voit vielä tarkastaa tilauksesi tiedot
            </Typography>
            <Typography gutterBottom>
                Mikäli haluat sopia kuljetuksesta tarkemmin voit ottaa yhteyttä Työpisteeseen sähköpostitse{' '}
                <MuiLink href="mailto: tyopistekierratys@turku.fi">tyopistekierratys@turku.fi</MuiLink>
            </Typography>
        </>
    );
}

function Shipping() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Tilaaminen
            </Typography>
            <Typography gutterBottom>
                Voit hakea tavaroita tuotteet -sivun yläreunassa olevan hakutoiminnon avulla mm. tuotenimikkeen,
                materiaalin tai värin perusteella. Voit myös yhdistellä eri hakusanoja mielesi mukaan.
            </Typography>
            <Typography gutterBottom>
                Voit tilata tuotteita vain, jos olet rekisteröitynyt järjestelmään. Selailu- ja hakutoiminnot ovat
                avoimia kaikille ja ne toimivat ilman rekisteröitymistä
            </Typography>
            <Typography gutterBottom>
                Lisää tuote ostoskoriin klikkaamalla tuotekortilla olevaa ”lisää koriin” -painiketta tai tuotteen
                yksityiskohtaisempaa näkymää.
            </Typography>
            <Typography gutterBottom>
                Ostoskorissa näet kaikki valitsemasi tuotteet, voit vielä tarkistaa ne ja muokata ostoskorisi sisältöä.
            </Typography>
            <Typography gutterBottom>
                Pääset jatkamaan tilauksen tekemistä klikkaamalla painiketta ”Kassalle.” Tavarat kiertoon
                -järjestelmästä tilatuista tuotteista ei peritä maksua.
            </Typography>
            <Typography gutterBottom>Täytä tilauksen toimitustiedot huolellisesti.</Typography>
            <Typography gutterBottom>
                Valitse haluatko tuotteellesi kuljetuksen Työpisteeltä vai noudatko tilauksen itse.
            </Typography>
            <Typography gutterBottom>Vahvista tilaus</Typography>
            <Typography gutterBottom>
                Lähetettyäsi tilauksen saat automaattisen tilausvahvistuksen sähköpostitse, kun olemme vastaanottaneet
                tilauksesi. Tilausvahvistuksesta voit vielä tarkastaa tilauksesi tiedot
            </Typography>
            <Typography gutterBottom>
                Mikäli haluat sopia kuljetuksesta tarkemmin voit ottaa yhteyttä Työpisteeseen sähköpostitse{' '}
                <MuiLink href="mailto: tyopistekierratys@turku.fi">tyopistekierratys@turku.fi</MuiLink>
            </Typography>
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

function CustomHeroText() {
    return (
        <Typography variant="subtitle2" textAlign="center" mb="1rem">
            Jos etsimäsi tietoa ei löydy tästä tai{' '}
            <MuiLink component={Link} to="/ohjeet">
                Ohje
            </MuiLink>
            -sivulta, voit olla meihin yhteydessä{' '}
            <MuiLink component={Link} to="/otayhteytta">
                täältä
            </MuiLink>
            .
        </Typography>
    );
}

function GuideOrdering() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<ShoppingCartCheckoutIcon />} />
            <HeroText title="Tilaaminen & Kuljetus" subtitle="Alla on ohjeet tilaamiseen, sekä tietoa kuljetuksesta." />
            <CustomHeroText />
            <TitleTabs />
        </Container>
    );
}

export default GuideOrdering;
