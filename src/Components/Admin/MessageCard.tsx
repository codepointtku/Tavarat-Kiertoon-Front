import { useSubmit } from 'react-router-dom';
import { Box, Paper, Typography, Button, Grid } from '@mui/material';

import TypographyHeading from '../TypographyHeading';

interface Props {
    subject: string;
    date: string;
    message: string;
    id: string;
    currentStatus: string;
    name: string;
    email: string;
}

function MessageCard({ subject, date, message, id, currentStatus, name, email }: Props) {
    const submit = useSubmit();

    function handleSubmit(status: string) {
        submit({ id, status, subject, message, name, email }, { method: 'put', action: '/admin/saapuneet' });
    }

    return (
        <Paper
            id="bulletin-card-paper-backdrop"
            elevation={6}
            sx={{
                mb: '2rem',
                p: '2rem',
                // opacity: 1,
            }}
        >
            <Grid container justifyContent="space-between">
                <Grid item>
                    <TypographyHeading text={subject} />
                </Grid>
                <Grid item>
                    <Button onClick={() => handleSubmit('Read')}>
                        {/* <Typography variant="inherit">Merkitse lukemattomaksi</Typography> */}
                        <Typography variant="inherit">Merkitse luetuksi</Typography>
                    </Button>
                </Grid>
            </Grid>
            <Typography variant="caption" sx={{ color: 'text.hintContrast', mt: '0.5rem' }}>
                {date}
            </Typography>
            <Box id="bulletin-content-text-indent-container" sx={{ m: '1rem 2rem 0 2rem' }}>
                <Typography id="bulletin-content-text-typography" variant="body1" sx={{ wordWrap: 'break-word' }}>
                    {message}
                </Typography>
            </Box>
        </Paper>
    );
}

export default MessageCard;
