import { IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Tooltip from '../../Tooltip';

function CloseDrawerButton({ setCurrentOpenDrawer }) {
    function handleClick() {
        setCurrentOpenDrawer('');
    }

    const buttonHover = {
        '&:hover .MuiAvatar-root': {
            backgroundColor: 'primary.dark',
        },
    };

    return (
        <Tooltip title="Sulje">
            <IconButton
                onClick={handleClick}
                sx={[
                    buttonHover,
                    {
                        p: '0',
                        marginTop: '1rem',
                    },
                ]}
            >
                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        width: 48,
                        height: 48,
                    }}
                >
                    <CloseIcon />
                </Avatar>
            </IconButton>
        </Tooltip>
    );
}

export default CloseDrawerButton;
