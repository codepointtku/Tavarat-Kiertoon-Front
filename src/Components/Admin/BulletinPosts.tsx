import { Container, Stack } from '@mui/material';
import BulletinPost from './BulletinPost';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';
import FeedIcon from '@mui/icons-material/Feed';

import { useRouteLoaderData } from 'react-router-dom';
import type { rootLoader } from '../../Router/loaders';

function BulletinPosts() {
    const { bulletins } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;

    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<FeedIcon />} hideInAdmin={true} />
            <HeroText title="Tiedotteet" />
            <Stack id="bulletin-cards-column-stacker-admin" sx={{ m: '1rem 0 1rem 0' }}>
                {bulletins.map((bulletin) => {
                    const date = new Date(bulletin.date);
                    const dateInfo = [];
                    dateInfo.push(date.toLocaleDateString());
                    dateInfo.push(date.toLocaleTimeString());
                    return (
                        <BulletinPost
                            key={bulletin.id}
                            id={bulletin.id.toString()}
                            title={bulletin.title}
                            content={bulletin.content}
                            date={dateInfo}
                        />
                    );
                })}
            </Stack>
        </Container>
    );
}

export default BulletinPosts;
