import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { OverridableStringUnion } from '@material-ui/types';
import { Box, Button, ButtonPropsSizeOverrides } from '@mui/material';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddMoreToCart from '../AddMoreToCart';
import type { shoppingCartLoader } from '../../Router/loaders';

interface Props {
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides> | undefined;
    id: number & string;
    groupId: string;
    count: number;
}

function AddToCartButton({ size, id, groupId, count }: Props) {
    const submit = useSubmit();
    const { cart } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const [addedToCart, setAddedToCart] = useState(false);
    const [searchParams] = useSearchParams();
    const { handleSubmit } = useForm();

    // useEffect(() => {
    //     cart?.products?.length === 0 && resetField('amount');
    // }, [cart?.products?.length]);

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
            {cart?.products?.some((product: { group_id: string }) => product['group_id'] === groupId) ? (
                <AddMoreToCart id={id} count={count} size={size} />
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
