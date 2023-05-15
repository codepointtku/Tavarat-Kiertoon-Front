import { useEffect } from 'react';
import { useSubmit, useParams } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';
import TypographyHeading from '../../TypographyHeading';
import { Link } from 'react-router-dom';

interface Params {
    uid: string;
    token: string;
}

function Activation() {
    const submit = useSubmit();
    const { uid, token } = useParams() as unknown as Params;

    useEffect(() => {
        submit({ uid, token }, { method: 'post', action: `/aktivointi/${uid}/${token}` });
    }, []);
    return (
        <Container>
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
                    <TypographyHeading text="Käyttäjä aktivoitu onnistuneesti!" />
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
