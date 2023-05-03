import { Avatar, Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useRouteLoaderData } from 'react-router-dom';

import FeedIcon from '@mui/icons-material/Feed';

import BackButton from '../BackButton';
import BulletinCard from './BulletinCard';
import TypographyTitle from '../TypographyTitle';

import type { rootLoader } from '../../Router/loaders';

function Hero() {
    return (
        <>
            <Grid container className="back-btn-avatar-wrapper">
                <Grid item xs={4}>
                    <BackButton />
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.dark',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <FeedIcon />
                    </Avatar>
                </Grid>
                <Grid item xs={4} />
            </Grid>
            <Box id="hero-texts-wrapper" p="1rem">
                <TypographyTitle text="Tiedotteet" />
                <Typography sx={{ mt: '1rem' }} textAlign="center">
                    Lue täältä uusimmat Tavarat Kiertoon tiedotteet ja uutiset
                </Typography>
            </Box>
        </>
    );
}

function BulletinCards() {
    const { bulletins } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;

    const cards = bulletins.map((item: any) => (
        <BulletinCard key={item.id} title={item.title} date={item.date} content={item.content} />
    ));

    return (
        <Stack id="bulletin-cards-column-stacker" sx={{ m: '0 0 1rem 0' }}>
            {cards}
        </Stack>
    );
}

function Bulletins() {
    return (
        <Container maxWidth="lg">
            <Hero />
            <BulletinCards />
        </Container>
    );
}

export default Bulletins;
