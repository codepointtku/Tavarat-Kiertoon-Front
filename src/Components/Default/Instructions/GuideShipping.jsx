import { Container, Typography } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

function Shipping() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Noutokuljetuksen tilaaminen
            </Typography>
            <Typography gutterBottom>Voit tilata kierrätyskelpoiselle tavarallesi noutokuljetuksen.</Typography>
            <Typography gutterBottom>
                Huomioi, jos tavara on huonokuntoista, perimme siitä jätekäsittelymaksun.
            </Typography>
        </>
    );
}

function GuideShipping() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<LocalShippingIcon />} />
            <HeroText title="Noutokuljetuksen ohjeet" subtitle="moro" secondaryText="terveee" /> <Shipping />
        </Container>
    );
}

export default GuideShipping;
