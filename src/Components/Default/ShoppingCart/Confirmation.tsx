import { useRouteLoaderData, useSubmit } from 'react-router-dom';
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
        deliveryMethod: string;
        phoneNumber: string;
        orderInfo: string;
        firstName: string;
        lastName: string;
        zipcode: string;
        city: string;
    };
}

interface SubmitFunction {
    (
        SubmitTarget:
            | string
            | { deliveryAddress: string; email: string; phoneNumber: string; id: any; orderInfo: string },
        options: { method: string; action: string }
    ): any;
}

function Confirmation() {
    const { handleSubmit, register } = useForm();
    const submit = useSubmit() as unknown as SubmitFunction;
    const { state } = useStateMachine({ Update }) as unknown as CartState;
    const { products } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const { id } = useRouteLoaderData('shoppingCart') as Awaited<ReturnType<typeof shoppingProcessLoader>>;
    // laita order tekstinä vain submittiin.

    const onSubmit = async () => {
        const { email, deliveryAddress, phoneNumber, orderInfo } = state;
        submit({ deliveryAddress, email, phoneNumber, id, orderInfo }, { method: 'post', action: '/ostoskori/vaihe3' });
        submit('order', { method: 'put', action: '/' });
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
                    {products?.map((item: { id: number; count: number; name: string }) => (
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
