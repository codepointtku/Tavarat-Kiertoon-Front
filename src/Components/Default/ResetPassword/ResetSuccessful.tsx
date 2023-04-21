import { Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ResetSuccessful() {
    return (
        <Container>
            <Grid
                sx={{
                    border: 3,
                    borderStyle: 'solid',
                    borderRadius: 3,
                    padding: 5,
                    mt: 5,
                }}
                container
                direction="column"
                alignItems="center"
                gap={2}
            >
                <Grid item>
                    <Typography variant="h5" fontWeight="fontWeightMediumBold">
                        Salasana palautettu onnistuneesti
                    </Typography>
                </Grid>
                <Grid item>
                    <Button component={Link} to="/" sx={{ width: 200, p: 2 }}>
                        Palaa etusivulle
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ResetSuccessful;
