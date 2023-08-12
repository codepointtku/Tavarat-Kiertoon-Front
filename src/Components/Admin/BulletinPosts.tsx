import { useActionData, useLoaderData } from 'react-router-dom';

import { Container, Stack } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';

import BulletinPost from './BulletinPost';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';
import AlertBox from '../AlertBox';

import type { adminBulletinsLoader } from '../../Router/loaders';
import type { adminBulletinsAction } from '../../Router/actions';

function BulletinPosts() {
    const { bulletins } = useLoaderData() as Awaited<ReturnType<typeof adminBulletinsLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof adminBulletinsAction>>;

    return (
        <>
            {responseStatus?.type === 'bulletindelete' && !responseStatus?.status && (
                <AlertBox text="Tiedotteen poisto epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'bulletindelete' && responseStatus?.status && (
                <AlertBox text="Tiedote poistettu" status="success" timer={2000} />
            )}

            <Container maxWidth="lg">
                <HeroHeader Icon={<FeedIcon />} hideInAdmin={true} />
                <HeroText title="Tiedotteet" />
                <Stack id="bulletin-cards-column-stacker-admin" sx={{ m: '1rem 0 1rem 0' }}>
                    {bulletins.map((bulletin) => {
                        const date = new Date(bulletin.date);
                        const dateInfo = [];
                        dateInfo.push(date.toLocaleDateString('fi-FI'));
                        dateInfo.push(date.toLocaleTimeString('fi-FI'));
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
        </>
    );
}

export default BulletinPosts;
