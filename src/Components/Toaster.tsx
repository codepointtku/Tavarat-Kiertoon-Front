import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import MuiAlert, { type AlertProps } from '@mui/material/Alert';

import Slide, { type SlideProps } from '@mui/material/Slide';

import CloseIcon from '@mui/icons-material/Close';

interface Props {
    text: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return (
        <MuiAlert
            elevation={6}
            ref={ref}
            variant="filled"
            severity="info"
            {...props}
            sx={{ backgroundColor: 'primary.main', padding: '1.4rem' }}
        />
    );
});

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
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
            <Snackbar
                open={open}
                // autoHideDuration={10000}
                onClose={handleClose}
                action={action}
                TransitionComponent={SlideTransition}
            >
                <Alert>{text}</Alert>
            </Snackbar>
        </div>
    );
}

export default Toaster;
