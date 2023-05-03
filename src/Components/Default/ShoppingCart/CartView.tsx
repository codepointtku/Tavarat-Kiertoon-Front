import { useNavigate, useRouteLoaderData, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Grid, Typography, IconButton } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

import CartButtons from './CartButtons';
import type { shoppingCartLoader } from '../../../Router/loaders';

function CartView() {
    const navigate = useNavigate();
    const submit = useSubmit();
    const { products } = useRouteLoaderData('frontPage') as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const { handleSubmit } = useForm();

    const handleClick = (action: string, id: string) => {
        action === 'add'
            ? submit({ id }, { method: 'put', action: '/ostoskori/' })
            : submit({ id }, { method: 'delete', action: '/ostoskori/' });
    };

    const onSubmit = () => {
        navigate('/ostoskori/vaihe2');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="row" justifyContent="space-around">
                <Grid container direction="column" sx={{ width: 'auto' }}>
                    {products?.map((item: { name: string; id: number }) => (
                        <Typography variant="h6" sx={{ p: 0.5 }} key={item.id}>
                            {item.name}
                        </Typography>
                    ))}
                </Grid>
                <Grid container direction="column" sx={{ width: 'auto' }}>
                    {products?.map((item: { id: string; count: number }) => (
                        <Box display="inline-flex" key={item.id}>
                            <IconButton color="primary" onClick={() => handleClick('remove', item.id)}>
                                <RemoveCircleRoundedIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ p: 0.5 }}>
                                {item.count}
                            </Typography>
                            <IconButton color="primary" onClick={() => handleClick('add', item.id)}>
                                <AddCircleRoundedIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Grid>
            </Grid>
            <hr />
            <CartButtons backText="Jatka ostoksia" forwardText="Seuraava" />
        </form>
    );
}

export default CartView;
