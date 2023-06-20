import * as React from 'react';

import { Backdrop, Box, Modal, Fade, Button, Typography } from '@mui/material/';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MessageModal() {
    const [messageModalOpened, setMessageModalOpened] = React.useState(false);
    const handleOpen = () => setMessageModalOpened(true);
    const handleClose = () => setMessageModalOpened(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={messageModalOpened}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={messageModalOpened}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Textiä in a modal jou
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Tättärää ja taas koodaillaan
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default MessageModal;
