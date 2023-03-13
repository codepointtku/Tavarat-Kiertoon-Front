import { Typography } from '@mui/material';

function Welcome({ user }) {
    return (
        <Typography variant="h4" align="center" color="primary.main" sx={{ mt: 5 }}>
            Welcome {user}!
        </Typography>
    );
}

export default Welcome;
