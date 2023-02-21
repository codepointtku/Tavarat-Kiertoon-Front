import PropTypes from 'prop-types';

import { Tooltip as MuiTooltip, Zoom } from '@mui/material';

function Tooltip({ title, children }) {
    return (
        <MuiTooltip title={title} arrow TransitionComponent={Zoom}>
            {children}
        </MuiTooltip>
    );
}

Tooltip.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

export default Tooltip;
