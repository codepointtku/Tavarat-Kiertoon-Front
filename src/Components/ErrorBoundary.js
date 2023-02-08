import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useRouteError } from 'react-router';
import { Link } from 'react-router-dom';

function ErrorBoundary() {
    const error = useRouteError();
    const location = useLocation();
    return (
        <Box height={320}>
            <Alert severity="warning">
                <AlertTitle>Jokin meni pieleen</AlertTitle>
                {error?.response?.status === 404 ? (
                    // 404 page for product or page not found
                    <Typography variant="h6">
                        Etsimääsi {location.pathname.includes('/tuotteet/') ? 'tuotetta' : 'sivua'} ei valitettavasti
                        löydy.
                    </Typography>
                ) : (
                    // Generic error page
                    <>
                        <Typography>Onko serveri päällä?</Typography>
                        <Typography>Onko tonipal kahvilla??</Typography>
                    </>
                )}
                <Button component={Link} to="/" sx={{ marginTop: '1em' }}>
                    Takaisin etusivulle
                </Button>
            </Alert>
        </Box>
    );
}

export default ErrorBoundary;
