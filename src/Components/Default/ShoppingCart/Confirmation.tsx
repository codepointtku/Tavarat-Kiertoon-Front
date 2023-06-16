import { useEffect } from 'react';
import { useRouteLoaderData, useSubmit, useActionData, useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, List, ListItem, ListItemText } from '@mui/material';
import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';

import Update from './Update';
import CartButtons from './CartButtons';
import type { shoppingCartLoader } from '../../../Router/loaders';
import type { shoppingProcessLoader } from '../../../Router/loaders';

interface CartState {
    state: {
        email: string;
        deliveryAddress: string;
        deliveryRequired: string;
        phoneNumber: string;
        orderInfo: string;
        firstName: string;
        lastName: string;
        zipcode: string;
        city: string;
    };
}

function Confirmation() {
    const { handleSubmit, register } = useForm();
    const submit = useSubmit();
    const navigate = useNavigate();
    const responseStatus = useActionData() as { type: string; status: boolean };
    const { state } = useStateMachine({ Update }) as unknown as CartState;
    const { products } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const { id } = useRouteLoaderData('shoppingCart') as Awaited<ReturnType<typeof shoppingProcessLoader>>;

    const onSubmit = async () => {
        const { email, deliveryAddress, phoneNumber, orderInfo } = state;
        submit(
            { deliveryAddress, email, phoneNumber, id: id.toString(), orderInfo },
            { method: 'post', action: '/ostoskori/vaihe3' }
        );
    };

    useEffect(() => {
        if (responseStatus?.status === true) {
            navigate('/', { state: { ...responseStatus } });
        }
    }, [responseStatus]);

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
                        <Typography variant="subtitle1">
                            Toimitustapa: {state.deliveryRequired === 'true' ? 'Kuljetus' : 'Nouto'}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="overline" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    Tilaustiedot
                </Typography>
                <List>
                    {products?.map((product_item: { count: number; product: { id: number; name: string } }) => (
                        <ListItem key={product_item.product.id} disableGutters disablePadding>
                            <ListItemText primary={`${product_item.count}x ${product_item.product.name}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <CartButtons backText="Takaisin" forwardText="Vahvista" />
        </form>
    );
}

export default Confirmation;
