import { Box, Paper, Typography } from '@mui/material';

import TypographyHeading from '../TypographyHeading';

interface Props {
    title: string;
    date: string;
    content: string;
}

function BulletinCard({ title, date, content }: Props) {
    return (
        <Paper
            id="bulletin-card-paper-backdrop"
            elevation={6}
            sx={{
                mb: '2rem',
                p: '2rem',
            }}
        >
            <TypographyHeading text={title} />
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
