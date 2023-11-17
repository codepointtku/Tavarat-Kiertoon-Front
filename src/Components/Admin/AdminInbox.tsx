import * as React from 'react';
import { useLoaderData } from 'react-router-dom';

import { Stack, Container } from '@mui/material';

import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';
import MessageCard from './MessageCard';

import MailIcon from '@mui/icons-material/Mail';

import type { adminInboxLoader } from '../../Router/loaders';

function AdminInbox() {
    const messages = useLoaderData() as Awaited<ReturnType<typeof adminInboxLoader>>;

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

    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<MailIcon />} hideInAdmin />
            <HeroText title="Saapuneet viestit" subtext="Ota yhteyttä-lomakkeen kautta lähetetyt viestit" />
            <Stack id="admin-messages-stack" sx={{ m: '1rem 0 1rem 0' }}>
                {messageCards}
            </Stack>
        </Container>
    );
}

export default AdminInbox;
