import { Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';

function BackgroundInfo() {
    return (
        <Container>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" aling="center">
                    Taustaa
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                    Tavarat kiertoon – kierrätysjärjestelmän taustalla on Turun kaupungin kestävän kehityksen
                    budjetoinnissa tehty työ materiaalikierron edistämiseksi eri toimialojen välillä, Sivistystoimialan
                    varastojen inventointitarve sekä Turun resurssiviisaustyö yhdessä Sitran kanssa. Keskeisinä
                    tavoitteina on edesauttaa kaupungin sisäistä resurssiviisautta, lisätä näkyvyyttä, parantaa
                    päätöksentekoa ja vähentää ulkoisia ostoja. Kierrätysjärjestelmä toteutetaan avoimella
                    lähdekoodilla, jolloin sen laaja‐alainen hyödyntäminen on mahdollista eri tahoille.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                    Kierrätysjärjestelmän luominen aloitettiin syksyllä 2015 yhteistyönä Turun Ekotuen, Työkeskuksen ja
                    Sivistystoimialan kanssa. Järjestelmään tuotiin koulujen ylijäämähuonekaluja ja laitteita. Ne ovat
                    kaikkien nähtävissä nettipohjaisen kierrätysjärjestelmän kautta. Pilotin ensimmäisessä vaiheessa
                    tavarat on koottu Työkeskuksen keskitettyyn varastoon Ilpoistentielle. Kierrätysjärjestelmä on
                    pilotointivaiheessa. Ensimmäisessä vaiheessa, 1.4.2016 lähtien, se oli testikäytössä
                    Sivistystoimialalla.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                    Pilotin seuraavassa vaiheessa, 1.6.2016 alkaen, Tavarat kiertoon – kierrätysjärjestelmään
                    kehitettiin käyttäjäystävällinen mobiilisovellus, jonka avulla kenen tahansa on helppo lisätä
                    yksikkönsä ylimääräinen irtaimisto järjestelmään. Näin saadaan sujuvasti kerättyä tieto kaupungin
                    ylimääräisistä huonekaluista, laitteista, kirjoista ja lukuisista muista käyttökelpoisista esineistä
                    kaikkien nähtäville. Jatkossa tavoitteena on, että Turun kaupungin yksiköt tuovat itse ylimääräiset
                    huonekalut järjestelmään, eikä niitä tarvitse välttämättä siirtää keskitettyyn varastoon.
                    Pilottihanketta rahoittivat Turun kaupunki ja Sitra.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                    Pilotin toteuttaa Turun kaupungin konsernihallinnon alainen yksikkö, Itämeren liiton kestävät
                    kaupungit komission sihteeristö. Kokeilun koordinaattorina toimi Stella Aaltonen, joka veti Turun
                    kaupungin kestävän kehityksen budjetointia, jonka osana kierrätysjärjestelmän perusta on luotu
                    syksyllä 2015.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">Työryhmä 2016 Stella Aaltonen - Hankejohtaja</Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                    <a href="mailto: stella.aaltonen@turku.fi">stella.aaltonen@turku.fi</a>
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">Kaj-Michael Lang - Projektityöntekijä, tekniset tiedot</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                    <a href="mailto: kaj-michael.lang@turku.fi">kaj-michael.lang@turku.fi</a>
                </Typography>
            </Box>
        </Container>
    );
}

export default BackgroundInfo;
