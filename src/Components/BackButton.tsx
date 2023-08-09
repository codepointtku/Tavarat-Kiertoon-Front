import { Link } from 'react-router-dom';

import { Avatar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Tooltip from './Tooltip';

const IconButtonLink = IconButton as typeof IconButton | typeof Link;

function BackButton() {
    const iconHover = {
        '&:hover .MuiAvatar-root': {
            backgroundColor: 'primary.dark',
        },
    };

    return (
        <Tooltip title="Takaisin">
            <IconButtonLink
                id="back-btn-iconbtn-link"
                component={Link}
                to={-1 as unknown as string}
                sx={[iconHover, { p: '0' }]}
            >
                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        width: 48,
                        height: 48,
                    }}
                >
                    <ArrowBackIcon />
                </Avatar>
            </IconButtonLink>
        </Tooltip>
    );
}

export default BackButton;
