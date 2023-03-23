import { useState } from 'react';
import { useSubmit } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Box, Button, TextField } from '@mui/material';

function AddToCartButton({ size, id }) {
    const submit = useSubmit();
    const [amount, setAmount] = useState(1);
    console.log(amount);

    const handleClickAddToCartBtn = async () => {
        submit(
            { id },
            {
                method: 'put',
                action: '/',
            }
        );
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Button
                size={size}
                aria-label="add to shopping cart"
                startIcon={<AddShoppingCartOutlinedIcon />}
                onClick={handleClickAddToCartBtn}
            >
                Lisää koriin
            </Button>
            <TextField
                align="center"
                type="number"
                sx={{ ml: 2 }}
                inputProps={{ max: 999, min: -999, style: { padding: 5, width: 30 } }}
                value={amount}
                onChange={(SelectChangeEvent) => {
                    setAmount(SelectChangeEvent.target.value);
                }}
            />
        </Box>
    );
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default AddToCartButton;
