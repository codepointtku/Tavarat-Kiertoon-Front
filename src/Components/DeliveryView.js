import { Container, Grid, Typography, Link } from '@mui/material';
import { useRouteLoaderData } from 'react-router-dom';

function DeliveryView() {
    const data = useRouteLoaderData('root');
    if (!data) {
        return <>Toimitustietoja ei voitu ladata</>;
    }

    const url = `mailto:${data.email}`;
    // console.log(data, data.name);
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
                    Kuljetuksien tiedustelut {data.name}
                </Typography>

                <Typography variant="body2" paragraph>
                    {data.address}
                </Typography>

                <Typography>
                    <Link href={url}>{data.email}</Link>
                </Typography>

                <Typography paragraph> {data.phoneNumber} </Typography>
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

export default DeliveryView;
