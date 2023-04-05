import { useEffect, useState } from 'react';

import type { AlertColor } from '@mui/material';
import { Alert, Snackbar } from '@mui/material';

import DangerousIcon from '@mui/icons-material/Dangerous';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// USAGE:
// available status cases: info, warning, error, success

// example:
// <AlertBox text="asia pihvi" status="success" />

interface Props {
    text: string;
    status: AlertColor;
    timer?: number;
}

function AlertBox({ text, status, timer }: Props) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (timer) {
            setTimeout(() => {
                setOpen(false);
            }, timer);
        }
    }, [timer]);

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

export default AlertBox;
