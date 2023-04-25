import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Input, IconButton } from '@mui/material';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function AddToCartButton({ size, id, groupId, count }) {
    const submit = useSubmit();
    const { cart } = useRouteLoaderData('frontPage');
    const [itemAmount, setItemAmount] = useState(1);
    const [searchParams] = useSearchParams();
    const { register, handleSubmit } = useForm();

    // function handleChange(SelectChangeEvent) {
    //     const input = SelectChangeEvent.target.value;
    //     if ((input >= 1 && input <= count) || input === '') {
    //         setItemAmount(input);
    //     }
    // }

    // const handleClickAddToCartBtn = async (action, amount) => {
    //     action === 'remove'
    //         ? submit(
    //               { id, amount },
    //               {
    //                   method: 'delete',
    //                   action: '/?' + searchParams.toString(),
    //               }
    //           )
    //         : submit(
    //               { id, amount },
    //               {
    //                   method: 'put',
    //                   action: '/?' + searchParams.toString(),
    //               }
    //           );
    // };

    const onSubmit = async (action, amount) => {
        console.log(action, amount);
        action === 'remove'
            ? submit(
                  { id, amount },
                  {
                      method: 'delete',
                      action: '/?' + searchParams.toString(),
                  }
              )
            : submit(
                  { id, amount },
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
                    <form onSubmit={handleSubmit(() => onSubmit('add', itemAmount))}>
                        <IconButton
                            size="small"
                            sx={{ color: 'background.default', padding: 0, mr: 1, ml: 0.5 }}
                            onClick={() => setItemAmount((itemAmount) => itemAmount - 1)}
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <Input
                            sx={{ mt: 1 / 4 }}
                            inputProps={{
                                style: {
                                    width: 30,
                                    padding: 0,
                                    textAlign: 'center',
                                },
                            }}
                            {...register('itemAmount', {
                                required: true,
                                maxLength: 3,
                                validate: {
                                    greaterOrEqualToOne: (v) => v >= 1,
                                    lessOrEqualToCount: (v) => v <= count,
                                    isEmpty: (v) => v === '',
                                },
                            })}
                            value={itemAmount}
                            onChange={(SelectChangeEvent) => setItemAmount(Number(SelectChangeEvent.target.value))}
                            disableUnderline
                        />
                        <IconButton
                            size="small"
                            sx={{ color: 'background.default', padding: 0, ml: 1, mr: 0.5 }}
                            onClick={() => setItemAmount((itemAmount) => itemAmount + 1)}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </form>
                </Box>
            ) : (
                <form onSubmit={handleSubmit(() => onSubmit('add', itemAmount))}>
                    <Button
                        size={size}
                        aria-label="add to shopping cart"
                        startIcon={<AddShoppingCartOutlinedIcon />}
                        {...register('itemAmount')}
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
};

export default AddToCartButton;
