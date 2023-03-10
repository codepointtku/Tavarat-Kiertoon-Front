import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductInCart({ text, index }) {
    const [hoveredOver, setHoveredOver] = useState(false);
    const submit = useSubmit();

    const handleClick = () => {
        submit(
            { index },
            {
                method: 'delete',
                action: '/',
            }
        );
    };

    return (
        <ListItem key={text} disablePadding>
            <ListItemButton onMouseOver={() => setHoveredOver(true)} onMouseOut={() => setHoveredOver(false)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                {hoveredOver && (
                    <IconButton onClick={handleClick}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                )}
            </ListItemButton>
        </ListItem>
    );
}

ProductInCart.propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export default ProductInCart;
