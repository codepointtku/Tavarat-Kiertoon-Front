import { useState } from 'react';
import { useSearchParams, useFetcher } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { type OverridableStringUnion } from '@material-ui/types';
import { IconButton, Box, Input, Button, type ButtonPropsSizeOverrides, Typography } from '@mui/material';
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
    const fetcher = useFetcher();
    const [amountN, setAmountN] = useState(count ?? 1);
    const [selectedAmount, setSelectedAmount] = useState(count ?? 1);
    const [addedToCart, setAddedToCart] = useState(true);
    const [searchParams] = useSearchParams();
    const { handleSubmit, register } = useForm();

    function addAmount() {
        setAmountN((amountN) => amountN + 1);
        amountN + 1 === selectedAmount ? setAddedToCart(true) : setAddedToCart(false);
    }

    function removeAmount() {
        setAmountN((amountN) => amountN - 1);
        amountN - 1 === selectedAmount ? setAddedToCart(true) : setAddedToCart(false);
    }

    function handleOnClick(action: string) {
        if (amountN >= 0 && amountN <= maxCount + selectedAmount) {
            action === 'add' ? addAmount() : removeAmount();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const _input = event.target.value;
        const input: number = +_input;
        if ((input >= 0 && input <= maxCount + selectedAmount) || _input === '') {
            setAmountN(Number(input));
            input === selectedAmount ? setAddedToCart(true) : setAddedToCart(false);
        }
    }

    const onSubmit = async () => {
        const amount = amountN.toString();
        fetcher.submit(
            { id, amount },
            {
                method: 'put',
                action: '/?' + searchParams.toString(),
            }
        );
        setSelectedAmount(amountN);
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
                        disabled={amountN === 0}
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
                        disabled={amountN === maxCount + selectedAmount}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                <Button
                    size={size}
                    color={amountN === 0 ? 'error' : 'primary'}
                    sx={{
                        mt: !inOrderingProcess ? 1 / 2 : 0,
                        ml: inOrderingProcess ? 2 : 0,
                        width: '7rem',
                    }}
                    aria-label="add more of same item to shopping cart"
                    type="submit"
                    disabled={addedToCart}
                >
                    {amountN === 0 ? (
                        <Typography variant="inherit">Poista korista</Typography>
                    ) : (
                        <Typography variant="inherit">Muuta määrää</Typography>
                    )}
                </Button>
            </Box>
        </form>
    );
}

export default AddMoreToCart;
