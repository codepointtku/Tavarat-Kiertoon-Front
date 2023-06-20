import * as React from 'react';

import { Backdrop, Box, Modal, Fade, Button, Typography } from '@mui/material/';

interface Props {
    title: string;
    content: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0.1rem solid #009bd8',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

function MessageModal({ title, content }: Props) {
    const [messageModalOpened, setMessageModalOpened] = React.useState(true);
    // const handleOpen = () => setMessageModalOpened(true);
    const handleClose = () => setMessageModalOpened(false);

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
                            {title}
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {content}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default MessageModal;
