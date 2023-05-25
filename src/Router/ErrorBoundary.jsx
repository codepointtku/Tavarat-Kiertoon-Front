import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useRouteError, Link } from 'react-router-dom';

const errorType = (err) => {
    // if (err?.name === 'AxiosError') {
    //     console.log('axios errori');
    //     return 'axios';
    // }
    if (err?.response?.status === 204) {
        console.log('response status 400 (badrequest)');
        return 'badrequest';
    }
    if (err?.status === 404) {
        return 'noroute';
    }
    // for development console logging errors
    console.log(err);
    return 'else';
};

function ErrorBoundary() {
    const error = useRouteError();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const errorTypes = {
        // axios: (
        //     <Typography variant="h6">
        //         Yhteysongelma sijainnissa {location.pathname}, yritä uudelleen.
        //     </Typography>
        // ),

        noroute: <Typography variant="h6">Etsimääsi sijaintia {location.pathname} ei valitettavasti löydy.</Typography>,

        badrequest: <Typography variant="h6">400 @ {location.pathname} dawg.</Typography>,
        else: <Typography variant="h6">Virhe sijainnissa {location.pathname}.</Typography>,
    };

    return (
        <Box minHeight={320}>
            <Alert severity="warning">
                <AlertTitle>Jokin meni pieleen</AlertTitle>
                {errorTypes[errorType(error)]}
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
