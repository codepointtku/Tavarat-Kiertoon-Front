import { useState } from 'react';
import { Box, Paper, Typography, Button, Grid } from '@mui/material';

import TypographyHeading from '../TypographyHeading';

interface Props {
    title: string;
    date: string;
    content: string;
    isRead?: boolean;
    setIsRead?: React.Dispatch<React.SetStateAction<boolean>>;
}

function BulletinCard({ title, date, content }: Props) {
    const [isRead, setIsRead] = useState(false);

    return (
        <Paper
            id="bulletin-card-paper-backdrop"
            elevation={6}
            sx={{ mb: '2rem', p: '2rem', opacity: isRead ? 0.2 : 1 }}
        >
            <Grid container justifyContent="space-between">
                <Grid item>
                    <TypographyHeading text={title} />
                </Grid>
                {!isRead && (
                    <Grid item>
                        <Button onClick={() => setIsRead && setIsRead((isRead) => !isRead)}>
                            {isRead ? (
                                <Typography variant="inherit">Merkitse lukemattomaksi</Typography>
                            ) : (
                                <Typography variant="inherit">Merkitse luetuksi</Typography>
                            )}
                        </Button>
                    </Grid>
                )}
            </Grid>
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
