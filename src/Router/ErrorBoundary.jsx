import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useRouteError, Link, Navigate } from 'react-router-dom';

function ErrorBoundary() {
    const error = useRouteError();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const errorType = (err) => {
        console.log(err);
        if (
            err?.status === 401 ||
            err?.response?.status === 403 ||
            err?.status === 403 ||
            err?.response?.status === 403
        ) {
            console.log('unauthorized in errorboundary');
            return 'unauthorized';
        }
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
            {
                {
                    // TODO: navigoi pyöräpuolen etusivulle, riippuen mistä tultiin?
                    //Vaihtoehtoisesti: poista, HasRole-komponentti hoitaa uudelleenohjauksen eri osioissa?
                    unauthorized: <Navigate to="/kirjaudu" />,
                    axios: (
                        <Alert severity="warning">
                            <AlertTitle>Jokin meni pieleen</AlertTitle>
                            <Typography variant="h6">
                                Yhteysongelma sijainnissa {location.pathname} , (Axios error).
                            </Typography>
                            <Box>
                                <Button onClick={handleGoBack} sx={{ margin: '1em' }}>
                                    Takaisin
                                </Button>
                                <Button component={Link} reloadDocument to="/" sx={{ margin: '1em' }}>
                                    Takaisin etusivulle
                                </Button>
                            </Box>
                        </Alert>
                    ),

                    noroute: (
                        <Alert severity="warning">
                            <AlertTitle>Jokin meni pieleen</AlertTitle>
                            <Typography variant="h6">
                                Etsimääsi sijaintia {location.pathname} ei valitettavasti löydy.
                            </Typography>
                            <Box>
                                <Button onClick={handleGoBack} sx={{ margin: '1em' }}>
                                    Takaisin
                                </Button>
                                <Button component={Link} reloadDocument to="/" sx={{ margin: '1em' }}>
                                    Takaisin etusivulle
                                </Button>
                            </Box>
                        </Alert>
                    ),
                    else: (
                        <Alert severity="warning">
                            <AlertTitle>Jokin meni pieleen</AlertTitle>
                            <Typography variant="h6">Virhe sijainnissa {location.pathname}.</Typography>
                            <Box>
                                <Button onClick={handleGoBack} sx={{ margin: '1em' }}>
                                    Takaisin
                                </Button>
                                <Button component={Link} reloadDocument to="/" sx={{ margin: '1em' }}>
                                    Takaisin etusivulle
                                </Button>
                            </Box>
                        </Alert>
                    ),
                }[errorType(error)]
            }
        </Box>
    );
}

export default ErrorBoundary;
