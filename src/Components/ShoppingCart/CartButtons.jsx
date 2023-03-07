import PropTypes from 'prop-types';
import { Button, Grid } from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CartButtons({ backUrl, forwardUrl, backText, forwardText, setButtonTask }) {
    console.log(backUrl, forwardUrl);
    return (
        <Grid container justifyContent="space-between" sx={{ marginTop: 5 }}>
            <Button
                onClick={() => setButtonTask('back')}
                type="submit"
                variant="contained"
                startIcon={<ArrowBackIcon />}
            >
                {backText}
            </Button>
            <Button
                onClick={() => setButtonTask('forward')}
                type="submit"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
            >
                {forwardText}
            </Button>
        </Grid>
    );
}

CartButtons.propTypes = {
    backUrl: PropTypes.string.isRequired,
    forwardUrl: PropTypes.string.isRequired,
    backText: PropTypes.string.isRequired,
    forwardText: PropTypes.string.isRequired,
    setButtonTask: PropTypes.func.isRequired,
};

export default CartButtons;
