import { Typography, Button, Container, Box } from '@mui/material';
import CloseDrawerButton from './CloseDrawerButton';

function Welcome({ user, setCurrentOpenDrawer }) {
    return (
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4" align="center" color="primary.main" sx={{ mt: 5 }}>
                    Tervetuloa {user}!
                </Typography>
                <Button sx={{ mt: 5 }} type="submit" fullWidth>
                    Kirjaudu ulos
                </Button>
                <CloseDrawerButton setCurrentOpenDrawer={setCurrentOpenDrawer} />
            </Box>
        </Container>
    );
}

export default Welcome;
