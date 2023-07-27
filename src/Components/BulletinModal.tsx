import * as React from 'react';

import { Backdrop, Box, Button, Modal, Fade, Typography, Stack } from '@mui/material/';

interface Props {
    title: string;
    date?: string;
    content?: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

function BulletinModal({ title, date, content }: Props) {
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
                <Fade in={bulletinModalOpened} easing={'10000'}>
                    <Box sx={style}>
                        <Stack>
                            <Typography
                                id="bulletin-modal-title"
                                variant="h6"
                                component="h2"
                                textAlign="center"
                                // gutterBottom
                            >
                                {title}
                            </Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                                {date}
                            </Typography>
                            <Typography id="bulletin-modal-content" sx={{ mt: 2 }} textAlign="center">
                                {content}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{ margin: '1rem 0 0rem 0' }}
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
