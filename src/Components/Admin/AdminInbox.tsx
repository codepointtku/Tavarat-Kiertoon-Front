import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Stack, Grid, Container, ButtonGroup, Button, Box, Pagination } from '@mui/material';
import HeroText from '../HeroText';
import MessageCard from './MessageCard';

import MailIcon from '@mui/icons-material/Mail';

import HeroHeader from '../HeroHeader';

import type { adminInboxLoader } from '../../Router/loaders';
// interface Message {
//     subject: string;
//     date: Date & string;
//     message: string;
//     id: number;
//     status: string;
//     name: string;
//     email: string;
// }

function AdminInbox() {
    const [searchParams, setSearchParams] = useSearchParams();
    const messages = useLoaderData() as Awaited<ReturnType<typeof adminInboxLoader>>;
    const pageCount = messages?.count && Math.ceil(messages.count / 5);
    const url = window.location.href;
    const messageCards = messages?.results?.map((message) => {
        const date = new Date(message.date);
        const dateInfo = [];
        dateInfo.push(date.toLocaleDateString());
        dateInfo.push(date.toLocaleTimeString());
        return (
            <MessageCard
                key={message.id}
                id={message.id.toString()}
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
        if (searchParams.has('tila')) {
            assignedParams = {
                tila: searchParams.get('tila') as string,
                sivu: String(newPage),
            };
        } else {
            assignedParams = { sivu: String(newPage) };
        }
        setSearchParams(assignedParams);
    }

    return (
        <Container maxWidth="lg" component={Grid} direction="column" container>
            <HeroHeader Icon={<MailIcon />} hideInAdmin />
            <HeroText title="Saapuneet viestit" />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup
                    id="inbox-btns"
                    variant="contained"
                    aria-label="read-and-unread-buttons"
                    size="large"
                    sx={{ marginBottom: '1rem' }}
                >
                    <Button
                        sx={{
                            backgroundColor:
                                url.endsWith('saapuneet') || url.includes('saapuneet?page')
                                    ? 'primary.dark'
                                    : 'primary',
                        }}
                        onClick={() => setSearchParams('')}
                    >
                        Saapuneet
                    </Button>
                    <Button
                        sx={{ backgroundColor: searchParams.get('tila') === 'Luetut' ? 'primary.dark' : 'primary' }}
                        onClick={() => setSearchParams({ tila: 'Luetut' })}
                    >
                        Luetut
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: searchParams.get('tila') === 'Lukemattomat' ? 'primary.dark' : 'primary',
                        }}
                        onClick={() => setSearchParams({ tila: 'Lukemattomat' })}
                    >
                        Lukemattomat
                    </Button>
                    <Button
                        sx={{ backgroundColor: searchParams.get('tila') === 'Hoidetut' ? 'primary.dark' : 'primary' }}
                        onClick={() => setSearchParams({ tila: 'Hoidetut' })}
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
