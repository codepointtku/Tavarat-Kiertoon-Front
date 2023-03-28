import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CartButtons({ backText, forwardText }) {
    return (
        <Grid container justifyContent="space-between" sx={{ marginTop: 5 }}>
            <Button component={Link} to={-1} variant="contained" startIcon={<ArrowBackIcon />}>
                {backText}
            </Button>
            <Button type="submit" variant="contained" endIcon={<ArrowForwardIcon />}>
                {forwardText}
            </Button>
        </Grid>
    );
}

CartButtons.propTypes = {
    backText: PropTypes.string.isRequired,
    forwardText: PropTypes.string.isRequired,
};

export default CartButtons;
