import { Typography, Box, Container, TextField } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

function ForgotPassword() {
    return (
        <Container>
            <Box
                sx={{
                    border: 3,
                    borderStyle: 'solid',
                    borderRadius: 3,
                    padding: 5,
                    mt: 5,
                }}
            >
                <KeyIcon fontSize="large" />
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', ml: 2 }}>
                    Unohtunut salasana
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Box>
                        <Typography variant="h6" mb={2}>
                            Syötä käyttäjänimi
                        </Typography>
                        <TextField />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default ForgotPassword;
