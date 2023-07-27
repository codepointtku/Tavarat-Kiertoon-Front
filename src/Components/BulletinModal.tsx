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

const getRandomValueInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

function BulletinModal({ title, date, content }: Props) {
    const [bulletinModalOpened, setBulletinModalOpened] = React.useState(true);
    const handleClose = () => setBulletinModalOpened(false);

    const getRandomAnimationValues = () => {
        const maxX = 300;
        const maxY = 300;

        const randomX = getRandomValueInRange(-maxX, maxX);
        const randomY = getRandomValueInRange(-maxY, maxY);

        return { x: randomX, y: randomY };
    };

    const [buttonPosition, setButtonPosition] = React.useState({ x: 0, y: 0 });

    const handleHover = () => {
        const { x, y } = getRandomAnimationValues();
        setButtonPosition({ x, y });
    };

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
                                    variant="outlined"
                                    size="small"
                                    onMouseEnter={handleHover}
                                    sx={{
                                        marginTop: '1rem',
                                        transition: 'transform 0.1s ease-out',
                                        transform: `translateX(${buttonPosition.x}px) translateY(${buttonPosition.y}px)`,
                                    }}
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
