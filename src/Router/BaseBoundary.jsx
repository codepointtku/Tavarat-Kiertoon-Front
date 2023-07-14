import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useRouteError, Link } from 'react-router-dom';

const errorType = (err) => {
    console.log(err);
    if (err?.status === 400 || err?.response.status === 400) {
        console.log(err?.response?.request?.responseText);
        return 'badrequest';
    }
    if (err?.status === 401 || err?.response.status === 401) {
        return 'unauthorized';
    }
    if (err?.status === 403 || err?.response.status === 403) {
        return 'forbidden';
    }
    if (err?.status === 404 || err?.response.status === 404) {
        return 'noroute';
    }
    if (err?.status === 418 || err?.response.status === 418) {
        return 'teapot';
    }
    if (err?.status === 500 || err?.response?.status === 500) {
        console.log('500 @', err?.response?.request?.responseURL);
        return 'internalservererror';
    }
    if (err?.status === 503 || err?.response.status === 503) {
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
                {/* Sisäinen palvelinvirhe. Palvelin kohtasi odottamattoman tilan, mikä esti pyynnön toteuttamisen. */}
                Ny kävi tämmöttis, hittolaane.
            </Typography>
        ),
        serviceunavailable: (
            <Typography variant="h6">Huollamme paraikaa järjestelmäämme! Tule takaisin myöhemmin uudelleen.</Typography>
        ),
        else: <Typography variant="h6">Ny kävi köplästi {location.pathname}</Typography>,
    };

    return (
        <Box>
            <Alert severity="success">
                <AlertTitle>Jaahas, se sit kössähti.</AlertTitle>
                {errorTypes[errorType(error)]}
                <Button onClick={handleGoBack} sx={{ margin: '1rem 1rem 0 0' }}>
                    Takaisin
                </Button>
                <Button component={Link} to="/" sx={{ margin: '1rem 0 0 0' }}>
                    Tavarat Kiertoon etusivulle
                </Button>
            </Alert>
        </Box>
    );
}

export default BaseBoundary;
