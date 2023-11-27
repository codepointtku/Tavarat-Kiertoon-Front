import { useContext } from 'react';
// import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useRouteLoaderData, useSearchParams, useFetcher } from 'react-router-dom';

import { /*Button,*/ IconButton } from '@mui/material';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

import AddMoreToCart from '../AddMoreToCart';

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

function AddToCartButton({ size, id, groupId /*, count */ }: Props) {
    const { cart, products } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const { auth } = useContext(AuthContext);
    const { username } = auth;

    // const [addedToCart, setAddedToCart] = useState(false);
    // const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
    const [searchParams] = useSearchParams();
    const { handleSubmit } = useForm();
    const fetcher = useFetcher();

    const product = products?.find((product_item: { product: { id: number } }) => product_item.product.id == id);

    const onSubmit = async () => {
        if (username) {
            fetcher.submit(
                { id },
                {
                    method: 'put',
                    action: '/?' + searchParams.toString(),
                }
            );
            // setAddedToCart(true);
        }
        // else {
        //     setIsNotLoggedIn((isNotLoggedIn) => !isNotLoggedIn);
        // }
    };

    // useEffect(() => {
    //     setAddedToCart(false);
    // }, [product?.available]);

    return (
        <>
            {cart?.product_items?.some((product_item) => product_item?.product.id === groupId) ? (
                <AddMoreToCart id={id} maxCount={product?.product?.amount} size={size} count={product.count} />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <Button
                        size={size}
                        aria-label="add to shopping cart"
                        startIcon={<AddShoppingCartOutlinedIcon />}
                        type="submit"
                        disabled={addedToCart}
                    >
                        Lisää koriin
                    </Button> */}
                    <IconButton type="submit" color="primary">
                        <AddShoppingCartOutlinedIcon fontSize={'large'} />
                    </IconButton>
                </form>
            )}
        </>
    );
}

export default AddToCartButton;
