import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Box, Container, Link as MuiLink, Typography, Tabs, Tab } from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GiteIcon from '@mui/icons-material/Gite';
import Person2Icon from '@mui/icons-material/Person2';
import ImageSearch from '@mui/icons-material/ImageSearch';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

function SignupHelp() {
    return (
        <>
            <Typography>
                Tavarat kiertoon -sivustolla pääset tarkastelemaan kaupungin käytettävissä olevaa kalustoa. Tuotteita
                saa tilata ainoastaan oman yksikön käyttöön ja niiden tilaamiseen on oltava hankintaoikeudet.
                Hankintaoikeuden omaava henkilö pääsee rekisteröitymään järjestelmään. Tuotteet ovat käytettyjä ja ne
                luovutetaan uudelleen käyttöön siinä kunnossa kuin ne ovat. Kaikki järjestelmän tuotteet ovat Turun
                kaupungin omaisuutta eikä niitä tule ottaa yksityiseen käyttöön tai lahjoittaa omatoimisesti eteenpäin.
            </Typography>
            {/* <Typography variant="h5" color="primary.main" gutterBottom>
                Tilin hallinta
            </Typography>
            <Typography>
                Nopea hallintapaneeli oikeassa ylälaidassa sisältää myös tiliin liittyvät toiminnot.
            </Typography>
            <Typography>
                Napauttaessa Käyttäjä <AccountCircleOutlinedIcon fontSize="24" /> -ikonia, aukeavasta vetolaatikosta
                pääset kirjautumaan sisään, tai luomaan uuden tilin.
            </Typography>
            <Typography>
                Sisäänkirjautuneena samassa paikassa voit tarkastella tilisi, ja tilauksiesi tietoja.
            </Typography>
            <Typography gutterBottom>
                Halutessasi päivittää, tai muuttaa tilisi tietoja,{' '}
                <MuiLink component={Link} to="/otayhteytta">
                    Ota Yhteyttä
                </MuiLink>{' '}
                toimistoon.
            </Typography>

            <Typography variant="h5" color="primary.main" mt={2} gutterBottom>
                Uuden tilin luominen
            </Typography>
            <Typography gutterBottom>
                "Rekisteröidy"-linkkiä painamalla avautuu uusi sivu, missä eteesi laskeutuu valinta. Otatko sinisen vai
                punaisen pillerin? Tarkempaa tietoa näistä löytyy napauttamalla ylläolevia linkkejä.
            </Typography> */}
        </>
    );
}

function UserAccountHelp() {
    return (
        <>
            <Typography variant="subtitle2" align="center" mb={2}>
                Käyttäjätili on henkilökohtainen hankintatili Tavarat Kiertoon -järjestelmässä.
            </Typography>
            {/* <Typography variant="subtitle2" align="center" mb={2}>
                Käyttäjätilillä tarkoitetaan henkilökohtaista hankintatiliä Tavarat Kiertoon-järjestelmässä.
            </Typography> */}
            <Typography variant="h5" color="primary.main" gutterBottom>
                Käyttäjätilin luominen
            </Typography>
            <MuiLink component={Link} to="/rekisteroidy/kayttaja">
                Avaa rekisteröintilomake
            </MuiLink>
            <Typography gutterBottom>Syötä ensimmäiseen kenttään sähköpostiosoitteesi.</Typography>
            <Typography gutterBottom>Jatkossa kirjaudut tällä sähköpostiosoitteellasi järjestelmään.</Typography>
            <Typography gutterBottom>
                Täytä henkilötietosi ja keksi itsellesi salasana. Paina lopuksi ”rekisteröidy” -painiketta
            </Typography>

            <Typography variant="h5" color="primary.main" gutterBottom>
                Tilin hallinta
            </Typography>
            <Typography>
                Hallintapaneeli oikeassa ylälaidassa sisältää tiliin liittyvät toiminnot. Käyttäjä -ikonia klikkaamalla
                avautuvasta ikkunasta pääset kirjautumaan sisälle ja muokkaamaan tietojasi tai luomaan uuden
                käyttäjätilin.
            </Typography>
        </>
    );
}

