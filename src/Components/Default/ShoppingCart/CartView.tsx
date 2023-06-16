import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Grid, Typography, ButtonPropsSizeOverrides, Divider } from '@mui/material';

import CartButtons from './CartButtons';
import AddMoreToCart from '../../AddMoreToCart';
import { OverridableStringUnion } from '@material-ui/types';
import type { shoppingCartLoader } from '../../../Router/loaders';
import TypographyHeading from '../../TypographyHeading';
import { ShoppingCartAvailableAmountList } from '../../../api';

interface CartProduct {
    product: { id: number };
}

function CartView() {
    const navigate = useNavigate();
    const { products: cartProducts, amountList } = useRouteLoaderData('frontPage') as Awaited<
        ReturnType<typeof shoppingCartLoader>
    >;
    const { handleSubmit } = useForm();

    const onSubmit = () => {
        navigate('/ostoskori/vaihe2');
    };

    return (
        <>
            <Grid container direction="row" justifyContent="space-around">
                {cartProducts?.length === 0 ? (
                    <TypographyHeading text="Ostoskorisi on tyhjä." />
                ) : (
                    <>
                        <Grid container direction="column" sx={{ width: 'auto' }}>
                            {cartProducts?.map((product_item: { product: { name: string; id: number } }) => (
                                <Grid item key={product_item.product.id}>
                                    <Typography variant="h6" sx={{ p: 0.5 }} key={product_item.product.id}>
                                        {product_item.product.name}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container direction="column" gap={1.5} sx={{ width: 'auto' }}>
                            {cartProducts?.map((product_item: { count: number; product: { id: number & string } }) => {
                                const product = amountList.find(
                                    (p) => p.id == product_item.product.id
                                ) as ShoppingCartAvailableAmountList;
                                return (
                                    <AddMoreToCart
                                        key={product_item.product.id}
                                        id={product_item.product.id}
                                        count={product_item.count}
                                        maxCount={product.amount}
                                        size={
                                            'small' as OverridableStringUnion<
                                                'small' | 'medium' | 'large',
                                                ButtonPropsSizeOverrides
                                            >
                                        }
                                        inOrderingProcess={true}
                                    />
                                );
                            })}
                        </Grid>
                    </>
                )}
            </Grid>
            <Divider sx={{ margin: '1rem 0 1rem 0' }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CartButtons backText="Jatka ostoksia" forwardText="Seuraava" cartEmpty={cartProducts?.length === 0} />
            </form>
        </>
    );
}

export default CartView;
