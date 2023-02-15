import { Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton() {
    const iconHover = {
        '&:hover .MuiAvatar-root': {
            backgroundColor: 'primary.dark',
        },
    };

    return (
        <Avatar>
            <ArrowBackIcon
                sx={[
                    iconHover,
                    {
                        bgcolor: 'primary.main',
                    },
                ]}
            />
        </Avatar>
    );
}

export default BackButton;
