import { useState } from 'react';
import { useSubmit, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { OverridableStringUnion } from '@material-ui/types';
import { IconButton, Box, Input, Button, ButtonPropsSizeOverrides } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides> | undefined;
    id: number & string;
    maxCount: number;
    count?: number;
    inOrderingProcess?: boolean | undefined;
}

function AddMoreToCart({ count, maxCount, id, size, inOrderingProcess }: Props) {
    const submit = useSubmit();
    const [amountN, setAmountN] = useState(count ?? 1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [searchParams] = useSearchParams();
    const { handleSubmit, register } = useForm();

    function addAmount() {
        if (amountN === maxCount) {
            setAmountN(amountN);
        } else {
            setAmountN((amountN) => amountN + 1);
            setAddedToCart(false);
        }
    }

    function removeAmount() {
        if (amountN === 1) {
            setAmountN(amountN);
        } else {
            setAmountN((amountN) => amountN - 1);
            setAddedToCart(false);
        }
    }

    function handleOnClick(action: string) {
        if (amountN >= 1 && amountN <= maxCount) {
            action === 'add' ? addAmount() : removeAmount();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const _input = event.target.value;
        const input: number = +_input;
        if ((input >= 1 && input <= maxCount) || _input === '') {
            setAmountN(Number(input));
            setAddedToCart(false);
        }
    }

    const onSubmit = async () => {
        const amount = amountN.toString();
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: inOrderingProcess ? 'inline-flex' : 'block' }}>
                <Box
                    sx={{
                        backgroundColor: 'primary.main',
                        borderRadius: 1,
                        p: 0.1,
                        height: 30,
                        maxWidth: 111,
                        boxShadow: '0rem 0.05rem 0.2rem 0rem grey',
                    }}
                >
                    <IconButton
                        size="small"
                        sx={{ color: 'background.default', padding: 0, mr: 1, ml: 0.5 }}
                        onClick={() => handleOnClick('remove')}
                        disabled={amountN === 1}
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
                        {...register('amount')}
                        value={amountN}
                        onChange={(SelectChangeEvent) => handleChange(SelectChangeEvent)}
                        disableUnderline
                    />
                    <IconButton
                        size="small"
                        sx={{ color: 'background.default', padding: 0, ml: 1, mr: 0.5 }}
                        onClick={() => handleOnClick('add')}
                        disabled={amountN === maxCount}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                <Button
                    size={size}
                    sx={{ mt: !inOrderingProcess ? 1 / 2 : 0, ml: inOrderingProcess ? 2 : 0 }}
                    aria-label="add more of same item to shopping cart"
                    type="submit"
                    disabled={addedToCart}
                >
                    Muuta määrää
                </Button>
            </Box>
        </form>
    );
}

export default AddMoreToCart;
