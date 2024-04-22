import { Typography, Box, Link } from '@mui/material';

import TableBarIcon from '@mui/icons-material/TableBar';

import Container from '@mui/material/Container';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

function ContentText() {
    return (
        <Container>
            <Box sx={{ p: 2 }}>
                <Typography variant="body2">
                    Tavarat kiertoon – kierrätysjärjestelmän taustalla on Turun kaupungin strategian mukainen kestävä
                    kehitys. Turun kaupungin tavarat kiertoon- järjestelmä on toiminut vuodesta 2015 lähtien. Vuonna
                    2015 käyttöön otetun tilausjärjestelmän ohjelmisto vanhenee 2024, jonka vuoksi Turun kaupungin
                    Työpisteen tuotanto aloitti uuden tilausjärjestelmän suunnittelun ja tekemisen vuonna 2023.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="body2">
                    Tavarat kiertoon- tilausjärjestelmä on tehty kokonaan uusiksi 2024 Työpisteen tuotannon Codepoint-
                    ryhmän toimesta. Irtaimiston kuljetuksesta ja varastoinnista vastaa Turun kaupungin Työpisteen
                    tuotanto. Tavarat kiertoon- järjestelmän kalusteita hyödyntäen ja ehostaen Turun kaupunki on saanut
                    sisustettua mm. uuden Aunelan kirjaston 2020, Vasaramäen kirjaston 2021 ja monia muita kaupungin
                    tiloja.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="body2">Työpisteen tuotanto</Typography>
                <Typography variant="body2">Marko Heinonen- tuotantopäällikkö</Typography>
            </Box>
        </Container>
    );
}

function BackgroundInfo() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<TableBarIcon />} />
            <HeroText
                title="Tavarat Kiertoon tausta"
                text="Ohessa lyhyt historiikki mistä, miksi ja miten ja mikä juttu."
            />
            <ContentText />
        </Container>
    );
}

export default BackgroundInfo;
