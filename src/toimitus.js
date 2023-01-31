import { Container, Grid, Typography } from '@mui/material';

function Delivery() {
    return (
        <Container fixed>
            <Grid rowSpacing="10">
                <Typography variant="h3" paragraph color="primary.main">
                    Toimitus
                </Typography>

                <Typography variant="body2" paragraph>
                    Kalustekierron kuljetuksia hoitaa Turun Valmennuspiste
                </Typography>

                <Typography variant="body2" paragraph>
                    Kuljetuksien tiedustelut Vesa Lehtonen, puh. 040 531 8689
                </Typography>

                <Typography variant="body2" paragraph>
                    Osoite: Rieskalähteentie 76, 20300 Turku
                </Typography>

                <Typography>
                    Sähköposti: <a href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi</a>
                </Typography>

                <Typography paragraph>Puh: +358 40 531 8689</Typography>
            </Grid>

            <Grid rowSpacing="10">
                <Typography variant="h3" color="primary.main" paragraph>
                    Kuljetus
                </Typography>
                <Typography variant="body2" paragraph>
                    Järjestelmästä tilattujen kierrätysuotteiden kuljetuksesta ei peritä erillistä maksua. Asennustöistä
                    voidaan periä työn laajuudesta riippuen lisämaksu.
                </Typography>
                <Typography variant="body2" paragraph>
                    Kuljetus tilataan tuotetilauksen yhteydessä. Vastuu tuotteen kuljetuksesta on tilaajalla.
                </Typography>

                <Typography variant="body2" paragraph>
                    Tarkempia tietoja kuljetuksen kustannuksista ja kuljetusaikatauluista saat ottamalla yhteyttä
                    työkeskukseen.
                </Typography>
            </Grid>

            <Grid rowSpacing="10">
                <Typography variant="h3" paragraph color="primary.main">
                    Askartelumateriaalit
                </Typography>
                <Typography variant="h6" paragraph color="primary.main">
                    Askartelumateriaalien kierrätys on väliaikaisesti tauolla.
                </Typography>
                <Typography variant="body2" paragraph>
                    Askartelumateriaalin tilaukset lähetetään mahdollisuuksien mukaan sisäisellä postilla. Suurempien
                    erien yhteydessä kuljetuksen voi järjestää itse sopimalla noudon askartelumateriaalien varastolta.
                </Typography>
            </Grid>
        </Container>
    );
}

export default Delivery;
