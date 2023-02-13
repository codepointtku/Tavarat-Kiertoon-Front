import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
// import LOGO4 from '../../Assets/LOGO4.png';

export default function SimplePopper() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <button aria-describedby={id} type="button" onClick={handleClick}>
                WELCOME TO THE INTERNET
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    <iframe
                        width="1264"
                        height="480"
                        src="https://www.youtube.com/embed/k1BneeJTDcU?&autoplay=1"
                        title="Steel Panther - Girl From Oklahoma"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                </Box>
            </Popper>
        </div>
    );
}
