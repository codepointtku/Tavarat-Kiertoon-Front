import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

import CartButtons from './CartButtons';

function Confirmation() {
    const { handleSubmit } = useForm();

    const navigate = useNavigate();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" color="primary.main">
                Ostosten yhteenveto
            </Typography>
            <hr />
            <Box
                sx={{
                    mt: 5,
                    p: 5,
                    borderStyle: 'solid',
                    borderWidth: 5,
                    borderRadius: 5,
                    width: 600,
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.light',
                }}
            >
                <Typography variant="overline" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    Yhteystiedot
                </Typography>
                <Grid container direction="row" spacing={2}>
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
                <Typography variant="overline" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    Toimitustiedot
                </Typography>
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1">Toimitusosoite</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Postiosoite</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Kaupunki</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Toimitustapa</Typography>
                    </Grid>
                </Grid>
                <Typography variant="overline" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    Tilaustiedot
                </Typography>
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1">Tuotenimi</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Tuotemäärä</Typography>
                    </Grid>
                </Grid>
            </Box>
            <CartButtons backText="Takaisin" forwardText="Vahvista" />
        </form>
    );
}

export default Confirmation;
