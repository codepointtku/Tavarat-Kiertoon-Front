import { useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Input, Button } from '@mui/material';

import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
    text: string;
    index: number & string;
    count: number;
    amountInStorage: number;
}

function ProductInCart({ text, index, count, amountInStorage }: Props) {
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
        if (amountN >= 1 && amountN <= amountInStorage) {
            action === 'add' ? addAmount() : removeAmount();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const _input = event.target.value;
        const input: number = +_input;
        if ((input >= 1 && input <= amountInStorage) || _input === '') {
            setAmountN(Number(input));
            input === selectedAmount ? setChangeAmount(true) : setChangeAmount(false);
        }
    }

    const handleSubmit = (action: string) => {
        const amount = amountN.toString();
        if (action === 'add') {
            submit(
                { index, amount },
                {
                    method: 'put',
                    action: '/',
                }
            );
            setSelectedAmount(amountN);
            setChangeAmount(true);
        } else if (action === 'remove') {
            submit({ index }, { method: 'delete', action: '/' });
        }
    };

    return (
        <ListItem key={text} sx={{ height: 50 }} disablePadding>
            <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                {amountN === 1 ? (
                    <IconButton onClick={() => handleSubmit('remove')}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => handleClick('remove')}>
                        <RemoveIcon />
                    </IconButton>
                )}
                <Input
                    inputProps={{ style: { width: 30, textAlign: 'center' } }}
                    value={amountN}
                    onChange={(SelectChangeEvent) => handleChange(SelectChangeEvent)}
                    disableUnderline
                />
                <IconButton onClick={() => handleClick('add')} disabled={amountN === amountInStorage}>
                    <AddIcon />
                </IconButton>
                <Button
                    size="small"
                    sx={{ ml: 2 }}
                    aria-label="add more of same item to shopping cart"
                    onClick={() => handleSubmit('add')}
                    disabled={changeAmount}
                >
                    Muuta määrää
                </Button>
            </ListItemButton>
        </ListItem>
    );
}

export default ProductInCart;
