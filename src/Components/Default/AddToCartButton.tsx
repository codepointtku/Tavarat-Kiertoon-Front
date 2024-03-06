import { useContext, useRef, useEffect } from 'react';
import { useRouteLoaderData, useSearchParams, useFetcher, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Box, CircularProgress, IconButton } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

import AddMoreToCart from '../AddMoreToCart';
import Tooltip from '../Tooltip';

import AuthContext from '../../Context/AuthContext';

import type { OverridableStringUnion } from '@material-ui/types';
import type { ButtonPropsSizeOverrides } from '@mui/material';
import type { shoppingCartLoader } from '../../Router/loaders';

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
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                // hack padding to reduce "product information"-IconButton jumping
                padding: '0rem 0.28rem',
            }}
        >
            <CircularProgress size={28} disableShrink />
        </Box>
    );
}

function AddToCartButton({ size, id, groupId /*, count */ }: Props) {
    const { cart, products: productsInShoppingCart } = useRouteLoaderData('frontPage') as Awaited<
        ReturnType<typeof shoppingCartLoader>
    >;
    const { auth } = useContext(AuthContext);
    const { username } = auth;

    const ref = useRef(0);

    const [searchParams] = useSearchParams();
    const fetcher = useFetcher();

    const {
        handleSubmit,
        // formState: { isSubmitting, isSubmitSuccessful },
    } = useForm();

    const product = productsInShoppingCart?.find(
        (product_item: { product: { id: number } }) => product_item.product.id == id
    );

    const onSubmit = () => {
        fetcher.submit(
            { id },
            {
                method: 'put',
                action: '/?' + searchParams.toString(),
            }
        );

        ref.current = 1;

        return;
    };

    useEffect(() => {
        ref.current = 0;
    }, [product?.available]);

    return (
        <>
            {username ? (
                <>
                    {cart?.product_items?.some((product_item) => product_item?.product.id === groupId) ? (
                        <AddMoreToCart id={id} maxCount={product?.product?.amount} size={size} count={product.count} />
                    ) : (
                        <>
                            {ref.current === 1 ? (
                                <AddingToCart />
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Tooltip title="Lisää koriin">
                                        <IconButton type="submit" color="primary" disabled={ref.current === 1}>
                                            <AddShoppingCartOutlinedIcon fontSize={'large'} />
                                        </IconButton>
                                    </Tooltip>
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
