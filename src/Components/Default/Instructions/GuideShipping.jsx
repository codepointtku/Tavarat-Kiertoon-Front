import { Container, Typography } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import TypographyHeading from '../../TypographyHeading';

function Shipping() {
    return (
        <>
            <TypographyHeading text="Noutokuljetuksen tilaaminen" />
            <Typography gutterBottom>Vaihe 1: Soita toimistoon</Typography>
            <Typography gutterBottom>Vaihe 2: Lopeta puhelu</Typography>
            <Typography gutterBottom>Vaihe 3: Odota</Typography>
        </>
    );
}

function GuideShipping() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<LocalShippingIcon />} />
            <HeroText
                title="Noutokuljetuksen ohjeet"
                subtitle="Voit tilata kierrätyskelpoiselle tavarallesi noutokuljetuksen."
                secondaryText="Huomioi, jos tavara on huonokuntoista, perimme siitä jätekäsittelymaksun."
            />
            <Shipping />
        </Container>
    );
}

export default GuideShipping;
