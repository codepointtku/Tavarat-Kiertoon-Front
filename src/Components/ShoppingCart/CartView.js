import { Form, useRouteLoaderData } from 'react-router-dom';
import { Box, Grid, Typography, IconButton } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

import CartButton from './CartButton';

function CartView() {
    const { cart } = useRouteLoaderData('base');
    console.log(cart);

    return (
        <Form method="put">
            {cart.map((item) => (
                <Grid container direction="row" justifyContent="space-around">
                    <Typography variant="h6">{item.productName}</Typography>
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
            <CartButton backUrl="/" forwardUrl="/ostoskori/vaihe2" backText="Jatka ostoksia" forwardText="Seuraava" />
        </Form>
    );
}

export default CartView;
