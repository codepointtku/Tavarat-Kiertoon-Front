import { useContext, useState } from 'react';
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useRouteLoaderData, useSearchParams, useFetcher, Link } from 'react-router-dom';

import { Box, CircularProgress, IconButton, Typography } from '@mui/material';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

import AddMoreToCart from '../AddMoreToCart';
import Tooltip from '../Tooltip';

import AuthContext from '../../Context/AuthContext';

import type { shoppingCartLoader } from '../../Router/loaders';
import type { OverridableStringUnion } from '@material-ui/types';
import type { ButtonPropsSizeOverrides } from '@mui/material';

interface Props {
    size: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides> | undefined;
    id: number & string;
    groupId: number;
    count?: number;
}

function AddingToCart() {
    // "disableShrink" -prop helps out on under heavy CPU loads.
    // this dev-machine is under heavy load because it's running backend with Docker.
    // the animations behaviour should be tested when one is loading only FE @ browser,
    // and the backend is on the server.
    // Incase the processing speed is fine in real life situation, slash out the prop for smoother animation.

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                // hack padding to reduce "product information"-IconButton jumping
                padding: '0rem 0.28rem',
            }}
        >
            <Typography variant="body2">Lisätään koriin...</Typography>
            <CircularProgress size={28} disableShrink />
        </Box>
    );
}

function AddToCartButton({ size, id, groupId /*, count */ }: Props) {
    const { cart, products } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const { auth } = useContext(AuthContext);
    const { username } = auth;

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const [searchParams] = useSearchParams();
    const { handleSubmit } = useForm();
    const fetcher = useFetcher();

    const product = products?.find((product_item: { product: { id: number } }) => product_item.product.id == id);

    const onSubmit = async () => {
        if (username) {
            setIsAddedToCart(true);
            fetcher.submit(
                { id },
                {
                    method: 'put',
                    action: '/?' + searchParams.toString(),
                }
            );
            return;
        }
        return;
    };

    // this useEffect is responsible for deciding which action button is being rendered.
    // problem: heavy af - say there are 25 products per page. Now you have 25 useEffects checking for products availability.
    //  now say there are 100 products per page: that's 100 useEffects

    useEffect(() => {
        setIsAddedToCart(false);
    }, [product?.available]);

    return (
        <>
            {username ? (
                <>
                    {cart?.product_items?.some((product_item) => product_item?.product.id === groupId) ? (
                        <AddMoreToCart id={id} maxCount={product?.product?.amount} size={size} count={product.count} />
                    ) : (
                        <>
                            {isAddedToCart ? (
                                <AddingToCart />
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <IconButton type="submit" color="primary" disabled={isAddedToCart}>
                                        <AddShoppingCartOutlinedIcon fontSize={'large'} />
                                    </IconButton>
                                </form>
                            )}
                        </>
                    )}
                </>
            ) : (
                <Tooltip title="Kirjaudu sisään käyttääksesi ostoskoria">
                    <IconButton color="primary" component={Link} to={'/kirjaudu'}>
                        <AddShoppingCartOutlinedIcon fontSize={'large'} />
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
}

export default AddToCartButton;
