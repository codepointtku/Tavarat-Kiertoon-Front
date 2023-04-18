import {
    Container,
    Box,
    TextField,
    Avatar,
    Typography,
    Button
} from '@mui/material';

import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';

function ContactForm() {
    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                autoComplete="off"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <MailIcon />
                </Avatar>
                <Typography variant="h5">
                    Onk asiaa? Lait ihmees viestii!
                </Typography>

                <TextField
                    id="hot-contact-form-sender-name"
                    label="Nimesi"
                    multiline
                    fullWidth
                    maxRows={2}
                />
                <TextField
                    id="hot-contact-form-sender-phone"
                    label="Puhelinnumerosi"
                    multiline
                    fullWidth
                    maxRows={1}
                    placeholder="050-123 4567"
                />
                <TextField
                    id="hot-contact-form-message"
                    label="Viestisi"
                    multiline
                    fullWidth
                    rows={6}
                />
                <Button
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    endIcon={<SendIcon />}
                >
                    Lähetä
                </Button>
            </Box>
        </Container>
    )
}

export default ContactForm;