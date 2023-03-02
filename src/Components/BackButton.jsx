import { Link } from 'react-router-dom';

import { Avatar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Tooltip from './Tooltip';

function BackButton() {
    const iconHover = {
        '&:hover .MuiAvatar-root': {
            backgroundColor: 'primary.dark',
        },
    };

    return (
        <Tooltip title="Takaisin">
            <IconButton component={Link} to={-1} sx={[iconHover, { p: '0' }]}>
                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        width: 48,
                        height: 48,
                    }}
                >
                    <ArrowBackIcon />
                </Avatar>
            </IconButton>
        </Tooltip>
    );
}

export default BackButton;
