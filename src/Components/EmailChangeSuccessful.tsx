import { useEffect } from 'react';
import { useSubmit, useParams } from 'react-router-dom';
import { Container, Button, Stack } from '@mui/material';
import TypographyHeading from './TypographyHeading';
import { Link } from 'react-router-dom';

interface Params {
    uid: string;
    token: string;
    newEmail: string;
}

function EmailChangeSuccessful() {
    const submit = useSubmit();
    const { uid, token, newEmail } = useParams() as unknown as Params;
    // console.log('uid: ', uid, 'token: ', token, 'newEmail: ', newEmail);

    useEffect(() => {
        submit({ uid, token, newEmail }, { method: 'post', action: `/emailvaihto/${token}/${uid}/${newEmail}` });
    }, []);

    return (
        <Container>
            <Stack
                sx={{
                    border: '0.1rem solid #bfe6f6',
                    borderRadius: '1rem',
                    p: 5,
                }}
                alignItems="center"
                gap={2}
            >
                <TypographyHeading text="Sähköposti vaihdettu onnistuneesti!" />
                <Button component={Link} to="/" sx={{ width: 200, p: 2 }}>
                    Palaa etusivulle
                </Button>
            </Stack>
        </Container>
    );
}

export default EmailChangeSuccessful;
