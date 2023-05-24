import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Stack, Grid, Container, ButtonGroup, Button, Box, Pagination } from '@mui/material';
import HeroText from '../HeroText';
import MessageCard from './MessageCard';
import type { adminInboxLoader } from '../../Router/loaders';

interface Message {
    subject: string;
    date: Date & string;
    message: string;
    id: string;
    status: string;
    name: string;
    email: string;
}

function AdminInbox() {
    const [searchParams, setSearchParams] = useSearchParams();
    const messages = useLoaderData() as Awaited<ReturnType<typeof adminInboxLoader>>;
    const pageCount = Math.ceil(messages.count / 5);
    const url = window.location.href;
    const messageCards = messages.results.map((message: Message) => {
        const date = new Date(message.date);
        const dateInfo = [];
        dateInfo.push(date.toLocaleDateString());
        dateInfo.push(date.toLocaleTimeString());
        return (
            <MessageCard
                key={message.id}
                id={message.id}
                currentStatus={message.status}
                subject={message.subject}
                date={dateInfo}
                message={message.message}
                name={message.name}
                email={message.email}
            />
        );
    });

    function handlePageChange(event: React.ChangeEvent<unknown>, newPage: number) {
        let assignedParams;
        if (searchParams.has('status')) {
            console.log(...searchParams);
            assignedParams = { page: String(newPage) };
        } else {
            assignedParams = { page: String(newPage) };
        }
        setSearchParams(assignedParams);
    }

    return (
        <Container maxWidth="lg" component={Grid} direction="column" container>
            <HeroText title="Saapuneet viestit" />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup variant="contained" aria-label="read-and-unread-buttons" size="large">
                    <Button
                        sx={{
                            backgroundColor:
                                url.endsWith('saapuneet') || url.includes('saapuneet?page') ? '#476282' : 'primary',
                        }}
                        onClick={() => setSearchParams('')}
                    >
                        Saapuneet
                    </Button>
                    <Button
                        sx={{ backgroundColor: searchParams.get('status') === 'Luetut' ? '#476282' : 'primary' }}
                        onClick={() => setSearchParams({ status: 'Luetut' })}
                    >
                        Luetut
                    </Button>
                    <Button
                        sx={{ backgroundColor: searchParams.get('status') === 'Lukemattomat' ? '#476282' : 'primary' }}
                        onClick={() => setSearchParams({ status: 'Lukemattomat' })}
                    >
                        Lukemattomat
                    </Button>
                    <Button
                        sx={{ backgroundColor: searchParams.get('status') === 'Hoidetut' ? '#476282' : 'primary' }}
                        onClick={() => setSearchParams({ status: 'Hoidetut' })}
                    >
                        Hoidetut
                    </Button>
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
