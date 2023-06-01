import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { type OverridableStringUnion } from '@material-ui/types';
import { Box, Button, type ButtonPropsSizeOverrides } from '@mui/material';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddMoreToCart from '../AddMoreToCart';
import type { shoppingCartLoader } from '../../Router/loaders';

interface Props {
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides> | undefined;
    id: number & string;
    groupId: number;
    count: number;
}

function AddToCartButton({ size, id, groupId, count }: Props) {
    const submit = useSubmit();
    const { cart, products } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const [, setAddedToCart] = useState(false);
    const [searchParams] = useSearchParams();
    const { handleSubmit } = useForm();

    const product = products?.find((product: { id: number }) => product.id === id);

    const onSubmit = async () => {
        submit(
            { id },
            {
                method: 'put',
                action: '/?' + searchParams.toString(),
            }
        );
        setAddedToCart(true);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {cart?.product_items?.some((product_item) => product_item?.product.id === groupId) ? (
                <AddMoreToCart id={id} maxCount={count} size={size} count={product?.product?.amount} />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Button
                        size={size}
                        aria-label="add to shopping cart"
                        startIcon={<AddShoppingCartOutlinedIcon />}
                        type="submit"
                    >
                        Lisää koriin
                    </Button>
                </form>
            )}
        </Box>
    );
}

export default AddToCartButton;
