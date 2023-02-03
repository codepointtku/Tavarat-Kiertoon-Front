import PropTypes from 'prop-types';
import { useState } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from "@mui/icons-material/Mail"
import DeleteIcon from '@mui/icons-material/Delete';


function ItemButton({text, index}){
    const [hoveredOver, setHoveredOver] = useState(false)

    return (
    <ListItem key={text} disablePadding>
        <ListItemButton onMouseOver={() => setHoveredOver(true)} onMouseOut={() => setHoveredOver(false)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
            { hoveredOver && <DeleteIcon /> }
        </ListItemButton>
    </ListItem>
    )
}

ItemButton.propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
} 

export default ItemButton;