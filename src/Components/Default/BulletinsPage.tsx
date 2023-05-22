import { useContext } from 'react';
import { Container, Stack } from '@mui/material';
import { useRouteLoaderData } from 'react-router-dom';

import FeedIcon from '@mui/icons-material/Feed';

import BulletinCard from './BulletinCard';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';
import AuthContext from '../../Context/AuthContext';

import type { rootLoader } from '../../Router/loaders';

function BulletinCards() {
    const { auth } = useContext(AuthContext);
    const { bulletins } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;

    const cards = bulletins.map((item: any) => (
        <BulletinCard key={item.id} title={item.title} date={item.date} content={item.content} auth={auth} />
    ));

    return (
        <Stack id="bulletin-cards-column-stacker" sx={{ m: '1rem 0 1rem 0' }}>
            {cards}
        </Stack>
    );
}

function Bulletins() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<FeedIcon />} />
            <HeroText title="Tiedotteet" text="Lue täältä uusimmat Tavarat Kiertoon tiedotteet ja uutiset" />
            <BulletinCards />
        </Container>
    );
}

export default Bulletins;
