import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Typography, Grid, Box, List, ListItem, ListItemText } from '@mui/material';
import { useStateMachine } from 'little-state-machine';
import Update from './Update';
import { useForm } from 'react-hook-form';

import CartButtons from './CartButtons';

function Confirmation() {
    const { handleSubmit } = useForm();
    const { state } = useStateMachine({ Update });
    const { cartItems } = useRouteLoaderData('frontPage');

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
                    maxWidth: 900,
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.light',
                }}
            >
                <Typography variant="overline" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    Vastaanottajan Yhteystiedot
                </Typography>
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Nimi: {state.firstName} {state.lastName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Sähköposti: {state.email}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Puh. numero: {state.phoneNumber}</Typography>
                    </Grid>
                </Grid>
                <Typography variant="overline" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    Toimitustiedot
                </Typography>
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1">Toimitusosoite: {state.deliveryAddress}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Postiosoite: {state.zipCode}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Kaupunki: {state.city}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Toimitustapa: {state.deliveryMethod}</Typography>
                    </Grid>
                </Grid>
                <Typography variant="overline" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    Tilaustiedot
                </Typography>
                <List>
                    {cartItems?.map((item) => (
                        <ListItem disableGutters disablePadding>
                            <ListItemText primary={`${item.count}x ${item.name}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <CartButtons backText="Takaisin" forwardText="Vahvista" />
        </form>
    );
}

export default Confirmation;
