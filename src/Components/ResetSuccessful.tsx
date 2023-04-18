import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ResetSuccessful() {
    return (
        <Container>
            <Box sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, padding: 5, mt: 5 }}>
                <Typography>Salasana palautettu onnistuneesti.</Typography>
                <Button component={Link} to="/">
                    Palaa etusivulle
                </Button>
            </Box>
        </Container>
    );
}

export default ResetSuccessful;
