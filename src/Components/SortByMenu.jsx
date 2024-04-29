import { useState } from 'react';
import { useNavigate, useSearchParams, useParams, generatePath } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SortByMenu() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { num } = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="text"
                sx={{ color: 'white' }}
            >
                Lajittele
                <ExpandMoreIcon />
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate(generatePath(`/varasto/?tila=Waiting`));
                    }}
                >
                    Waiting
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate(generatePath(`/varasto/?tila=Processing`));
                    }}
                >
                    Delivery
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate(generatePath(`/varasto/?tila=Finished`));
                    }}
                >
                    Finished
                </MenuItem>
            </Menu>
        </div>
    );
}
