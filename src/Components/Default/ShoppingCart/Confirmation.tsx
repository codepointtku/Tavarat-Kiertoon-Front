import { useEffect } from 'react';
import { useRouteLoaderData, useSubmit, useActionData, useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, List, ListItem, ListItemText } from '@mui/material';
import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';

import CartButtons from './CartButtons';
import type { shoppingCartLoader } from '../../../Router/loaders';
import type { shoppingProcessLoader } from '../../../Router/loaders';
import TypographyTitle from '../../TypographyTitle';
import type { AnyCallback, ActionsOutput, GlobalState } from 'little-state-machine/dist/types';
import ClearInfo from './ClearInfo';

interface CartState {
    email: string;
    deliveryAddress: string;
    deliveryRequired: string;
    phoneNumber: string;
    orderInfo: string;
    firstName: string;
    lastName: string;
    zipcode: string;
    city: string;
    fetchDate: string;
}

function Confirmation() {
    const { handleSubmit, register } = useForm();
    const submit = useSubmit();
    const navigate = useNavigate();
    const responseStatus = useActionData() as { type: string; status: boolean };
    const { actions, state } = useStateMachine({ ClearInfo }) as unknown as {
        actions: ActionsOutput<
            AnyCallback,
            { ClearInfo: (state: GlobalState, actions: CartState) => { data: CartState } }
        >;
        state: CartState;
    };
    const fetchDate = new Date(state.fetchDate);
    const { products } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const { id } = useRouteLoaderData('shoppingCart') as Awaited<ReturnType<typeof shoppingProcessLoader>>;

    const onSubmit = async () => {
        const { email, deliveryAddress, phoneNumber, orderInfo, deliveryRequired } = state;
        submit(
            { email, deliveryAddress, phoneNumber, id: id.toString(), orderInfo, deliveryRequired },
            { method: 'post', action: '/ostoskori/vaihe3' }
        );
    };

    useEffect(() => {
        if (responseStatus?.status) {
            actions.ClearInfo();
            navigate('/', { state: { ...responseStatus } });
        }
    }, [responseStatus]);

    console.log(state);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '-2rem' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TypographyTitle text="Tilauksen yhteenveto" />
                <Box
                    sx={{
                        margin: '1rem 0 2rem 0',
                        p: '2rem',
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
                        {state.fetchDate && (
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Toimituspäivä: {fetchDate.toLocaleDateString('fi-FI')}
                                </Typography>
                            </Grid>
                        )}
                        {state.orderInfo && (
                            <Grid item>
                                <Typography variant="subtitle1">Lisätiedot: {state.orderInfo}</Typography>
                            </Grid>
                        )}
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
                <Typography variant="subtitle2" align="center">
                    Tilausvahvistus lähetetään sähköpostiin.
                </Typography>
                <CartButtons backText="Takaisin" forwardText="Vahvista" />
            </form>
        </Box>
    );
}

export default Confirmation;
