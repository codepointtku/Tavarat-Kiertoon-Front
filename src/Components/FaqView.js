import { Typography, Box, Link as MuiLink, Divider, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function FaqView() {
    return (
        <Container>
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h3" align="center" color="primary.main">
                    UKK-FAQ
                </Typography>
                <Typography variant="subtitle2" align="center">
                    Alla on usein kysyttyjä kysymyksiä vastauksineen. Jos etsimäsi tietoa ei löydy tästä tai
                    <MuiLink
                        href="https://www.youtube.com/watch?v=VcjzHMhBtf0&ab_channel=journeyVEVO"
                        color="primary"
                        underline="hover"
                    >
                        {' '}
                        Ohje
                    </MuiLink>
                    -sivulta voi olla{' '}
                    <Link to=" " underline="hover">
                        meihin yhteydessä täältä.
                    </Link>
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h6" color="primary.main">
                    <Divider>Kehen voin olla yhteydessä jos tarvitsen apua?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Voit olla yhteydessä meihin lähettämällä viestin <Link to="/">palaute sivun</Link> kautta.
                    Kuljetusta koskevissa kysymyksissä voit olla yhteydessä suoraan työkeskukseen{' '}
                    <MuiLink href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi</MuiLink>
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h6" color="primary.main">
                    {' '}
                    <Divider> Koska tilatut tuotteet toimitetaan?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Tuotteiden toimitusaika riippuu toimitusjonon pituudesta. Tuotteet pyritään toimittamaan kahden
                    viikon kuluessa, mutta ruuhkaisina aikoina toimituksessa voi mennä pidempään.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary.main">
                    <Divider>Kuka saa tilata tuotteita järjestelmästä?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Tilataksesi tuotteita sinun tulee rekisteröityä järjestelmään. Rekisteröityminen on sallittu vain
                    hankintaoikeudet omaaville henkilöille.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary.main">
                    <Divider>Kuka tilaa kuljetuksen?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Kuljetuksen tilaa tuotteen tilaaja. Tilauksen yhteydessä valitaan kuljetusmuodoksi joko Työkeskuksen
                    kuljetus, nouto varastosta tai sisäinen posti (Vain askartelumateriaalit).
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary.main">
                    <Divider>Maksaako tuotteiden tilaaminen järjestelmästä?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Mistään tuotteista ei peritä maksua järjestelmässä. Myös{' '}
                    <Link to=" " underline="hover">
                        kuljetuksesta
                    </Link>{' '}
                    ei peritä maksua. Kalustekierron kuljetuksia hoitaa Turun Työkeskus.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary.main">
                    <Divider>Missä tuotteet ovat?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Tuotteiden sijaintitiedot löytyvät tuotetiedoista. Lisätietoa varastoista löydät{' '}
                    <Link to=" " underline="hover">
                        varastot
                    </Link>{' '}
                    -sivulta.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary.main">
                    <Divider>Mistä tiedän että järjestelmästä tilatut tuotteet ovat puhtaita ja ehjiä?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Järjestelmään lisätyt tuotteet ovat käyttökelpoisia ja puhtaita. Likaisia tai rikkinäisiä tuotteita
                    ei lisätä järjestelmään. Tuotteen kuntoluokitus mainitaan tarvittaessa tuotetiedoissa.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary.main">
                    <Divider>Mitä kuljetus maksaa?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Kuljetushinnaston löydät{' '}
                    <Link to=" " underline="hover">
                        Toimitus
                    </Link>{' '}
                    -välilehdeltä. Lisätietoja kuljetuksen hinnoittelusta{' '}
                    <MuiLink href="mailto:tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi.</MuiLink>
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary.main">
                    <Divider>Miten kuljetus on järjestetty?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Tuotteiden kuljetuksesta vastaa Turun työkeskus. Lisätietoa kuljetuksesta löydät{' '}
                    <Link href=" " underline="hover">
                        Toimitus
                    </Link>
                    -välilehdeltä.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary.main">
                    <Divider>Miten tilaan tuotteita järjestelmästä?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Etsi tarvitsemasi tuote ja lisää se ostoskoriin. Kun olet lisännyt kaikki haluamasi tuotteet mene
                    omaan ostoskoriisi sivuston yläpalkista löytyvästä painikkeesta ja siirry kassalle. Täytä kaikki
                    pyydetyt kentät ja vahvista tilaus. Tilaamasi tuotteet toimitetaan antamaasi toimitusosoitteeseen.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary.main">
                    <Divider>Miten voin hakea tarvitsemaani tuotetta?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Tuotteita voi hakea{' '}
                    <Link href=" " underline="hover">
                        tuotteet
                    </Link>{' '}
                    –sivun vasemmasta sivupalkista löytyvien hakuvaihtoehtojen avulla tai suoralla sanahaulla.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary.main">
                    <Divider>Saako tuotteita mennä katsomaan paikan päälle?</Divider>
                </Typography>
                <Typography align="center" variant="body2">
                    Ensisijaisesti tuotteet tilataan sivustolta löytyvien tietojen perusteella. Sivustolle pyritään
                    tuomaan kaikki tarpeelliset tiedot tuotetta koskien. Mikäli tuotetiedot ovat puutteelliset, niistä
                    voi antaa palautetta tai esittää lisätiedusteluja{' '}
                    <MuiLink href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi.</MuiLink>
                </Typography>
            </Box>
        </Container>
    );
}

export default FaqView;
