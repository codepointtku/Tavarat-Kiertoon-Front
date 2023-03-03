import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

function TypographyHeading({ text }) {
    return (
        <Typography variant="h5" color="primary.main" gutterBottom>
            {text}
        </Typography>
    );
}

TypographyHeading.propTypes = {
    text: PropTypes.string.isRequired,
};

export default TypographyHeading;
