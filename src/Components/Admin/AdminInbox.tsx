import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Stack, Grid, Container, ButtonGroup, Button, Box, Pagination } from '@mui/material';
import HeroText from '../HeroText';
import MessageCard from './MessageCard';
import type { adminInboxLoader } from '../../Router/loaders';
import useCustomSearchParams from '../../Hooks/useCustomSearchParams';

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
    let [searchParams, setSearchParams] = useSearchParams();
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 0, rows: 5 });
    const messages = useLoaderData() as Awaited<ReturnType<typeof adminInboxLoader>>;
    const pageCount = Math.ceil(messages.count / 5);
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

    function handlePageChange(event: React.ChangeEvent<unknown>, newPage: number) {
        setUsedParams && setUsedParams('page', newPage);
    }

    return (
        <Container maxWidth="lg" component={Grid} direction="column" container>
            <HeroText title="Saapuneet viestit" />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup variant="contained" aria-label="read-and-unread-buttons" size="large">
                    <Button onClick={() => setSearchParams('')}>Saapuneet</Button>
                    <Button onClick={() => setSearchParams('Luetut')}>Luetut</Button>
                    <Button onClick={() => setSearchParams('Lukemattomat')}>Lukemattomat</Button>
                    <Button onClick={() => setSearchParams('Hoidetut')}>Hoidetut</Button>
                </ButtonGroup>
            </Box>
            <Stack id="admin-messages-stack" sx={{ m: '1rem 0 1rem 0' }}>
                {messageCards}
            </Stack>
            <Grid justifyContent="center" container>
                <Pagination
                    size="large"
                    color="primary"
                    count={pageCount}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                />
            </Grid>
        </Container>
    );
}

export default AdminInbox;

{
    /* <Grid container justifyContent="space-between">
                <IconButton color="inherit" size="large">
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton color="inherit" size="large">
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid> */
}
