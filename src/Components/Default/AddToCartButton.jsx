import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Input, IconButton } from '@mui/material';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function AddToCartButton({ size, id, groupId, count }) {
    const submit = useSubmit();
    const { cart } = useRouteLoaderData('frontPage');
    const [amount, setAmount] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [searchParams] = useSearchParams();
    const { handleSubmit } = useForm();

    function addAmount() {
        if (amount === count) {
            setAmount(amount);
        } else {
            setAmount(amount + 1);
            setAddedToCart(false);
        }
    }

    function removeAmount() {
        if (amount === 1) {
            setAmount(amount);
        } else {
            setAmount(amount - 1);
            setAddedToCart(false);
        }
    }

    function handleOnClick(action) {
        console.log(amount);
        if (amount >= 1 && amount <= count) {
            action === 'add' ? addAmount() : removeAmount();
        }
    }

    function handleChange(event) {
        const input = event.target.value;
        if ((input >= 1 && input <= count) || input === '') {
            setAmount(Number(input));
            setAddedToCart(false);
        }
    }

    const onSubmit = async () => {
        submit(
            { id, amount },
            {
                method: 'put',
                action: '/?' + searchParams.toString(),
            }
        );
        setAddedToCart(true);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {cart?.products?.some((product) => product['group_id'] === groupId) ? (
                <Box
                    sx={{
                        backgroundColor: 'primary.main',
                        borderRadius: 1,
                        p: 0.1,
                        height: 30,
                        boxShadow: '0rem 0.05rem 0.2rem 0rem grey',
                    }}
                >
                    <IconButton
                        size="small"
                        sx={{ color: 'background.default', padding: 0, mr: 1, ml: 0.5 }}
                        onClick={() => handleOnClick('remove')}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Input
                        sx={{
                            mt: 1 / 4,
                            border: 1,
                            borderColor: 'white',
                            backgroundColor: 'white',
                            color: 'primary.main',
                            borderRadius: 1,
                        }}
                        inputProps={{
                            style: {
                                width: 30,
                                padding: 0,
                                textAlign: 'center',
                            },
                        }}
                        value={amount}
                        onChange={(SelectChangeEvent) => handleChange(SelectChangeEvent)}
                        disableUnderline
                    />
                    <IconButton
                        size="small"
                        sx={{ color: 'background.default', padding: 0, ml: 1, mr: 0.5 }}
                        onClick={() => handleOnClick('add')}
                    >
                        <AddIcon />
                    </IconButton>
                    <form onSubmit={handleSubmit(() => onSubmit())}>
                        <Button
                            size={size}
                            sx={{ mt: 1 / 2 }}
                            aria-label="add more of same item to shopping cart"
                            type="submit"
                            disabled={addedToCart}
                        >
                            Muuta määrää
                        </Button>
                    </form>
                </Box>
            ) : (
                <form onSubmit={handleSubmit(() => onSubmit())}>
                    <Button
                        size={size}
                        aria-label="add to shopping cart"
                        startIcon={<AddShoppingCartOutlinedIcon />}
                        type="submit"
                        // onClick={() => handleClickAddToCartBtn('add', itemAmount)}
                    >
                        Lisää koriin
                    </Button>
                </form>
            )}
        </Box>
    );
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    groupId: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

export default AddToCartButton;
