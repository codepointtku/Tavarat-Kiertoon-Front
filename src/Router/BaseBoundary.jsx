import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, Navigate, useRouteError, Link } from 'react-router-dom';

const errorType = (err) => {
    console.log('BaseBoundary err:', err);
    if (err?.status === 400 || err?.response?.status === 400) {
        console.log(err?.response?.request?.responseText);
        return 'badrequest';
    }
    if (err?.status === 401 || err?.response?.status === 401) {
        return 'unauthorized';
    }
    if (err?.status === 403 || err?.response?.status === 403) {
        return 'forbidden';
    }
    if (err?.status === 404 || err?.response?.status === 404) {
        return 'noroute';
    }
    if (err?.status === 418 || err?.response?.status === 418) {
        return 'teapot';
    }
    if (err?.status === 500 || err?.response?.status === 500) {
        console.log('500 @', err?.response?.request?.responseURL);
        return 'internalservererror';
    }
    if (err?.status === 503 || err?.response?.status === 503) {
        return 'serviceunavailable';
    }
    return 'else';
};

function BaseBoundary() {
    const error = useRouteError();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    const errorTypes = {
        badrequest: (
            <Typography variant="h6">
                Palvelin ei käsittele tai pysty käsittelemään pyyntöä. {location.pathname}
            </Typography>
        ),
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
        else: <Typography variant="h6">Tuntematon virhe {location.pathname}</Typography>,
    };
    if (error?.status === 401 || error?.response?.status === 401) {
        return <Navigate to="kirjaudu" />;
    }
    return (
        <Box>
            <Alert severity="success">
                <AlertTitle>Hups! Tapahtui virhe: </AlertTitle>
                {errorTypes[errorType(error)]}
                <Button onClick={handleGoBack} sx={{ margin: '1rem 1rem 0 0' }}>
                    Takaisin
                </Button>
                {/* // reloadDocument uses browsers navigation, this is to clear some rare error states */}
                <Button component={Link} to="/" reloadDocument sx={{ margin: '1rem 0 0 0' }}>
                    Tavarat Kiertoon etusivulle
                </Button>
            </Alert>
        </Box>
    );
}

export default BaseBoundary;
