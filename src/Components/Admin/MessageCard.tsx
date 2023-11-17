import { useSubmit } from 'react-router-dom';
import { Box, Paper, Typography, Button, Grid, Link, FormControlLabel, Stack, Checkbox } from '@mui/material';

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
    const submit = useSubmit();

    function handleSubmit(status: string) {
        submit({ id, status, subject, message, name, email }, { method: 'put', action: '/admin/viestit' });
    }

    const mailtoLink = `mailto:${email}?subject=Vastaus: ${encodeURIComponent(
        subject
    )}&body=Hei, kiitos viestistäsi: " ${encodeURIComponent(message)} "`;

    return (
        <Paper
            className="message-card-paper-backdrop"
            elevation={6}
            sx={{
                mb: '2rem',
                p: '2rem',
                // opacity: currentStatus === 'Read' ? 0.6 : 1,
            }}
        >
            <Grid className="msg-card-title-header" container justifyContent="space-between">
                <Grid className="msg-card-heading-txt" item>
                    <TypographyHeading text={subject} />
                    <Typography variant="caption" sx={{ color: 'text.hintContrast', mt: '0.5rem' }}>
                        {date[0]} {date[1]}
                    </Typography>
                </Grid>
                <Grid className="msg-card-action-btns" item>
                    <Stack>
                        <Tooltip title="Avaa viesti sähköposti-sovellukseen">
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    if (currentStatus === 'Not read') {
                                        handleSubmit('Read');
                                    }
                                }}
                            >
                                <Link href={mailtoLink}>Vastaa</Link>
                            </Button>
                        </Tooltip>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentStatus === 'Read'}
                                    onClick={() => handleSubmit(currentStatus === 'Read' ? 'Not read' : 'Read')}
                                />
                            }
                            label="Luettu"
                        />
                    </Stack>
                </Grid>
            </Grid>
            <Box className="message-content-text-indent-container" sx={{ m: '0 2rem 1rem 2rem' }}>
                <Typography className="message-content-text-typography" variant="body1" sx={{ wordWrap: 'break-word' }}>
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
