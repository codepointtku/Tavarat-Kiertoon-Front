import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Grid, Typography, ButtonPropsSizeOverrides } from '@mui/material';

import CartButtons from './CartButtons';
import AddMoreToCart from '../../AddMoreToCart';
import { OverridableStringUnion } from '@material-ui/types';
import type { shoppingCartLoader } from '../../../Router/loaders';
import type { productListLoader } from '../../../Router/loaders';

function CartView() {
    const navigate = useNavigate();
    const { products: cartProducts } = useRouteLoaderData('frontPage') as Awaited<
        ReturnType<typeof shoppingCartLoader>
    >;
    const products = useRouteLoaderData('products') as Awaited<ReturnType<typeof productListLoader>>;
    const { handleSubmit } = useForm();

    const onSubmit = () => {
        navigate('/ostoskori/vaihe2');
    };

    console.log(products);

    return (
        <>
            <Grid container direction="row" justifyContent="space-around">
                <Grid container direction="column" sx={{ width: 'auto' }}>
                    {cartProducts?.map((item: { name: string; id: number }) => (
                        <Typography variant="h6" sx={{ p: 0.5 }} key={item.id}>
                            {item.name}
                        </Typography>
                    ))}
                </Grid>
                <Grid container direction="column" gap={1.5} sx={{ width: 'auto' }}>
                    {cartProducts?.map((item: { id: string & number; count: number }) => (
                        <AddMoreToCart
                            key={item.id}
                            id={item.id}
                            count={item.count}
                            size={
                                'small' as OverridableStringUnion<
                                    'small' | 'medium' | 'large',
                                    ButtonPropsSizeOverrides
                                >
                            }
                            inOrderingProcess={true}
                        />
                    ))}
                </Grid>
            </Grid>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CartButtons backText="Jatka ostoksia" forwardText="Seuraava" />
            </form>
        </>
    );
}

export default CartView;
