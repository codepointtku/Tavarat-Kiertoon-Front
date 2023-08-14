import { useEffect, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { Grid, Typography, type ButtonPropsSizeOverrides, Divider } from '@mui/material';

import CartButtons from './CartButtons';
import AddMoreToCart from '../../AddMoreToCart';
import type { OverridableStringUnion } from '@material-ui/types';
import type { shoppingCartLoader } from '../../../Router/loaders';
import TypographyHeading from '../../TypographyHeading';
import type { ShoppingCartAvailableAmountList } from '../../../api';
import ClearInfo from './ClearInfo';

function CartView() {
    const navigate = useNavigate();
    const { actions } = useStateMachine({ ClearInfo });
    const { products: cartProducts, amountList } = useRouteLoaderData('frontPage') as Awaited<
        ReturnType<typeof shoppingCartLoader>
    >;
    const { handleSubmit } = useForm();
    const [unconfirmedChangesCartProducts, setUnconfirmedChangesCartProducts] = useState(initializeCartProducts());

    useEffect(() => {
        if (sessionStorage.getItem('__LSM__') === null) {
            actions.ClearInfo();
        }
    }, []);

    const onSubmit = () => {
        navigate('/ostoskori/vaihe2');
    };
    function initializeCartProducts() {
        const productArr = [] as object[];
        cartProducts?.forEach((product) => productArr.push(product.product.id));
        return productArr;
    }

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
                                        amountChangeState={{
                                            unconfirmedChangesCartProducts,
                                            setUnconfirmedChangesCartProducts,
                                        }}
                                    />
                                );
                            })}
                        </Grid>
                    </>
                )}
            </Grid>
            <Divider sx={{ margin: '1rem 0 1rem 0' }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CartButtons
                    backText="Jatka ostoksia"
                    forwardText="Seuraava"
                    cartEmpty={cartProducts?.length === 0}
                    unconfirmedChangesCartProducts={unconfirmedChangesCartProducts}
                />
            </form>
        </>
    );
}

export default CartView;
