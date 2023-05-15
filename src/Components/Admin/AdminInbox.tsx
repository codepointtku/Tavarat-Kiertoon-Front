import { useLoaderData } from 'react-router-dom';
import { Stack, Grid } from '@mui/material';
import HeroText from '../HeroText';
import BulletinCard from '../Default/BulletinCard';
import type { adminInboxLoader } from '../../Router/loaders';

interface Message {
    subject: string;
    date: string;
    message: string;
}

function AdminInbox() {
    const messages = useLoaderData() as Awaited<ReturnType<typeof adminInboxLoader>>;
    const messageCards = messages.map((message: Message) => (
        <BulletinCard title={message.subject} date={message.date} content={message.message} />
    ));

    return (
        <Grid direction="column" alignItems="center" container>
            <HeroText title="Saapuneet viestit" />
            <Stack id="admin-messages-stack" sx={{ m: '1rem 0 1rem 0' }}>
                {messageCards}
            </Stack>
        </Grid>
    );
}

export default AdminInbox;
