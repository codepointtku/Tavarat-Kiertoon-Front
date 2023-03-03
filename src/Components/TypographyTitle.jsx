import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

function TypographyTitle({ text }) {
    return (
        <Typography variant="h4" color="primary.main" textAlign="center">
            {text}
        </Typography>
    );
}

TypographyTitle.propTypes = {
    text: PropTypes.string.isRequired,
};

export default TypographyTitle;
