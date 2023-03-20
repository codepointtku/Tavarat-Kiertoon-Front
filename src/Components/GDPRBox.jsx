import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Grid, Snackbar, Typography } from '@mui/material';

import TypographyHeading from './TypographyHeading';

function GDPRText() {
    return (
        <>
            <TypographyHeading text="Tietoa sivuston evästeistä" />
            <Typography>Käytämme sivustollamme välttämättömiä evästeitä sivuston toiminnallisuuteen.</Typography>
            <Typography>
                Jatkaessasi sivuston käyttöä hyväksyt välttämättömien evästeiden tallentamisen selaimen välimuistiin.
            </Typography>
        </>
    );
}

function ConsentButtons() {
    return (
        <Box>
            <Button component={Link} to="/" fullWidth>
                Selvä
            </Button>
        </Box>
    );
}

function GDPRBox() {
    const [open, setOpen] = useState(true);

    return (
        <div>
            {open && (
                <Snackbar
                    open={open}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    sx={{
                        border: '0.1rem solid #0288d1',
                    }}
                >
                    <Box
                        onClick={() => setOpen(false)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            minWidth: '100vw',
                            padding: '2rem 8rem 2rem 8rem',
                        }}
                    >
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item sm={10}>
                                <GDPRText />
                            </Grid>
                            <Grid item sm={2}>
                                <ConsentButtons />
                            </Grid>
                        </Grid>
                    </Box>
                </Snackbar>
            )}
        </div>
    );
}

export default GDPRBox;
