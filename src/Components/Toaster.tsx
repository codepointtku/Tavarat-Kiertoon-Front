import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

interface Props {
    text: string;
}

function Toaster({ text }: Props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="primary" onClick={handleClose}>
                <CloseIcon fontSize="small" color="primary" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} action={action} message={text} />
        </div>
    );
}

export default Toaster;
