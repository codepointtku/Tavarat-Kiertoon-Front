import { useState } from 'react';
import { useSubmit, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Input, IconButton } from '@mui/material';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

function AddToCartButton({ size, id, groupId, count }) {
    const submit = useSubmit();
    const { cart } = useRouteLoaderData('frontPage');
    const [amount, setAmount] = useState(1);
    const [searchParams] = useSearchParams();

    const handleClickAddToCartBtn = async (action, itemAmount) => {
        console.log(itemAmount);
        action === 'remove'
            ? submit(
                  { id, itemAmount },
                  {
                      method: 'delete',
                      action: '/?' + searchParams.toString(),
                  }
              )
            : submit(
                  { id, itemAmount },
                  {
                      method: 'put',
                      action: '/?' + searchParams.toString(),
                  }
              );
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {cart?.products?.some((product) => product['group_id'] === groupId) ? (
                <Box sx={{ backgroundColor: 'primary.main', borderRadius: 1, height: 30 }}>
                    <IconButton
                        size="small"
                        sx={{ color: 'background.default', padding: 0, mr: 2, ml: 1 }}
                        onClick={() => handleClickAddToCartBtn('remove', -amount)}
                    >
                        <RemoveCircleRoundedIcon />
                    </IconButton>
                    <Input
                        align="center"
                        sx={{ mt: 1 / 4 }}
                        inputProps={{ max: count, min: 1, style: { width: 30, padding: 0 } }}
                        value={amount}
                        onChange={(SelectChangeEvent) => {
                            setAmount(SelectChangeEvent.target.value);
                        }}
                        disableUnderline
                    />
                    <IconButton
                        size="small"
                        sx={{ color: 'background.default', padding: 0, ml: 2, mr: 1 }}
                        onClick={() => handleClickAddToCartBtn('add', amount)}
                    >
                        <AddCircleRoundedIcon />
                    </IconButton>
                </Box>
            ) : (
                <Button
                    size={size}
                    aria-label="add to shopping cart"
                    startIcon={<AddShoppingCartOutlinedIcon />}
                    onClick={() => handleClickAddToCartBtn('add', amount)}
                >
                    Lisää koriin
                </Button>
            )}
        </Box>
    );
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default AddToCartButton;
