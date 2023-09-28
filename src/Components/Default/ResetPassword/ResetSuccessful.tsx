import { useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import { Link, useActionData, useNavigate, generatePath } from 'react-router-dom';
import TypographyHeading from '../../TypographyHeading';

interface ResponseStatus {
    type: string;
    status: boolean;
}

function ResetSuccessful() {
    const navigate = useNavigate();
    const responseStatus = useActionData() as ResponseStatus;
    useEffect(() => {
        responseStatus?.type === 'outdatedtoken' &&
            navigate(generatePath('/salasananpalautus/linkexpired'), { replace: true });
    }, []);
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
                    <TypographyHeading text="Salasana vaihdettu onnistuneesti" />
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
