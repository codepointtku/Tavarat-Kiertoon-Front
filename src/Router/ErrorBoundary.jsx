import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useRouteError, Link } from 'react-router-dom';

const errorType = (err) => {
    console.log(err);
    if (err?.response?.status === 204) {
        return 'nocontent';
    }
    if (err?.status === 404) {
        return 'noroute';
    }
    if (err?.status === 400) {
        return 'badrequest';
    }
    if (err?.response?.status === 500) {
        return 'internalservererror';
    }
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
        nocontent: <Typography variant="h6">No content @ {location.pathname}</Typography>,
        noroute: <Typography variant="h6">Etsimääsi sijaintia {location.pathname} ei valitettavasti löydy.</Typography>,
        badrequest: <Typography variant="h6">Bad request @ {location.pathname}</Typography>,
        internalservererror: (
            <Typography variant="h6">
                Server encountered an unexpected condition that prevented it from fulfilling the request @{' '}
                {location.pathname}
            </Typography>
        ),
        else: <Typography variant="h6">Virhe sijainnissa {location.pathname}</Typography>,
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
