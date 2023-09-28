import * as React from 'react';
import { Link } from 'react-router-dom';

import { Backdrop, Box, Button, Modal, Fade, Link as MuiLink, Typography, Stack, Grid } from '@mui/material/';

interface Props {
    title: string;
    date: number;
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
    overflow: 'auto',
    maxHeight: '80vh',
    scrollbarColor: '#009bd8 #bfe6f6',
    scrollbarWidth: 'thin',
};

// const getRandomValueInRange = (min: number, max: number) => {
//     return Math.random() * (max - min) + min;
// };

function BulletinModal({ title, date, content }: Props) {
    const SuperLink = MuiLink as typeof MuiLink & typeof Link;

    const [bulletinModalOpened, setBulletinModalOpened] = React.useState(true);

    const handleClose = () => {
        localStorage.setItem('lastvisit', new Date(date).getTime().toString());
        setBulletinModalOpened(false);
    };

    // // important stuff, use with caution :)
    // const getRandomAnimationValues = () => {
    //     const maxX = 200;
    //     const maxY = 200;

    //     const randomX = getRandomValueInRange(-maxX, maxX);
    //     const randomY = getRandomValueInRange(-maxY, maxY);

    //     return { x: randomX, y: randomY };
    // };

    // const [buttonPosition, setButtonPosition] = React.useState({ x: 0, y: 0 });
    // const [buttonScale, setButtonScale] = React.useState(1);
    // const [buttonRotation, setButtonRotation] = React.useState(0);

    // const getRandomScale = () => {
    //     const minScale = 0.4;
    //     const maxScale = 3.2;
    //     return getRandomValueInRange(minScale, maxScale);
    // };

    // const getRandomRotation = () => {
    //     const minRotation = -180;
    //     const maxRotation = 180;
    //     return getRandomValueInRange(minRotation, maxRotation);
    // };

    // const handleHover = () => {
    //     const { x, y } = getRandomAnimationValues();
    //     setButtonPosition({ x, y });
    //     const randomScale = getRandomScale();
    //     const randomRotation = getRandomRotation();

    //     setButtonPosition({ x, y });
    //     setButtonScale(randomScale);
    //     setButtonRotation(randomRotation);
    // };

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
                disableScrollLock
            >
                <Fade in={bulletinModalOpened} easing={'10000'}>
                    <Box sx={style}>
                        <Stack>
                            <Typography id="bulletin-modal-title" variant="h6" component="h2" textAlign="center">
                                {title}
                            </Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic', mt: '1rem' }}>
                                {new Date(date).toLocaleDateString('fi-FI')}
                            </Typography>
                            <Typography
                                id="bulletin-modal-content"
                                sx={{
                                    mt: '1rem',
                                    overflowWrap: 'break-word',
                                    whiteSpace: 'pre-wrap',
                                }}
                                textAlign="center"
                            >
                                {content}
                            </Typography>
                            <Grid
                                container
                                sx={{
                                    display: 'flex',
                                    margin: '2rem 0 0 0',
                                }}
                            >
                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}
                                >
                                    <SuperLink
                                        component={Link}
                                        to="/tiedotteet"
                                        onClick={handleClose}
                                        fontSize="0.9rem"
                                    >
                                        Lisää tiedotteita
                                    </SuperLink>
                                </Grid>

                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        // onMouseEnter={handleHover}
                                        // sx={{
                                        //     transition: 'transform 0.1s ease-out',
                                        //     transform: `translateX(${buttonPosition.x}px) translateY(${buttonPosition.y}px) scale(${buttonScale}) rotate(${buttonRotation}deg)`,
                                        // }}
                                        onClick={handleClose}
                                    >
                                        Sulje
                                    </Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default BulletinModal;
