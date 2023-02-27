import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Grid, Snackbar, Typography } from '@mui/material';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

import TypographyHeading from './TypographyHeading';

function GDPRText() {
    return (
        <>
            <TypographyHeading text="Tämä on GDPR-jutska!" />
            <Typography>
                Käytämme sivustollamme evästeitä kerätäksemme ja analysoidaksemme sinun suorituskykyä ja käyttöä sekä
                tarjotaksemme jakkaroita. Et voi muuttaa suostumustasi milloin tahansa minkä tahansa sivun vasemmassa
                alakulmassa olevasta hammasrataskuvakkeesta. Älä lue lisää.
            </Typography>
            <Typography>Hyväksytkö nämä ehdot?</Typography>
        </>
    );
}

function ConsentButtons() {
    return (
        <Grid container flexDirection="column" spacing={2}>
            <Grid item>
                <Button component={Link} to="/" fullWidth>
                    Okei
                </Button>
            </Grid>
            <Grid item>
                <Button component={Link} to="/rickastley" fullWidth>
                    Ei oo okei
                </Button>
            </Grid>
        </Grid>
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
                        '&:hover .MuiBox-root': {
                            backgroundImage: 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)',
                        },
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
                            border: '0.2rem solid #0288d1',
                            minWidth: '100vw',
                            padding: '2rem',
                        }}
                    >
                        <AccessibleForwardIcon color="primary.main" fontSize="large" />
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
