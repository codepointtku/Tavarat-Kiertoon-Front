import { Avatar, Box, Container, Typography } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Hero() {
    return (
        <Box
            sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Avatar
                sx={{
                    mt: 2,
                    mb: 1,
                    bgcolor: 'secondary.dark',
                    width: 48,
                    height: 48,
                }}
            >
                <LocalShippingIcon fontSize="large" />
            </Avatar>

            <Typography variant="h4" color="primary.main">
                Noutokuljetuksen ohjeet
            </Typography>
        </Box>
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
