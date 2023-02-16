import { Form } from 'react-router-dom';
import { Typography, TextField, Grid } from '@mui/material';

function ContactsAndDelivery() {
    return (
        <Form method="post">
            <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main' }}>
                Yhteystiedot
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField label="Etunimi" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField label="Sukunimi" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField label="Sähköposti" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField label="Puh. numero" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField label="Toimipaikkakoodi" variant="outlined" />
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2, color: 'primary.main' }}>
                Toimitus
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField label="Toimitusosoite" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField label="Toimitustapa" variant="outlined" />
                </Grid>
            </Grid>
        </Form>
    );
}

export default ContactsAndDelivery;
