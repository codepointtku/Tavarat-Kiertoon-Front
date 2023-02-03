import { Avatar, Box, Typography } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

function SignupHeader() {
    return (
        <Box
            sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // backgroundColor: 'green',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <VpnKeyIcon />
            </Avatar>
            <Typography variant="h5">Luo uusi käyttäjä</Typography>
        </Box>
    );
}

export default SignupHeader;
