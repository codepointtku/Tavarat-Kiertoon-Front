import { Container, Typography } from '@mui/material';

function Delivery() {
    return (
        <Container fixed>
            <Typography variant="h4">Toimitus</Typography>

            <Typography variant="caption">Kalustekierron kuljetuksia hoitaa Turun Valmennuspiste</Typography>
            <br />
            <Typography variant="caption">Kuljetuksien tiedustelut Vesa Lehtonen, puh. 040 531 8689</Typography>
            <br />
            <Typography variant="caption">Osoite: Rieskalähteentie 76, 20300 Turku</Typography>
            <br />
            <Typography>
                Sähköposti: <a href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi</a>
            </Typography>
            <br />
            <Typography>Puh: +358 40 531 8689</Typography>
            <br />

            <Typography variant="h4">Kuljetus</Typography>
            <Typography variant="caption">
                Järjestelmästä tilattujen kierrätysuotteiden kuljetuksesta ei peritä erillistä maksua. Asennustöistä
                voidaan periä työn laajuudesta riippuen lisämaksu.
            </Typography>
            <Typography variant="caption">
                Kuljetus tilataan tuotetilauksen yhteydessä. Vastuu tuotteen kuljetuksesta on tilaajalla.
            </Typography>
            <br />
            <Typography variant="caption">
                Tarkempia tietoja kuljetuksen kustannuksista ja kuljetusaikatauluista saat ottamalla yhteyttä
                työkeskukseen.
            </Typography>
            <br />

            <br />
            <Typography variant="h4">Askartelumateriaalit</Typography>
            <Typography variant="h6">Askartelumateriaalien kierrätys on väliaikaisesti tauolla.</Typography>
            <Typography variant="caption">
                Askartelumateriaalin tilaukset lähetetään mahdollisuuksien mukaan sisäisellä postilla. Suurempien erien
                yhteydessä kuljetuksen voi järjestää itse sopimalla noudon askartelumateriaalien varastolta.
            </Typography>
            <br />
            <br />
        </Container>
    );
}

export default Delivery;
