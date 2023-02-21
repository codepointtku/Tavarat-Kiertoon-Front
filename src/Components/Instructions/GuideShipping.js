import { Avatar, Container, Grid, Typography } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import BackButton from '../BackButton';

function Hero() {
    return (
        <>
            <Grid container>
                <Grid item xs={6} md={6} mt={2} mb={2}>
                    <BackButton />
                </Grid>
                <Grid item xs={6} md={6} mt={2} mb={2}>
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.dark',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <LocalShippingIcon fontSize="large" />
                    </Avatar>
                </Grid>
            </Grid>
            <Typography variant="h4" color="primary.main" textAlign="center">
                Noutokuljetuksen ohjeet
            </Typography>
        </>
    );
}

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
            <Hero />
            <Shipping />
        </Container>
    );
}

export default GuideShipping;
