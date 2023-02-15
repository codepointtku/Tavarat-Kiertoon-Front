/* eslint-disable */

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Avatar, Box, Container, Link as MuiLink, Paper, Typography, Tabs, Tab } from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GiteIcon from '@mui/icons-material/Gite';
import Person2Icon from '@mui/icons-material/Person2';

function SignupHelp() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Tilin hallinta
            </Typography>
            <Typography>Nopea hallintapaneeli oikeassa ylälaidassa sisältää tiliin liittyvät toiminnot.</Typography>
            <Typography>
                Napauttaessa Käyttäjä <Person2Icon fontSize="24" /> -ikonia aukeavasta vetolaatikosta pääset
                kirjautumaan sisään, tai luomaan uuden tilin. Sisäänkirjautuneena voit tarkastella tilisi tietoja
                samassa ikkunassa.
            </Typography>
            <Typography gutterBottom>
                Halutessasi päivittää, tai muuttaa tilisi tietoja,
                <MuiLink component={Link} to="/otayhteytta">
                    {' '}
                    Ota Yhteyttä{' '}
                </MuiLink>
                toimistoon.
            </Typography>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Uuden tilin luominen
            </Typography>
            <Typography gutterBottom>
                "Rekisteröidy"-linkkiä painamalla avautuu uusi sivu, missä eteesi laskeutuu valinta. Otatko sinisen vai
                punaisen pillerin? Tarkempaa tietoa näistä löytyy napauttamalla ylläolevia linkkejä.
            </Typography>
        </>
    );
}

function UserAccountHelp() {
    return (
        <>
            <Typography variant="subtitle2" align="center" mb={2}>
                Käyttäjätilillä tarkoitetaan henkilökohtaista hankintatiliä Tavarat Kiertoon-järjestelmässä.
            </Typography>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Käyttäjätilin luominen
            </Typography>
            <Typography gutterBottom>Tilin luonti on kaksi-vaiheinen.</Typography>
            <Typography gutterBottom>
                Syötä ensimmäiseen kenttään turku.fi -päätteinen työ-sähköpostiosoitteesi.
            </Typography>
            <Typography gutterBottom>
                Kirjaudut jatkossa tällä sähköpostiosoitteella sisään järjestelmään. Tämä sähköpostiosoite on samalla
                käyttäjätunnuksesi.
            </Typography>
            <Typography gutterBottom>
                Syötä seuraaviin kenttiin salasanasi, minkä saat iha itte keksiä kuule.
            </Typography>
            <Typography gutterBottom>
                Salasanan on oltava 666 merkkiä pitkä, ja siinä on oltava vähintään kyrillisiä kirjaimia, roomalaisia
                numeroita, sekä se on kirjoitettava oikealta vasemmalle ruotsiksi arabialaisella slangilla.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Kun olet syöttänyt tiedot, napauta lomakkeen päätteenä olevaa "Rekisteröidy"-painiketta.
            </Typography>
            <Typography gutterBottom>
                Lehtopöllömme nappaavat tiedot, ja toimittavat ne Liedon logistiikkakeskukseen odottamaan
                jatkokäsittelyä. Sieltä ne kulkevat joenvartta pitkin Rieskalähteentien pankkiin, missä maahisemme
                arvioivat tilisi, ja henkilökohtaisen ihmisarvosi. Konsultoimme ylijumalia joka täydenkuun aikaan ison
                tammen alla, jonka jälkeen syömme metsästämämme riistan nuotion äärellä. Jos ylipappi antaa vielä
                siunauksen, saat hyväksyvän vastauksen rekisteröinnillesi. Lähetämme lehtopöllön tuomaan Sinulle kutsun
                toimistolle, missä mikrosirutamme Sinut. Kun toimenpide on ohi, olet tervetullut tilaamaan palvelustamme
                tuotteita asteittain. Aluksi saat oikeudet jakkaroihin, ja hyvällä käytöksellä ja puhtaalla
                rikosrekisterillä tilisi tila kasvaa korkeammalle tasolle vuosisykleittäin. Korkeimmilla tasoilla saat
                parempia tuotteita, kuten sikarituoleja, ja lyhytjalkaisia sikarituoleja.
            </Typography>
        </>
    );
}

