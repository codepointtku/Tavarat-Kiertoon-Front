import { Form } from 'react-router-dom';
import { Typography } from '@mui/material';

function ContactsAndDelivery() {
    return (
        <Form method="post">
            <Typography variant="h4">Yhteystiedot</Typography>
            <Typography variant="h4">Toimitus</Typography>
        </Form>
    );
}

export default ContactsAndDelivery;
