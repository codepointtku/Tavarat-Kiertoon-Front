import { useLoaderData } from 'react-router-dom';
import { Stack, Grid, Container } from '@mui/material';
import HeroText from '../HeroText';
import MessageCard from './MessageCard';
import type { adminInboxLoader } from '../../Router/loaders';

interface Message {
    subject: string;
    date: string;
    message: string;
}

function AdminInbox() {
    const messages = useLoaderData() as Awaited<ReturnType<typeof adminInboxLoader>>;
    const messageCards = messages.map((message: Message) => (
        <MessageCard subject={message.subject} date={message.date} message={message.message} />
    ));

    return (
        <Container maxWidth="lg" component={Grid} direction="column" alignItems="center" container>
            <HeroText title="Saapuneet viestit" />
            <Stack id="admin-messages-stack" sx={{ m: '1rem 0 1rem 0' }}>
                {messageCards}
            </Stack>
        </Container>
    );
}

export default AdminInbox;
