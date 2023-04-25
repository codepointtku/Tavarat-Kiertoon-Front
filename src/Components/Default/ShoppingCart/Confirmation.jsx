import { useRouteLoaderData, useSubmit } from 'react-router-dom';
import { Typography, Grid, Box, List, ListItem, ListItemText } from '@mui/material';
import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';

import Update from './Update';
import CartButtons from './CartButtons';

function Confirmation() {
    const { handleSubmit, register } = useForm();
    const { state } = useStateMachine({ Update });
    const { products } = useRouteLoaderData('frontPage');
    const { id } = useRouteLoaderData('shoppingCart');
    const submit = useSubmit();
    const order = 'order';

    const onSubmit = async () => {
        const { email, deliveryAddress, phoneNumber, orderInfo } = state;
        submit({ deliveryAddress, email, phoneNumber, id, orderInfo }, { method: 'post', action: '/ostoskori/vaihe3' });
        submit({ order }, { method: 'put', action: '/' });
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
                        <Typography variant="subtitle1" {...register('contact')}>
                            Sähköposti: {state.email}
                        </Typography>
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
                        <Typography variant="subtitle1">Postiosoite: {state.zipcode}</Typography>
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
                    {products?.map((item) => (
                        <ListItem key={item.id} disableGutters disablePadding>
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
