import * as React from 'react';

import { Backdrop, Box, Button, Modal, Fade, Typography, Stack } from '@mui/material/';

interface Props {
    title: string;
    content?: string;
    footer?: string | JSX.Element;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '0.1rem solid #009bd8',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

function BulletinModal({ title, content, footer }: Props) {
    const [bulletinModalOpened, setBulletinModalOpened] = React.useState(true);
    const handleClose = () => setBulletinModalOpened(false);

    return (
        <div>
            <Modal
                aria-labelledby="bulletin-modal-title"
                aria-describedby="bulletin-modal-description"
                open={bulletinModalOpened}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={bulletinModalOpened} easing={'2000'}>
                    <Box sx={style}>
                        <Stack>
                            <Typography id="bulletin-modal-title" variant="h6" component="h2" textAlign="center">
                                {title}
                            </Typography>
                            <Typography id="bulletin-modal-content" sx={{ mt: 2 }} textAlign="center">
                                {content}
                            </Typography>
                            {footer}
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{ margin: '2rem 0 0rem 0' }}
                                    onClick={handleClose}
                                >
                                    Sulje
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default BulletinModal;
