import { Paper, Typography } from '@mui/material';

import TypographyHeading from '../TypographyHeading';

interface Props {
    title: string;
    date: string;
    content: string;
}

function BulletinCard({ title, date, content }: Props) {
    return (
        <Paper elevation={6} sx={{ mb: '2rem', p: '1rem' }}>
            <TypographyHeading text={title} />
            <Typography variant="subtitle1" sx={{ color: 'text.hint' }}>
                {date}
            </Typography>
            <Typography variant="body1">{content}</Typography>
        </Paper>
    );
}

export default BulletinCard;
