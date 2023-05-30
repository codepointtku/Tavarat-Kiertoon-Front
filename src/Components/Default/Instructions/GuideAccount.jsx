import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Box, Container, Link as MuiLink, Typography, Tabs, Tab } from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GiteIcon from '@mui/icons-material/Gite';
import Person2Icon from '@mui/icons-material/Person2';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

function SignupHelp() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Tilin hallinta
            </Typography>
            <Typography>
                Nopea hallintapaneeli oikeassa ylälaidassa sisältää myös tiliin liittyvät toiminnot.
            </Typography>
            <Typography>
                Napauttaessa Käyttäjä <Person2Icon fontSize="24" /> -ikonia, aukeavasta vetolaatikosta pääset
                kirjautumaan sisään, tai luomaan uuden tilin.
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
            </Typography>
        </>
    );
}

function UserAccountHelp() {
    return (
        <>
            <Typography variant="subtitle2" align="center" mb={2}>
                Käyttäjätili on henkilökohtainen hankintatili Tavarat Kiertoon-järjestelmässä.
            </Typography>
            {/* <Typography variant="subtitle2" align="center" mb={2}>
                Käyttäjätilillä tarkoitetaan henkilökohtaista hankintatiliä Tavarat Kiertoon-järjestelmässä.
            </Typography> */}
            <Typography variant="h5" color="primary.main" gutterBottom>
                Käyttäjätilin luominen
            </Typography>
            <Typography gutterBottom>Tilin luonti on kaksi-vaiheinen.</Typography>
            <MuiLink component={Link} to="/rekisteroidy/kayttaja">
                Avaa rekisteröinti-lomake
            </MuiLink>
            <Typography gutterBottom>
                Syötä ensimmäiseen kenttään @turku.fi -päätteinen työ-sähköpostiosoitteesi.
            </Typography>
            <Typography gutterBottom variant="body2">
                Kirjaudut jatkossa tällä sähköpostiosoitteella sisään järjestelmään. Tämä sähköpostiosoite on samalla
                käyttäjätunnuksesi.
            </Typography>
            <Typography gutterBottom>
                Syötä seuraaviin kenttiin salasanasi, minkä saat iha itte keksiä kuule.
            </Typography>
            <Typography gutterBottom variant="body2">
                Salasanan on oltava 666 merkkiä pitkä, ja siinä on oltava vähintään kyrillisiä kirjaimia, roomalaisia
                numeroita, sekä se on kirjoitettava oikealta vasemmalle ruotsiksi arabialaisella slangilla.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Kun olet syöttänyt tiedot, napauta lomakkeen päätteenä olevaa "Rekisteröidy"-painiketta.
            </Typography>
            <Typography gutterBottom>Mitä tapahtuu seuraavaksi?</Typography>
            <Typography gutterBottom variant="body2">
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
            <MuiLink component={Link} to="/signup/location">
                Avaa rekisteröinti-lomake
            </MuiLink>
            <Typography gutterBottom>
                Syötä ensimmäiseen kenttään käyttäjätunnus; esimerkiksi "KanakadunPäiväkoti" tai
                "TurunKaupunginHallitus".
            </Typography>
            <Typography gutterBottom variant="body2">
                Huomioi, tunnus ei saa sisältää välilyöntejä.
            </Typography>
            <Typography gutterBottom>
                Tilillä on oltava vastuuhenkilö. Syötä seuraaviin kenttiin vastuuhenkilön yhteystiedot.
            </Typography>
            <Typography gutterBottom variant="body2">
                Vastuuhenkilö on tilin ensisijainen omistaja. Vastuuhenkilö on vastuussa toimipaikkatilillään tehtävistä
                tilauksista.
            </Typography>
            <Typography gutterBottom variant="body2">
                Vastuuhenkilö voi kirjautua jatkossa sähköpostiosoitteellaan sisään järjestelmään.
            </Typography>
            <Typography gutterBottom variant="body2">
                Toimipaikan käyttäjät kirjautuvat jatkossa käyttäjätunnuksella sisään järjestelmään.
            </Typography>
            <Typography gutterBottom>
                Syötä seuraaviin kenttiin salasanasi, minkä saat iha itte keksiä kuule.
            </Typography>
            <Typography gutterBottom variant="body2">
                Salasanan on oltava 666 merkkiä pitkä, ja siinä on oltava vähintään kyrillisiä kirjaimia, roomalaisia
                numeroita, sekä se on kirjoitettava oikealta vasemmalle ruotsiksi arabialaisella slangilla.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Kun olet syöttänyt tiedot, napauta lomakkeen päätteenä olevaa "Rekisteröidy"-painiketta.
            </Typography>
            <Typography gutterBottom>Mitä tapahtuu seuraavaksi?</Typography>
            <Typography gutterBottom variant="body2">
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
