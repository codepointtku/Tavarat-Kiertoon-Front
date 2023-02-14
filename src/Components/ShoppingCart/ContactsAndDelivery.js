import { Form } from 'react-router-dom';
import { Typography, TextField, Grid } from '@mui/material';

function ContactsAndDelivery() {
    return (
        <Form method="post">
            <Typography variant="h4">Yhteystiedot</Typography>
            <Grid container>
                <TextField label="Etunimi" variant="outlined">
                    *
                </TextField>
                <TextField label="Sukunimi" variant="outlined">
                    *
                </TextField>
                <TextField label="Sähköposti" variant="outlined">
                    *
                </TextField>
                <TextField label="Puh. numero" variant="outlined">
                    *
                </TextField>
            </Grid>
            <Typography variant="h4">Toimitus</Typography>
            <Grid container>
                <TextField label="Toimitusosoite" variant="outlined">
                    *
                </TextField>
                <TextField label="Toimitustapa" variant="outlined">
                    *
                </TextField>
            </Grid>
        </Form>
    );
}

export default ContactsAndDelivery;
