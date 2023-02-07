import {
    Container,
    Box,
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useState } from 'react';
import LOGO4 from '../Assets/LOGO4.png';

function TilausNro() {
    return (
        <TextField
            sx={{ mt: 2 }}
            id="sender-name"
            label="Tilausnumero"
            placeholder="1234"
            multiline
            required
            maxRows={2}
        />
    );
}

function ContactPage() {
    const [subject, setSubject] = useState('Tilaukset');
    const handleChange = (event) => {
        setSubject(event.target.value);
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img src={LOGO4} alt="turkulogo" style={{ width: 200 }} />

            <Typography variant="h3" color="primary.main">
                Ota yhteyttä
            </Typography>

            <Container sx={{ alignItems: 'center' }} maxWidth="md">
                <TextField
                    sx={{ mt: 2 }}
                    id="sender-name"
                    label="Nimesi"
                    placeholder="Chuck Norris"
                    multiline
                    fullWidth
                    required
                    maxRows={2}
                />
                <TextField
                    sx={{ mt: 2 }}
                    id="sender-email"
                    label="sähköpostisi"
                    multiline
                    fullWidth
                    required
                    maxRows={1}
                    placeholder="chuck.norris@joku.com"
                />
                <FormControl fullWidth required sx={{ mt: 2 }}>
                    <InputLabel id="select-label">Aihe</InputLabel>
                    <Select
                        labelId="select-label"
                        id="simple-select"
                        value={subject}
                        label="Aihe"
                        onChange={handleChange}
                    >
                        <MenuItem value="Yleinen palaute">Yleinen palaute</MenuItem>
                        <MenuItem value="Tilaukset">Tilaukset</MenuItem>
                        <MenuItem value="Tekninen ongelma">Tekninen ongelma</MenuItem>
                        <MenuItem value="Kehitysehdotukset">Kehitysehdotukset</MenuItem>
                    </Select>
                </FormControl>

                {subject === 'Tilaukset' && <TilausNro />}

                {/* {subject === 'Tilaukset' ? <TilausNro /> : <Kakka />} */}

                <TextField
                    sx={{ mt: 2 }}
                    placeholder="kerro mikä mieltä painaa"
                    id="form-message"
                    label="Viesti"
                    multiline
                    required
                    fullWidth
                    rows={6}
                />
            </Container>
            <Button
                style={{ width: 200 }}
                sx={{
                    mt: 2,
                    mb: 2,
                }}
            >
                NAPPPPPULA
            </Button>
        </Box>
    );
}

export default ContactPage;
