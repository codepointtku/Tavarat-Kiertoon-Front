import { Container, Typography, Link as MuiLink } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import TypographyHeading from '../../TypographyHeading';

function Shipping() {
    return (
        <>
            <TypographyHeading text="Noutokuljetuksen tilaaminen" />
            <Typography gutterBottom>
                Yhteydenotto toimistoon{' '}
                <MuiLink href="mailto: tyopistekierratys@turku.fi">tyopistekierratys@turku.fi</MuiLink>
            </Typography>
            <Typography gutterBottom>
                Sovi aika ja paikka mistä tavara noudetaan ja koska sekä millaisesta tavarasta on kyse.
            </Typography>
            <Typography gutterBottom>
                Pakkaa noudettavat tuotteet valmiiksi mahdollisuuksien mukaan ja odota noutoa.
            </Typography>
        </>
    );
}

function GuideShipping() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<LocalShippingIcon />} />
            <HeroText
                title="Noutokuljetuksen ohjeet"
                subtitle="Kalustekierrätyksen kuljetuksia hoitaa Turun Työpiste."
                text="Voit tilata kierrätyskelpoiselle tavaralle noutokuljetuksen. Jos tavara on huonokuntoista, perimme siitä jätteenkäsittelymaksun."
            />
            <Shipping />
        </Container>
    );
}

export default GuideShipping;
