import PropTypes from 'prop-types';

import { Paper, Typography } from '@mui/material';

import TypographyHeading from '../TypographyHeading';

function BulletinCard({ title, date, content }) {
    return (
        <Paper sx={{ mt: '1rem', p: '1rem' }}>
            <TypographyHeading text={title} />
            <Typography variant="subtitle1" sx={{ color: 'text.hint' }}>
                {date}
            </Typography>
            <Typography variant="body1">{content}</Typography>
        </Paper>
    );
}

BulletinCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default BulletinCard;

// work in progress
