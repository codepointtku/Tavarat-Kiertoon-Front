import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Input } from '@mui/material';

import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function ProductInCart({ text, index, count, setChangeAmount }) {
    const [hoveredOver, setHoveredOver] = useState(false);
    const [amount, setAmount] = useState(count);
    const submit = useSubmit();

    // useEffect(() => {
    //     submit({ index, amount }, { method: 'put', action: '/' });
    // }, [amount]);

    function addAmount() {
        if (amount === count) {
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

    function handleClick(action) {
        if (amount >= 1 && amount <= count) {
            action === 'add' ? addAmount() : removeAmount();
        }
    }

    function handleChange(event) {
        const input = event.target.value;
        if ((input >= 1 && input <= count) || input === '') {
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
                            <IconButton onClick={() => handleClick('remove')}>
                                <DeleteIcon />
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
                        <IconButton onClick={() => handleClick('add')}>
                            <AddIcon />
                        </IconButton>
                    </>
                    // <IconButton onClick={handleClick}>
                    //     <DeleteIcon sx={{ color: 'red' }} />
                    // </IconButton>
                )}
            </ListItemButton>
        </ListItem>
    );
}

ProductInCart.propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
};

export default ProductInCart;
