import { Container, Stack } from '@mui/material';
import BulletinPost from './BulletinPost';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';
import FeedIcon from '@mui/icons-material/Feed';

import { useRouteLoaderData } from 'react-router-dom';
import type { rootLoader } from '../../Router/loaders';

interface Bulletin {
    title: string;
    date: string;
    content: string;
    id: string;
}

function BulletinPosts() {
    const { bulletins } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;

    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<FeedIcon />} hideInAdmin={true} />
            <HeroText title="Tiedotteet" />
            <Stack id="bulletin-cards-column-stacker-admin" sx={{ m: '1rem 0 1rem 0' }}>
                {bulletins.map((bulletin: Bulletin) => (
                    <BulletinPost
                        key={bulletin.id}
                        id={bulletin.id}
                        title={bulletin.title}
                        content={bulletin.content}
                        date={bulletin.date}
                    />
                ))}
            </Stack>
        </Container>
    );
}

export default BulletinPosts;
