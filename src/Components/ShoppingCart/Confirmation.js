import { Typography, Grid } from '@mui/material';
import { Form } from 'react-router-dom';

function Confirmation() {
    return (
        <Form method="post">
            <Typography variant="h4" color="primary.main">
                Ostosten yhteenveto
            </Typography>
            <hr />
            <Typography variant="h6">Yhteystiedot</Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <Typography variant="subtitle1">Sähköposti</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">Puh. numero</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">Toimipaikkakoodi</Typography>
                </Grid>
            </Grid>
            <Typography variant="h6">Toimitustiedot</Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <Typography variant="subtitle1">Toimitusosoite</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">Toimitustapa</Typography>
                </Grid>
            </Grid>
            <Typography variant="h6">Tilaustiedot</Typography>
            <Grid container spacing={4}>
                <Grid item>
                    <Typography variant="subtitle1">Tuotenimi</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">Tuotemäärä</Typography>
                </Grid>
            </Grid>
        </Form>
    );
}

export default Confirmation;
