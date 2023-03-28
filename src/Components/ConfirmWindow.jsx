import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function ConfirmWindow({ open, onConfirm, title, content }) {
    const handleConfirm = () => {
        onConfirm(true);
    };

    const handleDecline = () => {
        onConfirm(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleDecline}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDecline}>Peruuta</Button>
                <Button onClick={handleConfirm} autoFocus>
                    Hyväksy
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmWindow.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default ConfirmWindow;
