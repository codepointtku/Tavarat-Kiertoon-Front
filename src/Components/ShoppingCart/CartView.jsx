import { useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Grid, Typography, IconButton } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

import CartButtons from './CartButtons';

function CartView() {
    const [buttonTask, setButtonTask] = useState('');
    const navigate = useNavigate();
    const { cartItems } = useRouteLoaderData('frontPage');
    const {
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        navigate(buttonTask === 'forward' ? '/ostoskori/vaihe2' : '/');
    };
    console.log({ errors, cartItems });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="row" justifyContent="space-around">
                <Grid container direction="column" sx={{ width: 'auto' }}>
                    {cartItems?.map((item) => (
                        <Typography variant="h6" sx={{ p: 0.5 }}>
                            {item.name}
                        </Typography>
                    ))}
                </Grid>
                <Grid container direction="column" sx={{ width: 'auto' }}>
                    {cartItems?.map((item) => (
                        <Box display="inline-flex">
                            <IconButton color="primary">
                                <RemoveCircleRoundedIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ p: 0.5 }}>
                                {item.count}
                            </Typography>
                            <IconButton color="primary">
                                <AddCircleRoundedIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Grid>
            </Grid>
            <hr />
            <CartButtons
                backUrl="/"
                forwardUrl="/ostoskori/vaihe2"
                backText="Jatka ostoksia"
                forwardText="Seuraava"
                setButtonTask={setButtonTask}
            />
        </form>
    );
}

export default CartView;
