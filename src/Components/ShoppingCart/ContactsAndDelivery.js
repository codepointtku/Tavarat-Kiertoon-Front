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
                    <TextField label="Etunimi" variant="outlined">
                        *
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Sukunimi" variant="outlined">
                        *
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Sähköposti" variant="outlined">
                        *
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Puh. numero" variant="outlined">
                        *
                    </TextField>
                </Grid>
            </Grid>
            <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2, color: 'primary.main' }}>
                Toimitus
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <TextField label="Toimitusosoite" variant="outlined">
                        *
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField label="Toimitustapa" variant="outlined">
                        *
                    </TextField>
                </Grid>
            </Grid>
        </Form>
    );
}

export default ContactsAndDelivery;
