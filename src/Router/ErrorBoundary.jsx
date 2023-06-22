import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useRouteError, Link } from 'react-router-dom';

function ErrorBoundary() {
    const error = useRouteError();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const errorType = (err) => {
        console.log(err);
        if (err?.name === 'AxiosError') {
            return 'axios';
        }
        if (err?.status === 404) {
            return 'noroute';
        }
        return 'else';
    };

    return (
        <Box minHeight={320}>
            <Alert severity="warning">
                <AlertTitle>Jokin meni pieleen</AlertTitle>
                {
                    {
                        axios: (
                            <Typography variant="h6">
                                Yhteysongelma sijainnissa {location.pathname}, yritä uudelleeeeeeen.
                            </Typography>
                        ),

                        noroute: (
                            <Typography variant="h6">
                                Etsimääsi sijaintia {location.pathname} ei valitettavasti löydy.
                            </Typography>
                        ),
                        else: <Typography variant="h6">Virhe sijainnissa {location.pathname}.</Typography>,
                    }[errorType(error)]
                }
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
