import * as React from 'react';

import { Backdrop, Box, Modal, Fade, Typography, Stack } from '@mui/material/';

interface Props {
    title: string;
    content?: string;
    subcontent?: string;
    footer?: string | JSX.Element;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '0.1rem solid #009bd8',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

function MessageModal({ title, content, subcontent, footer }: Props) {
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
                <Fade in={messageModalOpened} easing={'2000'}>
                    <Box sx={style}>
                        <Stack>
                            <Typography id="transition-modal-title" variant="h6" component="h2" textAlign="center">
                                {title}
                            </Typography>
                            <Typography id="transition-modal-content" sx={{ mt: 2 }} textAlign="center">
                                {content}
                            </Typography>
                            <Typography id="transition-modal-content" sx={{ mt: 2 }} textAlign="center">
                                {subcontent}
                            </Typography>
                            {footer}
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default MessageModal;
