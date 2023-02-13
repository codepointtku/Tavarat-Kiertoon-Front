import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useRouteError, Link } from 'react-router-dom';

function ErrorBoundary() {
    const error = useRouteError();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box minHeight={320}>
            <Alert severity="warning">
                <AlertTitle>Jokin meni pieleen</AlertTitle>
                <Typography variant="h6">Etsimääsi sijaintia {location.pathname} ei valitettavasti löydy.</Typography>
                {error?.response?.status === 404 && location.pathname.includes('/tuotteet/') && (
                    <Typography>Etsimääsi tuotetta ei löydy</Typography>
                )}
                <Box>
                    <Button onClick={handleGoBack} sx={{ margin: '1em' }}>
                        Takaisin
                    </Button>
                    <Button component={Link} to="/" sx={{ margin: '1em' }}>
                        Takaisin etusivulle
                    </Button>
                </Box>
            </Alert>
        </Box>
    );
}

export default ErrorBoundary;
