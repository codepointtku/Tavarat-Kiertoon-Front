import { useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Input } from '@mui/material';

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
    setChangeAmount: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProductInCart({ text, index, count, amountInStorage, setChangeAmount }: Props) {
    const [hoveredOver, setHoveredOver] = useState(false);
    const [amount, setAmount] = useState(count);
    const submit = useSubmit();

    function addAmount() {
        if (amount === amountInStorage) {
            setAmount(amount);
        } else {
            setAmount(amount + 1);
            setChangeAmount(true);
        }
    }

    function removeAmount() {
        if (amount === 1) {
            setAmount(amount);
        } else {
            setAmount(amount - 1);
            setChangeAmount(true);
        }
    }

    function handleClick(action: string) {
        if (amount >= 1 && amount <= amountInStorage) {
            action === 'add' ? addAmount() : removeAmount();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const _input = event.target.value;
        const input: number = +_input;
        if ((input >= 1 && input <= amountInStorage) || _input === '') {
            setAmount(Number(input));
            setChangeAmount(true);
        }
    }

    const handleSubmit = () => {
        submit(
            { index },
            {
                method: 'delete',
                action: '/',
            }
        );
    };

    return (
        <ListItem key={text} sx={{ height: 50 }} disablePadding>
            <ListItemButton onMouseOver={() => setHoveredOver(true)} onMouseOut={() => setHoveredOver(false)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                {hoveredOver && (
                    <>
                        {amount === 1 ? (
                            <IconButton onClick={() => handleSubmit()}>
                                <DeleteIcon sx={{ color: 'red' }} />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => handleClick('remove')}>
                                <RemoveIcon />
                            </IconButton>
                        )}
                        <Input
                            inputProps={{ style: { width: 30, textAlign: 'center' } }}
                            value={amount}
                            onChange={(SelectChangeEvent) => handleChange(SelectChangeEvent)}
                            disableUnderline
                        />
                        <IconButton onClick={() => handleClick('add')} disabled={amount === amountInStorage}>
                            <AddIcon />
                        </IconButton>
                    </>
                )}
            </ListItemButton>
        </ListItem>
    );
}

export default ProductInCart;
