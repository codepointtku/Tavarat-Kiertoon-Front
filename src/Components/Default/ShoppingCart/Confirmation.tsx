import { useEffect } from 'react';
import { useRouteLoaderData, useSubmit, useActionData, useNavigate } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemText, Container, Stack } from '@mui/material';
import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';

import CartButtons from './CartButtons';
import type { shoppingCartLoader } from '../../../Router/loaders';
import type { shoppingProcessLoader } from '../../../Router/loaders';
import TypographyTitle from '../../TypographyTitle';
import type { AnyCallback, ActionsOutput, GlobalState } from 'little-state-machine/dist/types';
import ClearInfo from './ClearInfo';
import TypographyHeading from '../../TypographyHeading';
import CartEmptyWarningModal from './CartEmptyWarningModal';

interface CartState {
    recipient: string;
    deliveryAddress: string;
    deliveryRequired: string;
    recipient_phone_number: string;
    recipient_workplace: string;
    orderInfo: string;
    firstName: string;
    lastName: string;
    zip_code: string;
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
        const {
            recipient,
            deliveryAddress,
            zip_code,
            city,
            recipient_phone_number,
            recipient_workplace,
            orderInfo,
            deliveryRequired /* fetchDate */,
            fetchDate,
        } = state;

        const new_orderInfo = recipient_workplace
            ? 'TOIMIPAIKKA: ' + recipient_workplace + '\n' + orderInfo
            : orderInfo;
        if (deliveryAddress === '') {
            submit(
                {
                    recipient,
                    deliveryAddress: 'nouto ' + fetchDate, // creates a placeholder for backend
                    zip_code,
                    city,
                    recipient_phone_number,
                    recipient_workplace,
                    id: id.toString(),
                    orderInfo: new_orderInfo,
                    deliveryRequired,
                    fetchDate,
                },
                { method: 'post', action: '/ostoskori/vaihe3' }
            );
            return;
        }

        submit(
            {
                recipient,
                deliveryAddress,
                zip_code,
                city,
                recipient_phone_number,
                id: id.toString(),
                orderInfo: new_orderInfo,
                deliveryRequired,
                // fetchDate,
            },
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
        <>
            {products.length === 0 && <CartEmptyWarningModal />}

            {responseStatus?.type === 'orderCreated' && responseStatus?.status === false && <CartEmptyWarningModal />}

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
                            <Stack spacing={2} padding={'1rem 1rem 1rem 1rem'}>
                                <Typography variant="subtitle1" {...register('recipient')}>
                                    {state.recipient}
                                </Typography>
                                <Typography variant="subtitle1" {...register('recipient_phone_number')}>
                                    {state.recipient_phone_number}
                                </Typography>
                                <Typography variant="subtitle1" {...register('recipient_workplace')}>
                                    {state.recipient_workplace}
                                </Typography>
                            </Stack>

                            <TypographyHeading text="Toimitustiedot" />
                            {state.deliveryRequired === 'true' ? (
                                <Stack direction="row" spacing={'1rem'} padding={'1rem'}>
                                    <Typography variant="subtitle1">
                                        {state.deliveryAddress} {state.zip_code} {state.city}
                                    </Typography>
                                </Stack>
                            ) : (
                                <Typography variant="subtitle1" sx={{ padding: '1rem' }}>
                                    Nouto: {state.fetchDate}
                                </Typography>
                            )}

                            {state.orderInfo && (
                                <Typography
                                    id="order-additional-info-textfield"
                                    variant="subtitle1"
                                    sx={{
                                        wordBreak: 'break-all',
                                        whiteSpace: 'pre-wrap',
                                        margin: '0rem 0 1rem 0',
                                        padding: '0 0 0 1rem',
                                    }}
                                >
                                    Lisätiedot: {state.orderInfo}
                                </Typography>
                            )}

                            <TypographyHeading text="Tuotteet" />
                            {products.length === 0 ? (
                                <Typography sx={{ padding: '1rem 0 0 1rem' }}>Ostoskori on tyhjennetty</Typography>
                            ) : (
                                <List sx={{ padding: '1rem 1rem 0 1rem' }}>
                                    {products?.map(
                                        (product_item: { count: number; product: { id: number; name: string } }) => (
                                            <ListItem key={product_item.product.id} disableGutters disablePadding>
                                                <ListItemText
                                                    primary={`${product_item.count}x ${product_item.product.name}`}
                                                />
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            )}
                        </Box>
                        <Typography variant="subtitle2" align="center">
                            Tilausvahvistus lähetetään sähköpostiin.
                        </Typography>
                        <CartButtons
                            backText="Takaisin"
                            forwardText="Vahvista"
                            isSubmitted={isSubmitted}
                            // cartEmpty={products.length === 0}
                        />
                    </form>
                </Box>
            </Container>
        </>
    );
}

export default Confirmation;
