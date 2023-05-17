import { useLoaderData, useNavigate } from 'react-router-dom';
import { Stack, Grid, Container, ButtonGroup, Button, Box } from '@mui/material';
import HeroText from '../HeroText';
import MessageCard from './MessageCard';
import type { adminInboxLoader } from '../../Router/loaders';

interface Message {
    subject: string;
    date: string;
    message: string;
    id: string;
    status: string;
    name: string;
    email: string;
}

function AdminInbox() {
    const navigate = useNavigate();
    const messages = useLoaderData() as Awaited<ReturnType<typeof adminInboxLoader>>;
    const messageCards = messages.results.map((message: Message) => (
        <MessageCard
            key={message.id}
            id={message.id}
            currentStatus={message.status}
            subject={message.subject}
            date={message.date}
            message={message.message}
            name={message.name}
            email={message.email}
        />
    ));

    return (
        <Container maxWidth="lg" component={Grid} direction="column" container>
            <HeroText title="Saapuneet viestit" />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup variant="contained" aria-label="read-and-unread-buttons" size="large">
                    <Button onClick={() => navigate('/admin/saapuneet/')}>Saapuneet</Button>
                    <Button onClick={() => navigate('/admin/saapuneet/?=Luetut')}>Luetut</Button>
                    <Button onClick={() => navigate('/admin/saapuneet/?=Lukemattomat')}>Lukemattomat</Button>
                    <Button onClick={() => navigate('/admin/saapuneet/?=Hoidetut')}>Hoidetut</Button>
                </ButtonGroup>
            </Box>
            <Stack id="admin-messages-stack" sx={{ m: '1rem 0 1rem 0' }}>
                {messageCards}
            </Stack>
        </Container>
    );
}

export default AdminInbox;
