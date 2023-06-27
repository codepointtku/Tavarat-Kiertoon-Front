import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useRouteError, Link } from 'react-router-dom';

const errorType = (err) => {
    console.log(err);
    if (err?.response?.status === 204) {
        return 'nocontent';
    }
    if (err?.status === 400) {
        return 'badrequest';
    }
    if (err?.status === 401) {
        return 'unauthorized';
    }
    if (err?.status === 403) {
        return 'forbidden';
    }
    if (err?.status === 404) {
        return 'noroute';
    }
    if (err?.status === 418) {
        return 'teapot';
    }
    if (err?.response?.status === 500) {
        return 'internalservererror';
    }
    if (err?.status === 503) {
        return 'serviceunavailable';
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
        badrequest: <Typography variant="h6">Bad request @ {location.pathname}</Typography>,
        noroute: <Typography variant="h6">Sijaintia {location.pathname} ei valitettavasti löydy.</Typography>,
        unauthorized: (
            <Typography variant="h6">
                Sessio on mahdollisesti vanhentunut. Kirjaudu uudestaan sisään ja yritä uudelleen ole hyvä!
            </Typography>
        ),
        forbidden: <Typography variant="h6">Käyttöoikeudet eivät riitä.</Typography>,
        teapot: <Typography variant="h6">Minä olen teepannu -- siksi en keitä kahvia!</Typography>,
        internalservererror: (
            <Typography variant="h6">
                Sisäinen palvelinvirhe. Palvelin kohtasi odottamattoman tilan, mikä esti pyynnön toteuttamisen.
            </Typography>
        ),
        serviceunavailable: (
            <Typography variant="h6">Huollamme paraikaa järjestelmäämme! Tule takaisin myöhemmin uudelleen.</Typography>
        ),
        else: <Typography variant="h6">Virhe sijainnissa {location.pathname}</Typography>,
    };

    return (
        <Box minHeight={320}>
            <Alert severity="error">
                <AlertTitle>Jokin meni pieleen</AlertTitle>
                {errorTypes[errorType(error)]}
                {/* <Box> */}
                <Button onClick={handleGoBack} sx={{ margin: '1em' }}>
                    Takaisin
                </Button>
                <Button component={Link} to="/" sx={{ margin: '1em' }}>
                    Tavarat Kiertoon etusivulle
                </Button>
                {/* </Box> */}
            </Alert>
        </Box>
    );
}

export default ErrorBoundary;
