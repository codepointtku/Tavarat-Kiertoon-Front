import { useEffect } from 'react';
import { useSubmit } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';
import TypographyHeading from '../../TypographyHeading';
import { Link } from 'react-router-dom';

function Activation() {
    const submit = useSubmit();
    useEffect(() => {
        submit({}, { method: 'post', action: '/aktivointi/:uid/:token/' });
    }, []);
    return (
        <Container onLoad={() => console.log('Testing TESITING')}>
            <Grid
                sx={{
                    border: '0.1rem solid #bfe6f6',
                    borderRadius: '1rem',
                    p: 5,
                    m: 5,
                    mt: 5,
                }}
                container
                direction="column"
                alignItems="center"
                gap={2}
            >
                <Grid item>
                    <TypographyHeading text="Käyttäjä aktivoitu onnistuneesti" />
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

export default Activation;
