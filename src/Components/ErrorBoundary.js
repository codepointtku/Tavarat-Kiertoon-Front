import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useRouteError, Link } from 'react-router-dom';

function ErrorBoundary() {
    const error = useRouteError();
    const location = useLocation();
    const navigate = useNavigate();

    // //Conditional navigation for returning to admin and varasto pages
    // let path = '/';
    // let title = 'etusivulle';
    // if (location.pathname.includes('/varasto/')) {
    //     path = '/varasto';
    //     title = 'varastoon';
    // } else if (location.pathname.includes('/admin/')) {
    //     path = '/admin';
    //     title = 'hallintaan';
    // } else {
    //     path = '/';
    // title = 'etusivulle';
    // }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box minHeight={320}>
            <Alert severity="warning">
                <AlertTitle>Jokin meni pieleen</AlertTitle>
                {error?.response?.status === 404 ? (
                    // 404 page for product or page not found
                    <Typography variant="h6">
                        Etsimääsi {location.pathname.includes('/tuotteet/') ? 'tuotetta' : 'sivua'} ei valitettavasti
                        löydy.
                    </Typography>
                ) : (
                    // Generic error page, to be refined
                    <>
                        <Typography>Onko serveri päällä?</Typography>
                        <Typography>Onko tonipal kahvilla??</Typography>
                    </>
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
