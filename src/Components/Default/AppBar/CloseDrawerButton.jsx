import { IconButton, Avatar, Box } from '@mui/material';
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
            <Box id="close-drawer-btn-wrapper" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            </Box>
        </Tooltip>
    );
}

export default CloseDrawerButton;
