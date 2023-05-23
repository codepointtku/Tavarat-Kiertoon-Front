import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useSubmit } from 'react-router-dom';

import TypographyHeading from '../TypographyHeading';

interface Props {
    title: string;
    date: string;
    content: string;
    id: string;
    auth?: { admin_group: boolean };
}

function BulletinCard({ title, date, content, id, auth }: Props) {
    const submit = useSubmit();

    function handleSubmit(action: string) {
        action === 'modify'
            ? submit({ id, title, content }, { method: 'put', action: 'tiedotteet' })
            : submit({ id }, { method: 'put', action: 'tiedotteet' });
    }
    return (
        <Paper id="bulletin-card-paper-backdrop" elevation={6} sx={{ mb: '2rem', p: '2rem' }}>
            {auth?.admin_group && (
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <TypographyHeading text={title} />
                    </Grid>
                    <Grid item>
                        <Button sx={{ mr: 2 }} onClick={() => handleSubmit('modify')}>
                            Muokkaa
                        </Button>
                        <Button color="error" onClick={() => handleSubmit('remove')}>
                            Poista
                        </Button>
                    </Grid>
                </Grid>
            )}
            <Typography variant="caption" sx={{ color: 'text.hintContrast', mt: '0.5rem' }}>
                {date}
            </Typography>
            <Box id="bulletin-content-text-indent-container" sx={{ m: '1rem 2rem 0 2rem' }}>
                <Typography id="bulletin-content-text-typography" variant="body1" sx={{ wordWrap: 'break-word' }}>
                    {content}
                </Typography>
            </Box>
        </Paper>
    );
}

export default BulletinCard;
