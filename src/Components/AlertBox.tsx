import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AlertColor } from '@mui/material';
import { Alert, Snackbar } from '@mui/material';

import DangerousIcon from '@mui/icons-material/Dangerous';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// USAGE:
// available status cases: info, warning, error, success
// redirectUrl and timer are optional

// example:
// <AlertBox text="asia pihvi" status="success" timer={2000} redirectUrl="/some-url" />

interface Props {
    text: string;
    status: AlertColor;
    timer?: number;
    redirectUrl?: string;
}

function AlertBox({ text, status, timer, redirectUrl }: Props) {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer) {
            setTimeout(() => {
                setOpen(false);
                if (redirectUrl) {
                    navigate(redirectUrl);
                }
            }, timer);
        }
    }, [timer, navigate, redirectUrl]);

    const handleClose = () => {
        setOpen(false);
        if (redirectUrl) {
            navigate(redirectUrl);
        }
    };

    return (
        <div>
            {open && (
                <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert
                        severity={status}
                        variant="filled"
                        onClose={handleClose}
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
                        {/* {redirectUrl && timer && '  Uudelleenohjataan...'} */}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default AlertBox;
