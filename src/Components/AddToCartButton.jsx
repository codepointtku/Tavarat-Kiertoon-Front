import { useState } from 'react';
import { useSubmit, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Box, Button, TextField } from '@mui/material';

function AddToCartButton({ size, id, groupId }) {
    const submit = useSubmit();
    const { cart } = useRouteLoaderData('frontPage');
    const [amount, setAmount] = useState(1);
    const [searchParams] = useSearchParams();

    const handleClickAddToCartBtn = async () => {
        submit(
            { id, amount },
            {
                method: 'put',
                action: '/?' + searchParams.toString(),
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
            {cart?.products?.some((product) => product['group_id'] === groupId) && (
                <TextField
                    align="center"
                    type="number"
                    sx={{ ml: 2 }}
                    inputProps={{ max: 999, min: 0, style: { padding: 5, width: 45, height: 20 } }}
                    value={amount}
                    onChange={(SelectChangeEvent) => {
                        setAmount(SelectChangeEvent.target.value);
                    }}
                />
            )}
        </Box>
    );
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    groupId: PropTypes.string.isRequired,
};

export default AddToCartButton;
