import { Typography, Button, Container } from '@mui/material';

function Welcome({ user }) {
    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" color="primary.main" sx={{ mt: 5 }}>
                Tervetuloa {user}!
            </Typography>
            <Button sx={{ mt: 5 }} type="submit" fullWidth>
                Kirjaudu ulos
            </Button>
        </Container>
    );
}

export default Welcome;
