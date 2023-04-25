import { Container, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TypographyHeading from '../../TypographyHeading';

function SessionExpired() {
    return (
        <Container>
            <Grid
                sx={{
                    border: '0.1rem solid #bfe6f6',
                    borderRadius: '1rem',
                    p: 5,
                    mt: 5,
                }}
                container
                direction="column"
                alignItems="center"
                gap={2}
            >
                <Grid item>
                    <TypographyHeading text="Sessio on valitettavasti vanhentunut!" />
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

export default SessionExpired;