function LocationAccountHelp() {
    return (
        <>
            <Typography variant="subtitle2" align="center" mb={2}>
                Toimipaikkatili on yhteinen hankintatili monen eri henkilön kesken Tavarat Kiertoon-järjestelmään.
            </Typography>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Toimipaikkatilin luominen
            </Typography>
            <Typography gutterBottom>Tilin luonti on kaksi-vaiheinen.</Typography>
            <Typography gutterBottom>
                Syötä ensimmäiseen kenttään käyttäjätunnus; esimerkiksi "KanakadunPäiväkoti" tai
                "TurunKaupunginHallitus".
            </Typography>
            <Typography gutterBottom>Huomioi, tunnus ei saa sisältää välilyöntejä.</Typography>
            <Typography gutterBottom>
                Tilillä on oltava vastuuhenkilö. Syötä seuraaviin kenttiin vastuuhenkilön yhteystiedot.
            </Typography>
            <Typography gutterBottom>
                Vastuuhenkilö on tilin ensisijainen omistaja. Vastuuhenkilö on vastuussa toimipaikkatilillään tehtävistä
                tilauksista.
            </Typography>
            <Typography gutterBottom>
                Vastuuhenkilö voi kirjautua jatkossa sähköpostiosoitteellaan sisään järjestelmään.
            </Typography>
            <Typography gutterBottom>
                Toimipaikan käyttäjät kirjautuvat jatkossa käyttäjätunnuksella sisään järjestelmään.
            </Typography>
            <Typography gutterBottom>
                Syötä seuraaviin kenttiin salasanasi, minkä saat iha itte keksiä kuule.
            </Typography>
            <Typography gutterBottom>
                Salasanan on oltava 666 merkkiä pitkä, ja siinä on oltava vähintään kyrillisiä kirjaimia, roomalaisia
                numeroita, sekä se on kirjoitettava oikealta vasemmalle ruotsiksi arabialaisella slangilla.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Kun olet syöttänyt tiedot, napauta lomakkeen päätteenä olevaa "Rekisteröidy"-painiketta.
            </Typography>
            <Typography gutterBottom>
                Lehtopöllömme nappaavat tiedot, ja toimittavat ne Liedon logistiikkakeskukseen odottamaan
                jatkokäsittelyä. Sieltä ne kulkevat joenvartta pitkin Rieskalähteentien pankkiin, missä maahisemme
                arvioivat tilisi, ja henkilökohtaisen ihmisarvosi. Konsultoimme ylijumalia joka täydenkuun aikaan ison
                tammen alla, jonka jälkeen syömme metsästämämme riistan nuotion äärellä. Jos ylipappi antaa vielä
                siunauksen, saat hyväksyvän vastauksen rekisteröinnillesi. Lähetämme lehtopöllön tuomaan Sinulle kutsun
                toimistolle, missä mikrosirutamme Sinut. Kun toimenpide on ohi, olet tervetullut tilaamaan palvelustamme
                tuotteita asteittain. Aluksi saat oikeudet jakkaroihin, ja hyvällä käytöksellä ja puhtaalla
                rikosrekisterillä tilisi tila kasvaa korkeammalle tasolle vuosisykleittäin. Korkeimmilla tasoilla saat
                parempia tuotteita, kuten sikarituoleja, ja lyhytjalkaisia sikarituoleja.
            </Typography>
        </>
    );
}

function Hero() {
    return (
        <Box
            sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Avatar
                sx={{
                    mt: 2,
                    mb: 2,
                    bgcolor: 'secondary.dark',
                    width: 48,
                    height: 48,
                }}
            >
                <HelpOutlineIcon fontSize="large" />
            </Avatar>

            <Typography variant="h4" color="primary.main">
                Rekisteröitymisen ja tilien ohjeet
            </Typography>
        </Box>
    );
}
function TabPanel(props) {
    const { children, value, name, ...other } = props;

    return (
        <Box
            mt={2}
            role="tabpanel"
            hidden={value !== name}
            id={`tabpanel-${name}`}
            aria-labelledby={`tab-${name}`}
            {...other}
        >
            {value === name && children}
        </Box>
    );
}

TabPanel.propTypes = {
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
        to: `/ohjeet/devi/${value}`,
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
                </Tabs>
            </Box>
            <TabPanel value={value} name="tilit">
                <SignupHelp />
            </TabPanel>
            <TabPanel value={value} name="kayttaja">
                <UserAccountHelp />
            </TabPanel>
            <TabPanel value={value} name="toimipaikka">
                <LocationAccountHelp />
            </TabPanel>
        </Box>
    );
}

function GuideAccount() {
    return (
        <Paper>
            <Container maxWidth="md">
                <Hero />
                <TitleTabs />
            </Container>
        </Paper>
    );
}

export default GuideAccount;