function LocationAccountHelp() {
    return (
        <>
            <Typography variant="subtitle2" align="center" mb={2}>
                Toimipaikkatili on yhteinen hankintatili monen eri henkilön kesken ja tilillä on oltava vastuuhenkilö.
            </Typography>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Toimipaikkatilin luominen
            </Typography>
            <Typography gutterBottom>Tilin luonti on kaksi-vaiheinen.</Typography>
            <MuiLink component={Link} to="/rekisteroidy/toimipaikka">
                Avaa rekisteröintilomake
            </MuiLink>
            <Typography gutterBottom>
                Syötä ensimmäiseen kenttään käyttäjätunnus esim. ”KanakadunPäiväkoti”, käyttäjätunnus ei saa sisältää
                välilyöntejä.
            </Typography>
            <Typography gutterBottom>Syötä seuraaviin kenttiin vastuuhenkilön yhteystiedot.</Typography>
            <Typography gutterBottom>
                Vastuuhenkilö on tilin ensisijainen omistaja ja hän on vastuussa toimipaikkatilillään tehtävistä
                tilauksista.
            </Typography>
            <Typography gutterBottom>
                Vastuuhenkilö kirjautuu tilille jatkossa sähköpostisoitteellaan ja toimipaikkatilin muut käyttäjät
                käyttäjätunnuksellaan
            </Typography>
        </>
    );
}

function SearchWatchHelp() {
    return (
        <>
            <Typography variant="subtitle2" align="center" mb={2}>
                Hakuvahdilla saat ilmoituksen sähköpostiin kun uusia tuotteita lisätään järjestelmään.
            </Typography>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Hakuvahdin luominen
            </Typography>
            <Typography>Hakuvahti luodaan käyttäjätilisivulta Hakuvahti osiosta.</Typography>
            <Typography>
                Käyttäjätilisivulle pääsee oikeasta yläkulmasta painamalla ensin kuvaketta ja sen jälkeen Käyttäjätili
                -painiketta.
            </Typography>
            <Typography>
                Käyttäjätilisivulta hakuvahti sivulle pääsee klikkaamalla Hakuvahti -painiketta käyttäjätilisivun
                yläpalkista.
            </Typography>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Hakuvahdin hyödyntäminen
            </Typography>
            <Typography>
                Luomalla itsellesi hakuvahdin saat tiedon järjestelmään lisätyistä uusista tuotteista.
            </Typography>
            <Typography>
                Hakuvahdin voi tehdä syöttämällä hakusanoja hakuvahtisivun alalaidassa olevaan kenttään.
            </Typography>
            <Typography>
                Hakusanoja on oltava vähintään yksi, useampi hakusana erotellaan välilyönneillä. Esim. hakuvahti tuoli
                lähettää ilmoituksen sähköpostiisi kun uusi tuoli lisätään valikoimaan.
            </Typography>
            <Typography>
                Jos hakuvahdiksi asetetaan punainen tuoli, saat ilmoituksen sähköpostiisi vain silloin kun valikoimaan
                lisätty tuoli on punainen.
            </Typography>
            <Typography>
                Voit asettaa useamman hakuvahdin. Jokainen hakusana rajaa hakua entistä tarkemmaksi koska jokaisen sanan
                täytyy löytyä järjestelmässä olevasta tuotteesta.
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
        to: `/ohjeet/tili/${value}`,
        replace: true,
    };
}

function TitleTabs() {
    const params = useParams();
    const value = params.value ?? 'tilit';

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs centered value={value} aria-label="title tabs">
                    <Tab label="Yleiset" {...tabProps('tilit')} icon={<AppRegistrationIcon />} />
                    <Tab label="Käyttäjätili" {...tabProps('kayttaja')} icon={<Person2Icon />} />
                    <Tab label="Toimipaikkatili" {...tabProps('toimipaikka')} icon={<GiteIcon />} />
                    <Tab label="Hakuvahti" {...tabProps('hakuvahti')} icon={<ImageSearch />} />
                </Tabs>
            </Box>
            <TabPage value={value} name="tilit">
                <SignupHelp />
            </TabPage>
            <TabPage value={value} name="kayttaja">
                <UserAccountHelp />
            </TabPage>
            <TabPage value={value} name="toimipaikka">
                <LocationAccountHelp />
            </TabPage>
            <TabPage value={value} name="hakuvahti">
                <SearchWatchHelp />
            </TabPage>
        </Box>
    );
}

function GuideAccount() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<HelpOutlineIcon />} />
            <HeroText title="Rekisteröitymisen ja tilien ohjeet" />
            <TitleTabs />
        </Container>
    );
}

export default GuideAccount;
