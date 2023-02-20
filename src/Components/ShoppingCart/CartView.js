import { useRouteLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Grid, Typography, IconButton } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

import CartButtons from './CartButtons';

function CartView() {
    const { cart } = useRouteLoaderData('base');
    const {
        handleSubmit,
        formState: { errors },
    } = useForm();
    console.log(errors);
    return (
        <form onSubmit={handleSubmit()}>
            {cart?.products?.map((item) => (
                <Grid container direction="row" justifyContent="space-around">
                    <Typography variant="h6">{item.name}</Typography>
                    <Box display="inline-flex">
                        <IconButton color="primary">
                            <RemoveCircleRoundedIcon />
                        </IconButton>
                        <Typography variant="h6">Tuotemäärä</Typography>
                        <IconButton color="primary">
                            <AddCircleRoundedIcon />
                        </IconButton>
                    </Box>
                </Grid>
            ))}
            <hr />
            <CartButtons backUrl="/" forwardUrl="/ostoskori/vaihe2" backText="Jatka ostoksia" forwardText="Seuraava" />
        </form>
    );
}

export default CartView;
