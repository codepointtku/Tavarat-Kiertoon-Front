import { useEffect } from 'react';
import { useRouteLoaderData, useSubmit, useActionData, useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, List, ListItem, ListItemText, Container, Stack } from '@mui/material';
import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';

import CartButtons from './CartButtons';
import type { shoppingCartLoader } from '../../../Router/loaders';
import type { shoppingProcessLoader } from '../../../Router/loaders';
import TypographyTitle from '../../TypographyTitle';
import type { AnyCallback, ActionsOutput, GlobalState } from 'little-state-machine/dist/types';
import ClearInfo from './ClearInfo';
import TypographyHeading from '../../TypographyHeading';

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
    const {
        handleSubmit,
        register,
        formState: { isSubmitted },
    } = useForm();
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
    // const fetchDate = new Date(state.fetchDate);
    const { products } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const { id } = useRouteLoaderData('shoppingCart') as Awaited<ReturnType<typeof shoppingProcessLoader>>;

    const onSubmit = async () => {
        const { email, deliveryAddress, phoneNumber, orderInfo, deliveryRequired, fetchDate } = state;
        submit(
            { email, deliveryAddress, phoneNumber, id: id.toString(), orderInfo, deliveryRequired, fetchDate },
            { method: 'post', action: '/ostoskori/vaihe3' }
        );
    };

    useEffect(() => {
        if (responseStatus?.status) {
            // actions.ClearInfo();
            navigate('/', { state: { ...responseStatus } });
        }
    }, [responseStatus]);

    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '-2rem' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TypographyTitle text="Tilauksen yhteenveto" />
                    <Box
                        sx={{
                            // minWidth: 420,
                            margin: '1rem 0 2rem 0',
                            p: '2rem',
                            borderStyle: 'dashed',
                            borderWidth: '0.1rem',
                            borderRadius: '1rem',
                            borderColor: 'primary.main',
                        }}
                    >
                        <TypographyHeading text="Vastaanottajan yhteystiedot" />
                        <Stack spacing={2} padding={'1rem'}>
                            <Typography variant="subtitle1">
                                {state.firstName} {state.lastName}
                            </Typography>
                            <Typography variant="subtitle1" {...register('contact')}>
                                {state.email}
                            </Typography>
                            <Typography variant="subtitle1">{state.phoneNumber}</Typography>
                        </Stack>

                        <TypographyHeading text="Toimitustiedot" />
                        <Stack direction="row" spacing={'1rem'} padding={'1rem'}>
                            <Typography variant="subtitle1">{state.deliveryAddress}</Typography>
                            <span>/</span>
                            <Typography variant="subtitle1">{state.zipcode}</Typography>
                            <span>/</span>
                            <Typography variant="subtitle1">{state.city}</Typography>
                        </Stack>
                        <Stack padding={'0rem 1rem 1rem 1rem'}>
                            <Typography variant="subtitle1">
                                {state.deliveryRequired === 'true' ? 'Kuljetus' : `Nouto: ${state.fetchDate}`}
                            </Typography>

                            {state.orderInfo && (
                                <Typography
                                    id="order-additional-info-textfield"
                                    variant="subtitle1"
                                    sx={{
                                        wordBreak: 'break-all',
                                        whiteSpace: 'pre-wrap',
                                        margin: '1rem 0 0 0',
                                    }}
                                >
                                    Lisätiedot: {state.orderInfo}
                                </Typography>
                            )}
                        </Stack>

                        <TypographyHeading text="Tuotteet" />
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
                    <CartButtons backText="Takaisin" forwardText="Vahvista" isSubmitted={isSubmitted} />
                </form>
            </Box>
        </Container>
    );
}

export default Confirmation;
