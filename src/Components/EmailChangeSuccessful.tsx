import { useEffect } from 'react';
import { useSubmit, useParams } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';
import TypographyHeading from './TypographyHeading';
import { Link } from 'react-router-dom';

interface Params {
    uid: string;
    token: string;
    new_email: string;
}

function EmailChangeSuccessful() {
    const submit = useSubmit();
    const { uid, token, new_email } = useParams() as unknown as Params;
    useEffect(() => {
        submit({ uid, token, new_email }, { method: 'post', action: `/emailvaihto/${uid}/${token}/${new_email}` });
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
                    <TypographyHeading text="Sähköposti vaihdettu onnistuneesti!" />
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

export default EmailChangeSuccessful;
