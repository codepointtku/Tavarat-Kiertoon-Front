import { useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText, IconButton, Input, Button, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
    name: string;
    id: number & string;
    count: number;
    maxCount: number;
}

function ProductInCart({ name, id, count, maxCount }: Props) {
    const [changeAmount, setChangeAmount] = useState(true);
    const [amountN, setAmountN] = useState(count);
    const [selectedAmount, setSelectedAmount] = useState(count);
    const submit = useSubmit();

    function addAmount() {
        setAmountN(amountN + 1);
        amountN + 1 === selectedAmount ? setChangeAmount(true) : setChangeAmount(false);
    }

    function removeAmount() {
        setAmountN(amountN - 1);
        amountN - 1 === selectedAmount ? setChangeAmount(true) : setChangeAmount(false);
    }

    function handleClick(action: string) {
        if (amountN >= 0 && amountN <= maxCount + selectedAmount) {
            action === 'add' ? addAmount() : removeAmount();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const _input = event.target.value;
        const input: number = +_input;
        if ((input >= 0 && input <= maxCount + selectedAmount) || _input === '') {
            setAmountN(Number(input));
            input === selectedAmount ? setChangeAmount(true) : setChangeAmount(false);
        }
    }

    const handleSubmit = (action: string) => {
        const amount = amountN.toString();
        if (action === 'add') {
            submit(
                { id, amount },
                {
                    method: 'put',
                    action: '/',
                }
            );
            setSelectedAmount(amountN);
            setChangeAmount(true);
        } else if (action === 'remove') {
            submit({ id }, { method: 'delete', action: '/' });
        }
    };

    return (
        <ListItem key={id} sx={{ height: 50 }} disablePadding>
            <ListItemButton>
                <ListItemText primary={name} />
                <IconButton onClick={() => handleClick('remove')} disabled={amountN === 0}>
                    <RemoveIcon />
                </IconButton>
                <Input
                    inputProps={{ style: { width: 30, textAlign: 'center' } }}
                    value={amountN}
                    onChange={(SelectChangeEvent) => handleChange(SelectChangeEvent)}
                    disableUnderline
                />
                <IconButton
                    onClick={() => handleClick('add')}
                    disabled={amountN === maxCount + selectedAmount || amountN > maxCount}
                >
                    <AddIcon />
                </IconButton>
                <Button
                    color={amountN === 0 ? 'error' : 'primary'}
                    size="small"
                    sx={{
                        ml: 2,
                        width: '7rem',
                    }}
                    aria-label="add more of same item to shopping cart"
                    onClick={() => handleSubmit('add')}
                    disabled={changeAmount}
                >
                    {amountN === 0 ? (
                        <Typography variant="inherit">Poista tuote</Typography>
                    ) : (
                        <Typography variant="inherit">Muuta määrää</Typography>
                    )}
                </Button>
            </ListItemButton>
        </ListItem>
    );
}

export default ProductInCart;
