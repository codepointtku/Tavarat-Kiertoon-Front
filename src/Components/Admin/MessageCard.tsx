// import { useSubmit } from 'react-router-dom';
import { Box, Paper, Typography, Button, Grid, Link } from '@mui/material';

import TypographyHeading from '../TypographyHeading';
import Tooltip from '../Tooltip';

interface Props {
    subject: string;
    date: string[];
    message: string;
    id: string;
    currentStatus: string;
    name: string;
    email: string;
}

function MessageCard({ subject, date, message, id, currentStatus, name, email }: Props) {
    // const submit = useSubmit();

    // function handleSubmit(status: string) {
    //     submit({ id, status, subject, message, name, email }, { method: 'put', action: '/admin/saapuneet' });
    // }

    const mailtoLink = `mailto:${email}?subject=Vastaus: ${encodeURIComponent(
        subject
    )}&body=Hei, kiitos viestistäsi:\n ${encodeURIComponent(message)}`;

    return (
        <Paper
            className="message-card-paper-backdrop"
            elevation={6}
            sx={{
                mb: '2rem',
                p: '2rem',
                opacity: currentStatus === 'Read' ? 0.6 : 1,
            }}
        >
            <Grid container justifyContent="space-between">
                <Grid item>
                    <TypographyHeading text={subject} />
                </Grid>
                <Grid item>
                    {/* <Button onClick={() => handleSubmit(currentStatus === 'Read' ? 'Not read' : 'Read')}>
                        {currentStatus === 'Read' ? (
                            <Typography variant="inherit">Merkitse lukemattomaksi</Typography>
                        ) : (
                            <Typography variant="inherit">Merkitse luetuksi</Typography>
                        )}
                    </Button> */}
                    <Tooltip title="Avaa viesti sähköposti-sovellukseen">
                        <Button variant="outlined">
                            <Link href={mailtoLink}>Vastaa</Link>
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
            <Typography variant="caption" sx={{ color: 'text.hintContrast', mt: '0.5rem' }}>
                {date[0]} {date[1]}
            </Typography>
            <Box id="message-content-text-indent-container" sx={{ m: '1rem 2rem 1rem 2rem' }}>
                <Typography id="message-content-text-typography" variant="body1" sx={{ wordWrap: 'break-word' }}>
                    {message}
                </Typography>
            </Box>
            <Typography variant="caption">
                Lähettäjä:
                <Typography variant="caption" sx={{ ml: '0.25rem', fontStyle: 'italic' }}>
                    {name} / {email}
                </Typography>
            </Typography>
        </Paper>
    );
}

export default MessageCard;
