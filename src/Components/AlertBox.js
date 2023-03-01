import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import { Alert, Snackbar } from '@mui/material';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DangerousIcon from '@mui/icons-material/Dangerous';

// USAGE:
// available status cases: info, warning, error, success

// example:
// <AlertBox text="asia pihvi" status="success" />

function AlertBox({ text, status, timer }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => {
                setOpen(false);
            }, timer);
        }
    }, []);

    return (
        <div>
            {open && (
                <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert
                        severity={status}
                        variant="filled"
                        onClose={() => {}}
                        onClick={() => {
                            setOpen(!open);
                        }}
                        iconMapping={{
                            error: <DangerousIcon fontSize="inherit" />,
                            warning: <WarningAmberIcon fontSize="inherit" />,
                            info: <ErrorOutlineIcon fontSize="inherit" />,
                        }}
                        sx={{ minWidth: '20rem' }}
                    >
                        {text}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

AlertBox.propTypes = {
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    timer: PropTypes.number,
};

AlertBox.defaultProps = {
    timer: 0,
};

export default AlertBox;
