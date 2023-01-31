import { Typography, Box, Link } from '@mui/material';
import Container from '@mui/material/Container';

function FaqView() {
    return (
        <Container>
            <Box sx={{ p: 2 }}>
                <Typography variant="h3" align="center">
                    UKK-FAQ
                </Typography>
                <Typography variant="subtitle2" align="center">
                    Alla on usein kysyttyjä kysymyksiä vastauksineen. Jos etsimäsi tietoa ei löydy tästä tai
                    <Link
                        href="https://www.youtube.com/watch?v=VcjzHMhBtf0&ab_channel=journeyVEVO"
                        color="primary"
                        underline="hover"
                    >
                        {' '}
                        Ohje
                    </Link>
                    -sivulta voi olla{' '}
                    <Link href=" " underline="hover">
                        {' '}
                        meihin yhteydessä täältä.
                    </Link>
                </Typography>
                <hr />
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Kehen voin olla yhteydessä jos tarvitsen apua?</Typography>
                <Typography variant="body2">
                    Voit olla yhteydessä meihin lähettämällä viestin{' '}
                    <Link href=" " underline="hover">
                        palaute sivun
                    </Link>{' '}
                    kautta. Kuljetusta koskevissa kysymyksissä voit olla yhteydessä suoraan työkeskukseen{' '}
                    <a href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi</a>
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6"> Koska tilatut tuotteet toimitetaan?</Typography>
                <Typography variant="body2">
                    Tuotteiden toimitusaika riippuu toimitusjonon pituudesta. Tuotteet pyritään toimittamaan kahden
                    viikon kuluessa, mutta ruuhkaisina aikoina toimituksessa voi mennä pidempään.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Kuka saa tilata tuotteita järjestelmästä?</Typography>
                <Typography variant="body2">
                    Tilataksesi tuotteita sinun tulee rekisteröityä järjestelmään. Rekisteröityminen on sallittu vain
                    hankintaoikeudet omaaville henkilöille.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Kuka tilaa kuljetuksen?</Typography>
                <Typography variant="body2">
                    Kuljetuksen tilaa tuotteen tilaaja. Tilauksen yhteydessä valitaan kuljetusmuodoksi joko Työkeskuksen
                    kuljetus, nouto varastosta tai sisäinen posti (Vain askartelumateriaalit).
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Maksaako tuotteiden tilaaminen järjestelmästä?</Typography>
                <Typography variant="body2">
                    Mistään tuotteista ei peritä maksua järjestelmässä. Myös{' '}
                    <Link href=" " underline="hover">
                        kuljetuksesta
                    </Link>{' '}
                    ei peritä maksua. Kalustekierron kuljetuksia hoitaa Turun Työkeskus.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Missä tuotteet ovat?</Typography>
                <Typography variant="body2">
                    Tuotteiden sijaintitiedot löytyvät tuotetiedoista. Lisätietoa varastoista löydät{' '}
                    <Link href=" " underline="hover">
                        varastot
                    </Link>{' '}
                    -sivulta.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">
                    Mistä tiedän että järjestelmästä tilatut tuotteet ovat puhtaita ja ehjiä?
                </Typography>
                <Typography variant="body2">
                    Järjestelmään lisätyt tuotteet ovat käyttökelpoisia ja puhtaita. Likaisia tai rikkinäisiä tuotteita
                    ei lisätä järjestelmään. Tuotteen kuntoluokitus mainitaan tarvittaessa tuotetiedoissa.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Mitä kuljetus maksaa?</Typography>
                <Typography variant="body2">
                    Kuljetushinnaston löydät{' '}
                    <Link href=" " underline="hover">
                        Toimitus
                    </Link>{' '}
                    -välilehdeltä. Lisätietoja kuljetuksen hinnoittelusta{' '}
                    <a href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi.</a>
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Miten kuljetus on järjestetty?</Typography>
                <Typography variant="body2">
                    Tuotteiden kuljetuksesta vastaa Turun työkeskus. Lisätietoa kuljetuksesta löydät{' '}
                    <Link href=" " underline="hover">
                        Toimitus
                    </Link>
                    -välilehdeltä.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Miten tilaan tuotteita järjestelmästä?</Typography>
                <Typography variant="body2">
                    Etsi tarvitsemasi tuote ja lisää se ostoskoriin. Kun olet lisännyt kaikki haluamasi tuotteet mene
                    omaan ostoskoriisi sivuston yläpalkista löytyvästä painikkeesta ja siirry kassalle. Täytä kaikki
                    pyydetyt kentät ja vahvista tilaus. Tilaamasi tuotteet toimitetaan antamaasi toimitusosoitteeseen.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Miten voin hakea tarvitsemaani tuotetta?</Typography>
                <Typography variant="body2">
                    Tuotteita voi hakea{' '}
                    <Link href=" " underline="hover">
                        tuotteet
                    </Link>{' '}
                    –sivun vasemmasta sivupalkista löytyvien hakuvaihtoehtojen avulla tai suoralla sanahaulla.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Saako tuotteita mennä katsomaan paikan päälle?</Typography>
                <Typography variant="body2">
                    Ensisijaisesti tuotteet tilataan sivustolta löytyvien tietojen perusteella. Sivustolle pyritään
                    tuomaan kaikki tarpeelliset tiedot tuotetta koskien. Mikäli tuotetiedot ovat puutteelliset, niistä
                    voi antaa palautetta tai esittää lisätiedusteluja{' '}
                    <a href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi.</a>
                </Typography>
            </Box>
        </Container>
    );
}

export default FaqView;
